import { v4 as uuid } from 'uuid';
import fs from 'fs/promises';
import { prisma } from '../../prisma/lib/prisma.js';

async function createCube(cubeData) {
    const cube = await prisma.cube.create({
        data: cubeData
    });

    return cube;
};

async function getAll(filter = {}) { 
    const cubeData = await prisma.cube.findMany({
        where: {
            name: {
                contains: filter.search || undefined,
                mode: 'insensitive'
            },
            difficultyLevel: {
                gte: filter.from || undefined,
                lte: filter.to || undefined
            }
        }
    });

    return cubeData;
};

async function getById(cubeId) {
    const cube = await prisma.cube.findUnique({
        where: {
            id: cubeId
        },
        include: { accessories: true}
    });

    return cube;
};

async function attach(cubeId, accessoryId, userId) {
   const result = await prisma.cube.update({
        where: { 
            id: cubeId,
            creatorId: userId
        },
        data: {
            accessories: {
                connect: { id: accessoryId }
            }
        }
    })

    return result;
}

async function deleteCube(cubeId, userId) {
    const result = await prisma.cube.delete({
        where :{
            id: cubeId,
            creatorId: userId
        }
    })

    return result;
}

async function edit(cubeData, cubeId, userId) {
    const result = await prisma.cube.update({
        where: {
            id: cubeId,
            creatorId: userId
        },
        data: cubeData
    })
}

const cubeRepository = {
    getAll,
    createCube,
    getById,
    attach,
    deleteCube,
    edit
};

export default cubeRepository;