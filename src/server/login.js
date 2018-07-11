const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('./firebaseApp.js');
const jwt = require('jsonwebtoken');
const config = require('./config.js')

router.post('/',(req,res)=>{
  db.collection('AuthUser').where("ID","==",req.body.id+"").get()
  .then(docs =>{
    var data={}
    docs.forEach(doc=>{
      data= doc.data()
    })
    bcrypt.compare(req.body.pass,data.password,(err,result)=>{
      if(result){
        console.log("if"+result);
        const token = jwt.sign({id:req.body.id},config.jwtSecret);
        res.json({token})
      }
      else {
        if(req.body.id != data.ID){
          res.json({message:"This ID does't have"})
        }
        else {
          res.json({message:"password incorrect!!"})
        }
      }

      //console.log("Login:"+result);
    })
 })
})

module.exports = router;
