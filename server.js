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

//azhar

// NOTE: when user get somthing from the addPost
app.post('/charities',function(req,res){
  // console.log(req.body,"owner_ido/*/*/*/**/*/*/*/**/*/*/**/*/*/*//*/*wner_idowner_id")
    // column name inside the charities table (id	name	amount	description	location	owner_id)

    var id = req.body.id;
    //image
    var image = req.body.image;
    var description = req.body.description;
    var name = req.body.name;
    var location = req.body.location;
    var amount = req.body.amount;
    // var date = new Date();
    // console.log(date)

     var owner_id = req.body.owner_id;

    
    // console.log(req.body);

    // NOTE: Query to insert the charities information
    // id	name	amount	description	location	owner_id
  // changed from batata to charity
    var charity = `insert into charities (name, amount, description, location,image,owner_id)
    values
    (\"${name}\",\"${amount}\",\"${description}\",\"${location}\",\"${image}\",\"${owner_id}\")`

// ,\"${owner_id}\"
    // NOTE: insert post information to the database
    dbOpt.Schema.query(charity, function(err, result) {
      if (result) {
        res.send("charity added scusesfully ")
      } else {
        res.send(err)
      }
    })


  });

// app.post('/charities',function(req,res){
//   console.log(req.body,"owner_ido/*/*/*/**/*/*/*/**/*/*/**/*/*/*//*/*wner_idowner_id")
//     // id	name	amount	description	location	owner_id

//     var id = req.body.id;
//     var description = req.body.description;
//     var name = req.body.name;
//     var location = req.body.location;
//     var amount = req.body.amount;
//     var owner_id = req.body.owner_id;

    
//     console.log(req.body);

//     // NOTE: Query to insert the charities information
//     // id	name	amount	description	location	owner_id

//     var batata = `insert into charities (name, amount, description, location, owner_id)
//     values
//     (\"${name}\",\"${amount}\",\"${description}\",\"${location}\",\"${owner_id}\")`


//     // NOTE: insert post information to the database
//     dbConnection.Schema.query(batata, function(err, result) {
//       if (result) {
//         res.send("charity added scusesfully ")
//       } else {
//         res.send(err)
//       }
//     })


//   });
// get all charities from specific user
app.post('/userCharities',function(req, res) {
  // ORDER BY column1, column2, ... ASC|DESC;
  console.log(req.body,"usrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
  var owner_id = req.body.owner_id
  // ORDER BY date DESC
  var query = `select * from charities  WHERE owner_id = \"${owner_id}\"`
  dbOpt.Schema.query(query, function(err, result) {
    if (result) {
      // console.log('result',result)
      res.send(result)
    } else {
      res.send(err)
    }
  })
});



  // get all charities 
 
  app.get('/charities',function(req, res) {
    // ORDER BY column1, column2, ... ASC|DESC;
    // ORDER BY date DESC
    var query = `select * from charities`
    dbOpt.Schema.query(query, function(err, result) {
      if (result) {
        // console.log('result',result)
        res.send(result)
      } else {
        res.send(err)
      }
    })
  });


  // Api to update charities

  app.put('/charities',function(req, res) {

    var id = req.body.id;
    var description = req.body.description;
    var name = req.body.name;
    var location = req.body.location;
    var amount = req.body.amount;
    var owner_id = req.body.owner_id;

    // (\"${id}\",\"${name}\",\"${amount}\",\"${description}\",\"${location}\",\"${owner_id}\")`

    var query = `UPDATE charities SET name=\"${name}\", amount= \"${amount}\", location= \"${location}\", description= \"${description}\" WHERE id=\"${id}\"`
    dbOpt.Schema.query(query, function(err, result) {
      if (result) {
        // console.log('result',result)
        res.send("update charities succ")
      } else {
        res.send(err)
      }
    })
  });


  // Api to delete charities
  
  app.delete('/charities',function(req, res) {
console.log("delete rout: ",req.body)
    var id = req.body.id;

    // (\"${id}\",\"${name}\",\"${amount}\",\"${description}\",\"${location}\",\"${owner_id}\")`

    var query = `DELETE FROM charities WHERE id=\"${id}\"`
    dbOpt.Schema.query(query, function(err, result) {
      if (result) {
        // console.log('result',result)
        res.send("delete charities succ")
      } else {
        res.send(err)
      }
    })
  });

//azhar

/*user///////////////////// */
  // Api to add users

app.listen(port, () => console.log(`Listening on port ${port}`));