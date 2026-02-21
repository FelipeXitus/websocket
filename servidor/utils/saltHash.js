import crypto from 'crypto';

function saltHashData(data) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(data, salt, 64).toString('hex');
    return `${salt}:${hash}`;
}

function verifyHash(data, salt, hash) {
    const hashedData = crypto.scryptSync(data, salt, 64).toString('hex');
    return crypto.timingSafeEqual(Buffer.from(hashedData, 'hex'), Buffer.from(hash, 'hex'));
}

export { saltHashData, verifyHash };