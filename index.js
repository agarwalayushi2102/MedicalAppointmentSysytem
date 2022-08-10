var express = require('express');
var router = express.Router();
const services = require('../services/render');
var Userdb = require('../model/model');

router.get('/appointments', (req,res) => {
  // validate request
  if(req.query.id){
    const id = req.query.id;

    Userdb.findById(id)
        .then(data =>{
            if(!data){
                res.status(404).send({ message : "Not found user with id "+ id})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message: "Error retrieving user with id " + id})
        })

}else{
    Userdb.find()
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
        })
}
});



router.post('/appointments', (req, res, next) => {
  const { date, name, email } = req.body;
   // new user
   const user = new Userdb({
    name : req.body.name,
    email : req.body.email,
    date: req.body.date,
});
  
  if (!name){
    return res.status(400).json({
      message: 'Name are required',
    });
  }
  if (!date){
    return res.status(400).json({
      message: 'Appointment Date are required',
    });
  }
  if (!email){
    return res.status(400).json({
      message: 'Email are required',
    });
  }
 

// save user in the database
user
  .save(user)
  .then(result => res.json(result.ops[0]))
  .catch(error => res.send(error))

});

router.delete('/appointments/:id', (req, res, next) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
});

module.exports = router;