import { Router } from "express";

const cubeController = Router();

cubeController.get('/create', (req, res) => {
    res.render('cubes/create');
})

export default cubeController;