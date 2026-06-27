import { Router } from "express";
import cubeService from "../services/cubeService.js";

const cubeController = Router();

cubeController.get('/create', (req, res) => {
    res.render('cubes/create');
})

cubeController.post('/create',async (req, res) => {
    const cubeData = req.body;
    
    await cubeService.createCube(cubeData)
    
    res.redirect('/')
});

cubeController.get('/details/:cubeId',async (req, res) => {
    const cubeId = req.params.cubeId;

    const cube = await cubeService.getCubeById(cubeId);
 
    res.render('cubes/details', { cube })
});

export default cubeController;