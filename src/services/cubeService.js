import cubeRepository from "../repositories/cubeRepository.js";

function getAllCubes(filter={}) {
    filter.from = Number(filter.from);
    filter.to = Number(filter.to);
    
    return cubeRepository.getAll(filter)
};
 

function createCube(cubeData) {
    cubeData.difficultyLevel = Number(cubeData.difficultyLevel);

    return cubeRepository.createCube(cubeData);
};

function getCubeById(cubeId){
    return cubeRepository.getById(cubeId);
}

function attach(cubeId, accessoryId) {
    return cubeRepository.attach(cubeId, accessoryId);
}


const cubeService = {
    getAllCubes,
    createCube,
    getCubeById,
    attach
}
export default cubeService;