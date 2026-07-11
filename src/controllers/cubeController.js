import { Router } from "express";
import cubeService from "../services/cubeService.js";
import { log } from "console";
import accessoriesService from "../services/accessoriesService.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const cubeController = Router();

cubeController.get('/create/cube', isAuth, (req, res) => {
    res.render('cubes/create', { pageTitle: 'Create Cube' });
})

cubeController.post('/create/cube', isAuth, async (req, res) => {
    const cubeData = req.body;
    const userId = req.user.id;

    await cubeService.createCube(cubeData, userId)

    res.redirect('/')
});

cubeController.get('/details/:cubeId', async (req, res) => {
    const cubeId = req.params.cubeId;
    const userId = req.user.id;

    const cube = await cubeService.getCubeById(cubeId);
    const isOwner = cube.creatorId === userId;

    res.render('cubes/details', { cube, isOwner, pageTitle: 'Details' })
});

cubeController.get('/create/accessory', isAuth, (req, res) => {
    res.render('accessories/create', { pageTitle: 'Create Accessory' });
})

cubeController.post('/create/accessory', isAuth, async (req, res) => {
    const accessoryData = req.body;

    await accessoriesService.create(accessoryData)

    res.redirect('/');
})

cubeController.get('/details/:cubeId/attach', isAuth, async (req, res) => {
    const cubeId = req.params.cubeId;
    const cube = await cubeService.getCubeById(cubeId);

    const accessories = await accessoriesService.getAll({ exclude: cube.accessories.map(accessory => accessory.id) });

    res.render('cubes/attach', { cube, accessories, pageTitle: 'Attach Accessory' });
});

cubeController.post('/details/:cubeId', async (req, res) => {
    const accessoryId = req.body.accessory;
    const cubeId = req.params.cubeId;

    await cubeService.attach(cubeId, accessoryId);

    res.redirect(`/cubes/details/${cubeId}`);
});

cubeController.get('/details/:cubeId/edit', isAuth, async (req, res) => {
    const cubeId = req.params.cubeId;

    const cube = await cubeService.getCubeById(cubeId);
    console.log(cube);

    res.render('cubes/edit', { cube });
});

cubeController.post('/details/:cubeId/edit', isAuth, async (req, res) => {
    const cubeId = req.params.cubeId;
    const userId = req.user.id;
    const cubeData = req.body;

    await cubeService.edit(cubeData, cubeId, userId)

    res.redirect(`/cubes/details/${cubeId}`);
})


cubeController.get('/details/:cubeId/delete', isAuth, async (req, res) => {
    const cubeId = req.params.cubeId;
    const userId = req.user.id; 

    await cubeService.deleteCube(cubeId, userId);

    res.redirect('/');
});


export default cubeController;