import OTPAuth, { Secret } from 'otpauth'
import React, { useEffect, useRef, useState } from 'react'
import { getNowSeconds, percentage } from '../utils'

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
    updateToken()
  }, [secret])

  const updateToken = () => {
    const updatedConfig = Object.assign(config, { secret })
    const newToken = createTotpInstance(updatedConfig).generate()
    const secondsLeft = config.period - (getNowSeconds() % config.period)

    setToken(newToken)
    setSecondsLeft(secondsLeft)
  }

  return (
    <div className="wrapper">
      <div className="content">
        <div className="input-container">
          <label className="input-container__label">Secret</label>
          <input
            className="input"
            value={secret}
            onChange={e => setSecret(e.target.value)}
            autoFocus
          />
        </div>
        <div className="input-container">
          <label className="input-container__label">
            Token ({secondsLeft})
          </label>
          <div className="token-container">{token}</div>
        </div>
        <ProgressBar count={secondsLeft || 0} max={30} />
      </div>
    </div>
  )
}
