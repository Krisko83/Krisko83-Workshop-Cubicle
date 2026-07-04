import accessoriesRepository from "../repositories/accessoriesRepository.js";

function create(accessoryData) {
    return accessoriesRepository.create(accessoryData)
}

function getAll(filter = {}) {
    return accessoriesRepository.getAll(filter);
};

function getById(accessoryId) {
    return accessoriesRepository.getById(accessoryId)
}
 

const accessoriesService = {
    create,
    getAll,
    getById
}

export default accessoriesService;