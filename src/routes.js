import { Router } from "express";
import homeController from "./controllers/homeController.js";
import cubeController from "./controllers/cubeController.js";
 

const routes = Router();

routes.use('/', homeController);
routes.use('/cubes/', cubeController);

routes.get('*url', (req, res) => {
    res.render('404')
})

export default routes;