import { prisma } from "../../prisma/lib/prisma";

async function register(userData) {
    const result = await prisma.user.create({
        data: {
            username: userData.username,
            password: userData.password
        }
    })

    return result;
}


async function getUserByUsername(userData) {
    const user = await prisma.user.findUnique({
        where: {
            username: userData.username
        }
    })

    return user;
};

const userRepository = {
    register,
    getUserByUsername
};

export default userRepository;