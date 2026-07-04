import { prisma } from "../../prisma/lib/prisma.js";

async function create(accessoryData) {
    const accessory = await prisma.accessory.create({
        data: accessoryData
    });

    return accessory
}

async function getAll(){
    const accessories = await prisma.accessory.findMany();

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