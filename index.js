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

//POST lamp
app.post('/api/lamps', function (req, res) {
    // Validate request
    if (!req.body.name || !req.body.url || !req.body.price) {
        res.status(400).send({
        message: "toto"
        });
        return;
    }

    console.log("ma requête : ")
    console.log(req.body)
    const lamp = new Lamp({
        name: req.body.name,
        url: req.body.url,
        price: req.body.price
        });
        
    // console.log(lamp)
    lamp.save().then((res)=>{
        res.status(200).send("Lamp saved");
    }).catch((err) =>{
        res.status(500).json(err);
    });
})

//GET lamps
app.get('/api/lamps', function (req, res) {
    Lamp.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        console.log(err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving lamps."
        });
    });
});

//GET one lamp
app.get('/api/lamps/:id', function(req, res){
    const id = req.params.id;

    Lamp.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find lamp with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving lamp with id=" + id
      });
    });
});

//DELETE lamp
app.delete('/api/lamps/:id', function(req, res){
  const id = req.params.id;

  Lamp.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Lamp was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete lamp with id=${id}. Maybe lamp was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete lamp with id=" + id
      });
    });
})

server.listen(PORT, () => console.log(`Server running on ${PORT}`))