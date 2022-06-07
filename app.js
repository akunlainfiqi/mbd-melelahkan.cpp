const express = require('express');
const mountRoutes = require('./routes');
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.urlencoded({extended: true}));
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