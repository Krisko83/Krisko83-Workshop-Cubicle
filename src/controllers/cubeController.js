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
})

export default cubeController;