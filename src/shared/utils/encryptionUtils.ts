import CryptoJS from "crypto-js";
// import base64 from "react-native-base64";

let keyInput = "TaUI4+C0k2OMLkMPCGHVWXytnLh1vJC9uq/090aruoq=";
let ivInput = "41V0CbOtqCCy7tJVsEhqhC==";

const secretKey = CryptoJS.enc.Base64.parse(keyInput);
const intiVector = CryptoJS.enc.Base64.parse(ivInput);

export function AESEncrypt(object: any) {
  try {
    const encodedData = JSON.stringify(object);
    const encryptedData = CryptoJS.AES.encrypt(encodedData, secretKey, {
      iv: intiVector,
      padding: CryptoJS.pad.Pkcs7,
    }).ciphertext.toString(CryptoJS.enc.Base64);
    return encryptedData;
  } catch {
    return "0";
    // console.log('error is here');
  }
}

export function AESDecrypt(encryptedData: any) {
  try {
    const decryptedData = CryptoJS.AES.decrypt(encryptedData, secretKey, {
      iv: intiVector,
      padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.enc.Utf8);

    return JSON.parse(decryptedData);
  } catch {
    return "";
  }
}
