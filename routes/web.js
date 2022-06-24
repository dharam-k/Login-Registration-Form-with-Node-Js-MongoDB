import express from 'express'
import { dashboardPage, homePage, loginPage, logout, registerPage, userLogin, userRegister } from '../controllers/UserController.js';
const router = express.Router();

router.get('/', homePage );
router.get('/register', registerPage );
router.get('/login', loginPage );
router.get('/dashboard', dashboardPage);
router.get('/logout', logout);

router.post('/register', userRegister );
router.post('/login', userLogin);

router.use(function(req, res, next) {
    if(req.session.name){
        res.locals.n1 = req.session.name;
    }else{
        res.locals.n1 = '';
        req.session.name='';
    }
   
    next();
});

export default router;