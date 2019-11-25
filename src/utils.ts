/**
 * Get current time in seconds
 */
export function getNowSeconds() {
  return Math.round(new Date().getTime() / 1000.0)
}

/**
 * Valid TOTP secret characters according to RFC 4648 standard
 * https://tools.ietf.org/html/rfc4648
 */
const secretAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'

/**
 * Check if input string only includes valid secret characters
 */
export function isStringValidSecret(string: string) {
  for (let i = 0; i < string.length; i++) {
    if (secretAlphabet.indexOf(string[i]) === -1) {
      return false
    }
  }

  return true
}

/**
 * Generate a valid TOTP secret with given parameters
 */
export function generateSecret(length = 16, chars = secretAlphabet) {
  let secret = ''
  for (var i = 0; i < length; i++) {
    secret += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return secret
}
