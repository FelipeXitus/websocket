import crypto from 'crypto';

function saltHashData(data) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(data, salt, 64).toString('hex');
    return `${salt}:${hash}`;
}

export { saltHashData };