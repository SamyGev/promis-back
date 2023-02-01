const express = require('express')
const helmet = require("helmet")
const bodyParser = require('body-parser')
require('dotenv').config()
const Lamp = require('./models/lamps')


const Sequelize = require('sequelize');
const sequelize = require('./config').sequelize;

const http = require('http')
const app = express()
const server = http.createServer(app)
const PORT = 3000 || process.env.port

app.use(helmet())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next();
})

app.use(bodyParser.json())

app.get('/', function (req, res) {
    const lamp = new Lamp({
        id: 2,
        name: 'Augustin',
        url: 'coucou.com',
        price: 0
        });
    lamp.save().then((res)=>{
        res.status(200).send("coucou");
    }).catch((err) =>{
        res.status(500).json(err);
    });
})




// Lamps.create({
//         name: 'toto',
//         url: 'coucou.com',
//         price: 0
//       });
      
//       const lamps = Lamps.findAll();
//       res.send(lamps);
// });


server.listen(PORT, () => console.log(`Server running on ${PORT}`))

