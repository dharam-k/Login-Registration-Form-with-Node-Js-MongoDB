import express from 'express'
import { dashboardPage, homePage, loginPage, logout, registerPage, userLogin, userRegister } from '../controllers/UserController.js';
const router = express.Router();

import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.CLIENT_ID)

router.get('/', homePage );
router.get('/register', registerPage );
router.get('/login', loginPage );
router.post('/dashboard', dashboardPage);
router.get('/logout', logout);


router.post("/google/:token", async (req, res) => {
    const { token }  = req.params
   // console.log(token)
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });
    const { name, email, picture } = ticket.getPayload();  
    const data = { name, email, picture }  
    res.render('dashboard', data)
})

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