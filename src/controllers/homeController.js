import { Router } from 'express';
import cubeService from '../services/cubeService.js';

const homeController = Router();

homeController.get('/',async (req, res) => {
    const filter = req.query;
 
    const cubesData = await cubeService.getAllCubes(filter);
      
    res.render('index', { cubesData, filter })
})

homeController.get('/about', (req, res) => {
 
    res.render('about')
})

 

export default homeController;