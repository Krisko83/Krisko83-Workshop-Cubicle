import userRepository from "../repositories/userRepository";
import bcrypt from 'bcrypt';
import { createAuthToken } from "../utils/authUtils";

async function register(userData) {
    const hashedPassowrd = await bcrypt.hash(userData.password, 10);

    userData.password = hashedPassowrd;

    const user = await userRepository.register(userData);
    const token = createAuthToken(user);

    return token;

};


async function login(userData) {
    const user = await userRepository.getUserByUsername(userData);

    if (!user) {
        throw new Error('Invalid Username!')
    }

    const isPassowrdValid = await bcrypt.compare(userData.password, user.password);

    if (!isPassowrdValid) {
        throw new Error('Wrong Password!')
    }

    const token = createAuthToken(user);

    return token;
}

function logout(userData) {

}

const authService = {
    register,
    login,
    logout
}

export default authService;