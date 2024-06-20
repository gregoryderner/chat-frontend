export async function generateKeyPair() {
  const keyPair = await window.crypto.subtle.generateKey({
    name: "RSA-OAEP",
    modulusLength: 2048,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: "SHA-256",
  }, true, ["encrypt", "decrypt"]);
  
  const publicKey = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
  const privateKey = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

  return {
    publicKey: bufferToBase64(publicKey),
    privateKey: bufferToBase64(privateKey),
  };
}

export async function importPublicKey(pem) {
  const binaryDer = base64ToBuffer(pem);

  return await window.crypto.subtle.importKey(
    "spki",
    binaryDer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256"
    },
    true,
    ["encrypt"]
  );
}

export async function importPrivateKey(pem) {
  const binaryDer = base64ToBuffer(pem);

  return await window.crypto.subtle.importKey(
    "pkcs8",
    binaryDer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256"
    },
    true,
    ["decrypt"]
  );
}

export async function encryptMessage(publicKey, message) {
  const encodedMessage = new TextEncoder().encode(message);
  const encryptedMessage = await window.crypto.subtle.encrypt({
    name: "RSA-OAEP"
  }, publicKey, encodedMessage);

  return bufferToBase64(encryptedMessage);
}

export async function decryptMessage(privateKey, encryptedMessage) {
  const binaryEncrypted = base64ToBuffer(encryptedMessage);

  const decryptedMessage = await window.crypto.subtle.decrypt({
    name: "RSA-OAEP"
  }, privateKey, binaryEncrypted);

  return new TextDecoder().decode(decryptedMessage);
}

function bufferToBase64(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

function base64ToBuffer(base64) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}
