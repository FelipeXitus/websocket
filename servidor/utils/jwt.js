import jwt from 'jsonwebtoken';

async function generateJwt(payload, secretKey){
    const token = await jwt.sign(payload, secretKey,{expiresIn: '1h'});
    return token;
}

export { generateJwt };