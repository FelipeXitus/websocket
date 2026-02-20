import { generateKeyPairSync, publicEncrypt, privateDecrypt } from 'crypto';

function generateKeys() {
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    })
    return { publicKey, privateKey }
}

function encryptData(message) {
    const { publicKey } = generateKeys();
    const encryptedData = publicEncrypt(publicKey, Buffer.from(message));
    return encryptedData;
}

function decryptData(message) {
    const { privateKey } = generateKeys();
    const decryptedData = privateDecrypt(privateKey, message);
    return decryptedData;
}

export { encryptData, decryptData }