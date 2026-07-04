import { Router } from 'express';
import cubeService from '../services/cubeService.js';

const homeController = Router();

homeController.get('/',async (req, res) => {
    const filter = req.query;
 
    const cubesData = await cubeService.getAllCubes(filter);
      
    res.render('index', { cubesData, filter, pageTitle: 'Home' })
})

homeController.get('/about', (req, res) => {
 
    res.render('about', { pageTitle: 'About' })
})

 

export default homeController;