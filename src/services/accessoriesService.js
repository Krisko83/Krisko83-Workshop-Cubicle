import accessoriesRepository from "../repositories/accessoriesRepository.js";

function create(accessoryData) {
    return accessoriesRepository.create(accessoryData)
}

function getAll() {
    return accessoriesRepository.getAll();
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