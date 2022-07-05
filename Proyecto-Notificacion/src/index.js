require("dotenv").config();

const express = require("express");
const Cors = require("cors");
const morgan = require('morgan');
const path = require("path");

const app = express();
app.use(Cors())
const PORT = process.env.PORT || 3000

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Rutas 
app.use(require('./routes/Routes'));

// Contenido estatico
app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT,() =>{
console.log('******* SERVIDOR ESCUCHANDO EN EL PUERTO **********',PORT)
})