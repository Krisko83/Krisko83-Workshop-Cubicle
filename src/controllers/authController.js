import { Router } from "express";
import authService from '../services/authService.js';
import { isAuth, isGuest } from "../middlewares/authMiddleware.js";
import { CreateUserSchema } from "../Schemas/authSchema.js";
import { getErrorMessage } from "../utils/errors.js";

const authController = Router();

authController.get('/register', isGuest, async (req, res) => {
    res.render('auth/register')
})

authController.post('/register', isGuest, async (req, res) => {
    const userData = req.body;

    try {
        const user = CreateUserSchema.parse(userData)
 
        const token = await authService.register(user);
 
        res.cookie('auth', token, { httpOnly: true });
        res.redirect('/')
    } catch (err) {
        const error = getErrorMessage(err);
        console.log('from controller',error);
        
        res.render('auth/register', {...userData, error})
        
    }

})

authController.get('/login', isGuest, async (req, res) => {
    res.render('auth/login')
});

authController.post('/login', isGuest, async (req, res) => {
    const userData = req.body;

    const token = await authService.login(userData);

    res.cookie('auth', token, { httpOnly: true })
    res.redirect('/');
});

authController.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

export default authController;