import OTPAuth, { Secret } from 'otpauth'
import React, { useEffect, useState } from 'react'
import { generateSecret, getNowSeconds, isStringValidSecret } from '../utils'

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

/**
 * Create a new OTPAuth instance with given config
 */
function createTotpInstance(config: TotpConfig) {
  return new OTPAuth.TOTP(config)
}

/**
 * Create default secret and config
 */
const defaultSecret = generateSecret()
const config: TotpConfig = {
  algorithm: 'SHA1',
  digits: 6,
  period: 30,
  secret: defaultSecret
}

/**
 * Main TOTP token generator component
 */
export function Generator() {
  const [secret, setSecret] = useState(defaultSecret)
  const [token, setToken] = useState('')
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null)
  const [invalidSecret, setInvalidSecret] = useState(false)

  /**
   * Update for how many more seconds the given token is valid
   * if the token expires, start calculation of new token
   */
  useInterval(() => {
    if (typeof secondsLeft == 'number') {
      if (secondsLeft > 1) {
        setSecondsLeft(secondsLeft - 1)
      } else {
        updateToken()
      }
    }
  }, 1000)

  /**
   * Start calculation of new token when secret changes
   */
  useEffect(() => {
    if (secret.length > 0) {
      updateToken()
    }
  }, [secret])

  /**
   * Hide "invalid secret" error after a given timeout
   */
  useEffect(() => {
    const id = setTimeout(() => {
      setInvalidSecret(false)
    }, 800)

    return () => {
      clearInterval(id)
    }
  }, [invalidSecret])

  /**
   * Hide "invalid secret" error after a given timeout
   */
  const updateToken = () => {
    const updatedConfig = Object.assign(config, { secret })
    const newToken = createTotpInstance(updatedConfig).generate()
    const secondsLeft = config.period - (getNowSeconds() % config.period)

    setToken(newToken)
    setSecondsLeft(secondsLeft)
  }

  /**
   * Update secret
   * detect if input is a valid otpauth uri
   * check if input is actually a valid TOTP token
   * (only includes valid RFC 4648 standard characters)
   */
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

  /**
   * Secret input change handler
   */
  const handleSecretChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSecret(e.target.value)
  }

  /**
   * Paste input handler
   */
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    updateSecret(e.clipboardData.getData('text/plain'))
  }

  return (
    <div className="wrapper" onPaste={handlePaste}>
      <h3>TOTP Generator</h3>
      <div className="content">
        <SecretInput
          invalidSecret={invalidSecret}
          secret={secret}
          handleSecretChange={handleSecretChange}
        />
        {secret.length > 0 && (
          <Token token={token} secondsLeft={secondsLeft || 0} />
        )}
      </div>
    </div>
  )
}

/**
 * Secret input component
 */
function SecretInput({
  invalidSecret,
  secret,
  handleSecretChange
}: SecretProps) {
  return (
    <div className="item-container">
      <label className="item-label">Secret</label>
      <input
        className={invalidSecret ? 'input input--error' : 'input'}
        value={secret}
        onChange={handleSecretChange}
        autoFocus
      />
    </div>
  )
}

interface SecretProps {
  invalidSecret: boolean
  secret: string
  handleSecretChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

/**
 * Token container component
 */
function Token({ token, secondsLeft }: { token: string; secondsLeft: number }) {
  return (
    <>
      <div className="item-container">
        <label className="item-label">Token ({secondsLeft})</label>
        <div className="token-container">{token}</div>
      </div>
      <Progress secondsLeft={secondsLeft || 0} />
    </>
  )
}

/**
 * Token valid seconds-left progress component
 */
function Progress({ secondsLeft }: { secondsLeft: number }) {
  return <ProgressBar count={secondsLeft} max={30} />
}
