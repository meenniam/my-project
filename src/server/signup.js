const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('./firebaseApp.js');

router.post('/',async(req,res) =>{

  const salt = await bcrypt.genSalt(10);
  const passhash = await bcrypt.hash(req.body.pass,salt);

  var data = {
    "ID": req.body.id,
    "password": passhash,
  }
  db.collection('AuthUser').doc().set(data)
  .then(()=>{
    res.json(data)
  })


});

module.exports = router;
