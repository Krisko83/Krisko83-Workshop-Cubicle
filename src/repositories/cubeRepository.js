import { v4 as uuid} from 'uuid';
import fs from 'fs/promises';

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
    const database = await readDb();
    cubeData.id = uuid();
    cubeData.difficultyLevel = Number(cubeData.difficultyLevel);
 
    database.cubes.push(cubeData);

   await writeToDb(database);
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

const cubeRepository = {
    getAll,
    createCube
}

export default cubeRepository;