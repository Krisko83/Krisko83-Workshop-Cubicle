import cubeRepository from "../repositories/cubeRepository.js";

function getAllCubes(filter={}) {
    return cubeRepository.getAll(filter)
};

const cubeService = {
    getAllCubes
}
export default cubeService;