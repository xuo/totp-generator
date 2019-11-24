import OTPAuth, { Secret } from 'otpauth'
import React, { useEffect, useState } from 'react'
import { getNowSeconds, isStringValidSecret } from '../utils'

import { ProgressBar } from './progress-bar'
import { useInterval } from '../hooks/useInterval'

interface TotpConfig {
  algorithm: string
  digits: number
  period: number
  secret: Secret | string
  label?: string
  issuer?: string
}

function createTotpInstance(config: TotpConfig) {
  return new OTPAuth.TOTP(config)
}

const defaultSecret = '63VIJDT4TJJENFTUUS6HZIUANKKL'
const config: TotpConfig = {
  algorithm: 'SHA1',
  digits: 6,
  period: 30,
  secret: defaultSecret
}

export function Generator() {
  const [secret, setSecret] = useState(defaultSecret)
  const [token, setToken] = useState('')
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null)
  const [invalidSecret, setInvalidSecret] = useState(false)

  useInterval(() => {
    if (typeof secondsLeft == 'number') {
      if (secondsLeft > 1) {
        setSecondsLeft(secondsLeft - 1)
      } else {
        updateToken()
      }
    }
  }, 1000)

  useEffect(() => {
    if (secret.length > 0) {
      updateToken()
    }
  }, [secret])

  useEffect(() => {
    const id = setTimeout(() => {
      setInvalidSecret(false)
    }, 800)

    return () => {
      clearInterval(id)
    }
  }, [invalidSecret])

  const updateToken = () => {
    const updatedConfig = Object.assign(config, { secret })
    const newToken = createTotpInstance(updatedConfig).generate()
    const secondsLeft = config.period - (getNowSeconds() % config.period)

    setToken(newToken)
    setSecondsLeft(secondsLeft)
  }

  const updateSecret = (value: string) => {
    if (value.includes('otpauth://')) {
      const parsedOtpConfig = Object.fromEntries(new URLSearchParams(value))
      value = parsedOtpConfig.secret
    }
    value = value.trim()

    const valid = isStringValidSecret(value.toUpperCase())
    if (!valid) {
      setInvalidSecret(true)
      return
    }

    if (invalidSecret) {
      setInvalidSecret(false)
    }

    setSecret(value)
  }

  const handleSecretChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSecret(e.target.value)
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    updateSecret(e.clipboardData.getData('text/plain'))
  }

  return (
    <div className="wrapper" onPaste={handlePaste}>
      <h3>TOTP Generator</h3>
      <div className="content">
        <div className="input-container">
          <label className="input-container__label">Secret</label>
          <input
            className={invalidSecret ? 'input input--error' : 'input'}
            value={secret}
            onChange={handleSecretChange}
            autoFocus
          />
        </div>
        {secret.length > 0 && (
          <>
            <div className="input-container">
              <label className="input-container__label">
                Token ({secondsLeft})
              </label>
              <div className="token-container">{token}</div>
            </div>
            <ProgressBar count={secondsLeft || 0} max={30} />
          </>
        )}
      </div>
    </div>
  )
}
