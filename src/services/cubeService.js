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

function attach(cubeId, accessoryId, userId) {
    return cubeRepository.attach(cubeId, accessoryId, userId);
}

async function deleteCube(cubeId, userId) {
    const cube = await cubeRepository.getById(cubeId);
 
    if(!cube) {
        throw new Error('Cube is not found!')
            }
    
    if(cube.creatorId !== userId) {
        throw new Error('Unauthorized')
    }        

   return await cubeRepository.deleteCube(cubeId, userId);    
}

function edit(cubeData, cubeId, userId){
    cubeData.difficultyLevel = Number(cubeData.difficultyLevel);
    
    return cubeRepository.edit(cubeData, cubeId, userId)
}

const cubeService = {
    getAllCubes,
    createCube,
    getCubeById,
    attach,
    deleteCube,
    edit
}
export default cubeService;