import express from "express";
import web from "./routes/web.js";
import connectDB from "./config/DBConfig.js";
import session from "express-session";
import env from 'dotenv';
env.config();

const app = express()
const port = process.env.PORT
const db_url = process.env.DB_URL
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs');

connectDB(db_url);

app.use(session({
    secret : 'iamkey',
    resave : false,
    saveUninitialized: true,
    cookie : {maxAge:50000}
}))

app.use(function(req, res, next) {
    res.locals.n1 = req.session.name;
    next();
});

// app.get('/session',(req,resp)=>{
//     resp.send( resp.locals.n1)
// })

app.use('/', web)

app.listen(port, ()=>{
    console.log(`server run on : http://localhost:${port}`);
})