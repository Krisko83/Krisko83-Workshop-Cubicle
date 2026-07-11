import jwt from 'jsonwebtoken';

export function createAuthToken(user) {
    const payLoad = { id: user.id , username: user.username };
    const token = jwt.sign(payLoad, process.env.AUTH_SECRET, { expiresIn: '1h' });

    return token;
}