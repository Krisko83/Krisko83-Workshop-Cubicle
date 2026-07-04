import { prisma } from "../../prisma/lib/prisma.js";

async function create(accessoryData) {
    const accessory = await prisma.accessory.create({
        data: accessoryData
    });

    return accessory
}

async function getAll(filter = {}){
    const accessories = await prisma.accessory.findMany({
        where: {
            id: { notIn: filter.exclude || [] }
        }
    });

    return accessories
}

async function getById(accessoryId) { 
    const accessory = await prisma.accessory.findUnique({
        where: { id: accessoryId}
    });

    return accessory
}


const accessoriesRepository = {
    create,
    getAll,
    getById
}

export default accessoriesRepository;