export function getNowSeconds() {
  return Math.round(new Date().getTime() / 1000.0)
}

const secretAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
export function isStringValidSecret(string: string) {
  for (let i = 0; i < string.length; i++) {
    if (secretAlphabet.indexOf(string[i]) === -1) {
      return false
    }
  }

  return true
}
