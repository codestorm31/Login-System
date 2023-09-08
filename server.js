const express=require('express')
const path=require('path')
const bodyparser=require('body-parser');
const session=require('express-session');
const{v4:uuidv4}=require("uuid");
const router=require("./router");

const app=express();

const port=process.env.PORT||3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded())

app.use(session({
    secret: uuidv4,
    receive: false,
    saveUninitialized: true
}))

app.use('/route',router)

app.set('view engine','ejs')

//load static assets
app.use('/static',express.static(path.join(__dirname,'public')))

app.get('/',(req,res)=>{
    res.render('index',{title:'Login System'});
})

app.listen(port,()=>{
    console.log("Listening to server on http://localhost:3000");
})