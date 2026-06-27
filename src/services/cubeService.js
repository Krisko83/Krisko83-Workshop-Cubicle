import cubeRepository from "../repositories/cubeRepository.js";

function getAllCubes(filter={}) {
    return cubeRepository.getAll(filter)
};
 

function createCube(cubeData) {
    return cubeRepository.createCube(cubeData);
};



const cubeService = {
    getAllCubes,
    createCube
}
export default cubeService;