import { v4 as uuid} from 'uuid';
import fs from 'fs/promises';
import { prisma } from '../../prisma/lib/prisma.js';

async function readDb(collection) {
    const cubeDataBuff = await fs.readFile('./src/database/database.json', { encoding: 'utf-8'});
    const cubeData = JSON.parse(cubeDataBuff);

    if(collection && !cubeData.hasOwnProperty(collection)) {
        throw new Error('No cubes found')
    };

    return collection ? cubeData[collection] : cubeData;
}

async function writeToDb(cubeData) { 
    const cubeContent = JSON.stringify(cubeData, null, 2); 
    console.log(cubeContent);
    
    await fs.writeFile('./src/database/database.json', cubeContent, { encoding: 'utf-8'});
};

async function createCube(cubeData) {
    const cube = await prisma.cube.create({
        data: cubeData
    })

    return cube;
};

async function getAll(filter = {}) {
    let cubeData = await readDb('cubes');

    if(filter.search) {
        cubeData = cubeData.filter(cube => cube.name.toLowerCase().includes(filter.search.toLowerCase()));
    };

    if(filter.from && filter.to) {
        cubeData = cubeData.filter(cube => cube.difficultyLevel >= filter.from && cube.difficultyLevel <= filter.to);
    };
 
    return cubeData;    
};

async function getById(cubeId) {
    const database = await getAll();
    return database.find(cube => cube.id === cubeId);
}
const cubeRepository = {
    getAll,
    createCube,
    getById
}

export default cubeRepository;