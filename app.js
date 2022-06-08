const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const mountRoutes = require('./routes');
const cors = require('cors');

require("dotenv").config();
require("./passport/jwt")(passport);

const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(session({secret:'apahayo',resave:true,saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());
mountRoutes(app);

const start = async()=>{
    try{
        app.listen(PORT);
        console.log('connected to port '+PORT);
    } catch(err) {
        console.error(err)
    }
}

start();