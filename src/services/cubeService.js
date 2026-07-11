import cubeRepository from "../repositories/cubeRepository.js";

function getAllCubes(filter={}) {
    filter.from = Number(filter.from);
    filter.to = Number(filter.to);
    
    return cubeRepository.getAll(filter)
};
 

function createCube(cubeData, userId) {
    cubeData.difficultyLevel = Number(cubeData.difficultyLevel);
    cubeData.creatorId = userId;

    return cubeRepository.createCube(cubeData);
};

function getCubeById(cubeId){
    return cubeRepository.getById(cubeId);
}

function attach(cubeId, accessoryId) {
    return cubeRepository.attach(cubeId, accessoryId);
}

async function deleteCube(cubeId, userId) {
    const cube = await cubeRepository.getById(cubeId);
console.log(cube);

    if(!cube) {
        throw new Error('Cube is not found!')
            }
    
    if(cube.creatorId !== userId) {
        throw new Error('Unauthorized')
    }        

   return await cubeRepository.deleteCube(cubeId, userId);    
}


const cubeService = {
    getAllCubes,
    createCube,
    getCubeById,
    attach,
    deleteCube
}
export default cubeService;