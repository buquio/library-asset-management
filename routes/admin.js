const router = require('express').Router(); //same as express.Router()
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.post('/login', (req, res) => {
  User.find({email: req.body.email })
  .exec()
  .then(user => {
    if(user.length < 1) {
      return res.status(401).json({message: 'Access not granted.'});
    } 
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if(err) {
        return res.status(401).json({message: 'Access not granted'});
      }
      if(result && user[0].role === "Admin" || "admin") {
        return res.status(200).json({
          message: 'Welcome Admin.',
          name: req.body.email});
      }
      return res.status(401).json({message: 'Access not granted'});
    })
    
  })
  .catch(err => {
    res.status(500).json({
      error:err
    });
  });
  //next()
});

module.exports = router;