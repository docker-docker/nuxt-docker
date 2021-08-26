import CryptoJS from 'crypto-js'

const encrypt = {
  /**
   * Encrypto lib: https://stackoverflow.com/questions/41432896/cryptojs-aes-encryption-and-java-aes-decryption
   * @param str
   * @returns {string}
   */
  aesEncrypt (secretKey, str) {
    const encodeBody = CryptoJS.AES.encrypt(str, secretKey).toString()
    return encodeBody
  },
  aesDecrypt (secretKey, str) {
    const decodeBody = CryptoJS.AES.decrypt(str, secretKey).toString(CryptoJS.enc.Utf8)
    return decodeBody
  },
  md5 (str) {
    return CryptoJS.MD5(str).toString()
  }
}

export default encrypt
