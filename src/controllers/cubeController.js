import { Router } from "express";
import cubeService from "../services/cubeService.js";
import { log } from "console";
import accessoriesService from "../services/accessoriesService.js";

const cubeController = Router();

cubeController.get('/create/cube', (req, res) => {
    res.render('cubes/create');
})

cubeController.post('/create/cube', async (req, res) => {
    const cubeData = req.body;

    await cubeService.createCube(cubeData)

    res.redirect('/')
});

cubeController.get('/details/:cubeId', async (req, res) => {
    const cubeId = req.params.cubeId;

    const cube = await cubeService.getCubeById(cubeId);
 
    res.render('cubes/details', { cube })
});

cubeController.get('/create/accessory', (req, res) => {
    res.render('accessories/create');
})

cubeController.post('/create/accessory', async (req, res) => {
    const accessoryData = req.body;

    await accessoriesService.create(accessoryData)

    res.redirect('/');
})

cubeController.get('/details/:cubeId/attach', async (req, res) => {
    const cubeId = req.params.cubeId;
    const cube = await cubeService.getCubeById(cubeId);
 
    const accessories = await accessoriesService.getAll({ exclude: cube.accessories.map(accessory => accessory.id)});    

    res.render('cubes/attach', { cube, accessories });
});

cubeController.post('/details/:cubeId', async (req, res) => {
    const accessoryId = req.body.accessory;
    const cubeId = req.params.cubeId;
 
    await cubeService.attach(cubeId, accessoryId);

    res.redirect(`/cubes/details/${cubeId}`);
});


export default cubeController;