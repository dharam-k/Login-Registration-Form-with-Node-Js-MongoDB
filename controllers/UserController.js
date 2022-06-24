import User from "../models/UserModel.js"


const homePage = async (req, resp)=>{
    resp.render('index');
}
const registerPage = async (req, resp)=>{
    resp.render('register');
}
const loginPage = async (req, resp)=>{
    resp.render('login');
}

const dashboardPage = async (req, resp)=>{
    if(req.session.name){
        const data = { name :req.session.name }
        resp.render('dashboard', data);
    }else{
        const data = { name :'Something went wrong'}
        resp.render('dashboard', data); 
    } 
}

const userRegister = async (req, resp)=>{
    const {name, email, password} = req.body;

    if(name !=='' || email !=='' || password !==''){
        try {
            const user = new User({name, email, password});
            await user.save();
            resp.redirect('/login')
        } catch (error) {
            console.log(error)
        }
    }else{
        resp.send('<h1>All fields are required!</h1>')
    }

}

const userLogin = async (req, resp, next)=>{
    const {email, password} = req.body;

    if(email !=='' && password !==''){
        try {
            const user = await User.findOne({email:email})
            if(user != null){
                if(user.password == password){

                    req.session.name  = user.name
                    const data = {
                        name : req.session.name,
                    }
                    next()
                    resp.render('dashboard', data)
                }else{
                    req.session.name=''
                    const errorData = {error : 'Password is not correct'}
                    resp.render('error', errorData )
                }
            }else{
                req.session.name=''
                const errorData = {error : 'User does not exists!'}
                resp.render('error', errorData )
            }
        } catch (error) {
            console.log(error)
        }
    }else{
        req.session.name=''
        const errorData = {error : 'All fields are required!'}
        resp.render('error', errorData )
    }

}

const logout = async (req, resp, next)=>{
    req.session.name = '';
    next()
    resp.render('logout')
}

const error = async (req, resp, next)=>{
    next()
    resp.render('error')
}


export {userRegister, homePage, registerPage, loginPage , userLogin, dashboardPage, logout}