import { prisma } from "../../prisma/lib/prisma.js";

async function create(accessoryData) {
    const accessory = await prisma.accessory.create({
        data: accessoryData
    });

    return accessory
}

const accessoriesRepository = {
    create
}

export default accessoriesRepository;