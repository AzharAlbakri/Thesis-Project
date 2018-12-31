const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Schema = require('./database/Schema');
const dbOpt = require('./database/dbOpt');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/initializeDB', (req, res) => {
  console.log('testing initialize db');
  Schema.initializeDB(req, res);
});


if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Signup User
app.post('/account/signup', (req, res, next) => {
  dbOpt.signUp(req, res => {
    if (!req.body.name){
      return res.send({
        success: false,
        message: 'Error: must fill in name field.'
      });
    }
    if (!req.body.email){
      return res.send({
        success: false,
        message: 'Error: must fill in email field.'
      });
    }
    if (!req.body.telephone){
      return res.send({
        success: false,
        message: 'Error: must fill in phone number field.'
      });
    }
    if (!req.body.password){
      return res.send({
        success: false,
        message: 'Error: must fill in password field.'
      });
    }
    req.body.email = req.body.email.toLowerCase();

    knex('users').insert(
      knex
        .select(req.body.email, req.body.name)
        .whereNotExists(knex('users').where('email', req.body.email))
    )
  })

})

// Post charities in DB
app.post('/charities',function(req,res){  
    dbOpt.addCharity(req, res)
});

// Get charities by user
app.post('/userCharities', function(req, res) {
  console.log('/userCharities')
  console.log(req.body.owner_id,"get user charities")
  // let owner_id = req.body.id
  dbOpt.getUserChar(req, res) 
console.log("post userCharities", req)
});

// Get all charities
app.get('/charities',function(req, res) {
  console.log(req.body,"get all charities")
  // ORDER BY date DESC
  dbOpt.getAllChar(req, res)
});

//Update charities
  app.put('/charities',function(req, res) {
    dbOpt.updateChar(req, res)
  });


//Delete charities
app.delete('/charities',function(req, res) {
    dbOpt.delChar(req, res)

  });

app.listen(port, () => console.log(`Listening on port ${port}`));