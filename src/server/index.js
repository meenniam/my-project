const express = require('express');
const bodyParser= require('body-parser');
const bcrypt = require('bcryptjs');
const auth = require('./login.js');
const addUser = require('./signup.js');
const db = require('./firebaseApp.js');

const app = express();

app.use(bodyParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/login',auth);
app.use('/api/username',addUser);

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) =>{
  db.collection('User').get()
  .then(docs=>{
    var data=[]
    docs.forEach(doc=>{
      data.push(doc.data())
    })
    res.json(data)
  })
});



app.listen(8080, () => console.log('Listening on port 8080!'));
