import cubeRepository from "../repositories/cubeRepository.js";

function getAllCubes(filter={}) {
    return cubeRepository.getAll(filter)
};
 

function createCube(cubeData) {
    cubeData.difficultyLevel = Number(cubeData.difficultyLevel);
    
    return cubeRepository.createCube(cubeData);
};

function getCubeById(cubeId){
    return cubeRepository.getById(cubeId);
}



const cubeService = {
    getAllCubes,
    createCube,
    getCubeById
}
export default cubeService;