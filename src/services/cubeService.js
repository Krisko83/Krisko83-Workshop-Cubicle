import cubeRepository from "../repositories/cubeRepository.js";

function getAllCubes(filter={}) {
    return cubeRepository.getAll(filter)
};
 

function createCube(cubeData) {
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