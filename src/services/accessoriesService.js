import accessoriesRepository from "../repositories/accessoriesRepository.js";

function create(accessoryData) {
    return accessoriesRepository.create(accessoryData)
}

const accessoriesService = {
    create
}

export default accessoriesService;