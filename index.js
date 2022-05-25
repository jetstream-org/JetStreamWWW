const express = require("express")
const rout = express.Router()
const md5 = require("blueimp-md5")
const cors = require("cors")
const pool = require("./db")
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
const layout = require('express-ejs-layouts')
const { json, redirect } = require("express/lib/response")
const { resolveInclude } = require("ejs")
const res = require("express/lib/response")


const app = express();
const port = process.env.PORT || 4000;


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(layout)
app.use(express.static("views"))

app.set("view engine", "ejs")






//app.use('/', require('./router/rout.js'));
app.get('/', async (req, res) => {
    console.log(req.body.departure)
    res.render('home',{
        title: 'Home'
    })
});


app.get('/login', (req, res)=>{
    console.log("login opens")
    res.render('login',{
        title: 'Login'
    })
})



app.get('/seat', (req, res)=>{
    console.log("login opens")
    res.render('seat',{
        title: 'Ticket'
    })
})


app.get('/seat/:id', async (req, res)=>{
    var id = req.params.id;
    console.log(id);
    if(!id){
        return
    }

    
    await pool.query("set search_path to jetstream;")
    result = await pool.query("select * from seats where f_id = $1", [id])
    result2 = await pool.query("select * from booked where f_id = $1", [id])

    console.log(result.rows)
    console.log(result2.rows)
    
    res.render('seat',{
        title: 'Ticket',
        info: result,
        takenSeats: result2
    })
    
})


app.get('/bookedSeats/:id', async (req, res)=>{
    var id = req.params.id;
    console.log(id);
    if(!id){
        return
    }

    
    await pool.query("set search_path to jetstream;")
    result = await pool.query("select * from booked where f_id = $1", [id])
    console.log(result.rows)
    res.send(result)
    
})


app.get('/contact', (req, res)=>{
    console.log("contact opens")
    res.render('contact',{
        title: 'Contact'

    })
})


app.get('/app', (req, res)=>{
    res.render('app',{
        title: 'Download app'
    })
})

app.post('/api', async(req, res)=>{
    const {departure, destination, depDate, desDate, nameSearch} = req.body
    try {
        console.log(departure + " => " + destination);
        console.log(desDate + " hdiadkfnjaflavuo " + depDate);
        console.log(nameSearch + " country search" )
        await pool.query("set search_path to jetstream;")
        if(nameSearch){
            result = await pool.query("select * from flight where f_departure_name = $1", [nameSearch])
            console.log(result.rows)
            res.send(result)
        }else{
            if(departure && destination && depDate != ""){
                console.log("dep & des & date" + departure + ", " + destination + ", " + depDate);

                result = await pool.query("select * from flight where f_departure_name = $1 and f_destination_name = $2 and f_departure_date = $3", [departure, destination,depDate])
                console.log(result.rows)
                res.send(result)
            }else if(departure && destination){
                result = await pool.query("select * from flight where f_departure_name = $1 and f_destination_name = $2", [departure, destination])
                console.log(result.rows)
                console.log("no dep & des");
                res.send(result)
            }
        }
    } catch (error) {
        res.redirect('/')
        console.log(error);
    }
})

app.get('/dashboard', (req, res)=>{
    try {
        res.render('dashboard', {
            title: 'User dashboard'
        })
    } catch (error) {
        console.log(error)
    }
})

app.get('/register', (req, res)=>{
    try {
        res.render('register', {
            title: 'Register'
        })
    } catch (error) {
        console.log(error)
    }
})

app.post('/authUser', async(req, res)=>{
    try {
        console.log("authentication is begin")
        const {email, password} = req.body
        if(email != undefined && password != undefined){
            console.log("email and pass is not undefiend")
            let hash = md5(password);
            console.log(hash + " hashed one!")
            await pool.query("set search_path to jetstream;")
            const result = await pool.query("select * from userr where u_email = $1 and u_password = $2", [email, hash])
            console.log(result.rows)
            
            if(result.rows != undefined){
                res.redirect('/dashboard')
            }else{
                res.redirect('/login')
            }

        }

    } catch (error) {
        console.log(error)
    }
})


//Register user.
app.post("/registerUser",async(req,res)=>{
    try {
        const {fName,lName,hAddress,email,phone,password,cPassword} = req.body
        
        
        if (fName !="" && lName !="" && hAddress !="" && email !="" && phone !="" && password !="" && cPassword !=""){
            await pool.query("set search_path to jetstream")
            let hashPassword = md5(password)
            console.log(fName);
            const result = await pool.query("insert into userr(u_f_name, u_l_name, u_address, u_email, u_phone_nr, u_password, u_isadmin) values($1 , $2 , $3 , $4 , $5, $6, $7)",[fName,lName,hAddress,email,phone,hashPassword,false])
            
            console.log(result)
            res.redirect('/')
        
    } else {
        console.log("Info missing");
    }
    } catch (error) {
        console.log(error)
        console.log("Error: Register.")
    }
})











app.listen(port, console.log(`The server is runing on port ${port}...`))
