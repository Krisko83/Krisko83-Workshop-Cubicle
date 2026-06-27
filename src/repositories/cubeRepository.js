import { log } from 'console';
import fs from 'fs/promises';

async function readDb(collection) {
    const cubeDataBuff = await fs.readFile('./src/database/database.json', { encoding: 'utf-8'});
    const cubeData = JSON.parse(cubeDataBuff);


    if(collection && !cubeData.hasOwnProperty(collection)) {
        throw new Error('No cubes found')
    }


    return collection ? cubeData[collection] : cubeData;

}
async function getAll(filter = {}) {
    let cubeData = await readDb('cubes');

    if(filter.search) {
        cubeData = cubeData.filter(cube => cube.name.toLowerCase().includes(filter.search.toLowerCase()));
    };

    if(filter.from && filter.to) {
        cubeData = cubeData.filter(cube => cube.difficultyLevel >= filter.from && cube.difficultyLevel <= filter.to);
    };
 
    return cubeData;
    
}

const cubeRepository = {
    getAll
}

export default cubeRepository;