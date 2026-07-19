import { Router } from "express";
import cubeService from "../services/cubeService.js";
import { log } from "console";
import accessoriesService from "../services/accessoriesService.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { createCategoryOptions } from "../utils/categoryUtils.js";
import { CreateCubeAndAccessosrySchema } from "../Schemas/cubeSchema.js";
import { getErrorMessage } from "../utils/errors.js";

const cubeController = Router();

cubeController.get('/create/cube', isAuth, (req, res) => {
    const options = createCategoryOptions({});

    res.render('cubes/create', { options });
})


cubeController.post('/create/cube', isAuth, async (req, res) => {
    const cubeData = req.body;
    const userId = req.user.id;

    try {
        const cube = CreateCubeAndAccessosrySchema.parse(cubeData)
        await cubeService.createCube(cube, userId)

        res.redirect('/')
    } catch (err) {
        const error = getErrorMessage(err);
        const options = createCategoryOptions(cubeData);

        res.render('cubes/create', { ...cubeData, error, options })
    }
});


cubeController.get('/details/:cubeId', async (req, res) => {
    const cubeId = req.params.cubeId;
    const userId = req.user?.id;

    const cube = await cubeService.getCubeById(cubeId);
    const isOwner = cube.creatorId === userId;

    res.render('cubes/details', { cube, isOwner })
});


cubeController.get('/create/accessory', isAuth, (req, res) => {
    res.render('accessories/create');
})


cubeController.post('/create/accessory', isAuth, async (req, res) => {
    const accessoryData = req.body;

    try {
        const accessory = CreateCubeAndAccessosrySchema.parse(accessoryData)
        await accessoriesService.create(accessory)

        res.redirect('/');
    } catch (err) {
        const error = getErrorMessage(err);

        res.render('accessories/create', { ...accessoryData, error })
    };
})


cubeController.get('/details/:cubeId/attach', isAuth, async (req, res) => {
    const cubeId = req.params.cubeId;
    const cube = await cubeService.getCubeById(cubeId);

    const accessories = await accessoriesService.getAll({ exclude: cube.accessories.map(accessory => accessory.id) });

    res.render('cubes/attach', { cube, accessories });
});


cubeController.post('/details/:cubeId/attach', isAuth, async (req, res) => {
    const accessoryId = req.body.accessory;
    const cubeId = req.params.cubeId;
    const userId = req.user.id;

    await cubeService.attach(cubeId, accessoryId, userId);

    res.redirect(`/cubes/details/${cubeId}`);
});


cubeController.get('/details/:cubeId/edit', isAuth, async (req, res) => {
    const cubeId = req.params.cubeId;

    const cube = await cubeService.getCubeById(cubeId);

    const difficultyOptions = createCategoryOptions(cube)

    res.render('cubes/edit', { cube, difficultyOptions });
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

    const cube = await cubeService.getCubeById(cubeId);
    const difficultyLevelOptions = createCategoryOptions(cube);

    res.render('cubes/delete', { cube, difficultyLevelOptions });
});


cubeController.post('/details/:cubeId/delete', isAuth, async (req, res) => {
    const cubeId = req.params.cubeId;
    const userId = req.user.id;

    await cubeService.deleteCube(cubeId, userId);
    res.redirect('/');
});


export default cubeController;