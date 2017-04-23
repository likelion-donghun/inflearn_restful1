const express = require('express')
const router = express.Router()

var mysql = require('mysql')
// const path = require('path')
// var passport = require('passport')
// var LocalStrategy = require('passport-local').Strategy

var connection = mysql.createConnection({
  host : '0.0.0.0',
  port : 3306,
  user : 'likelion_donghun',
  password : '',
  database : 'c9'
})

connection.connect(function(){
    console.log('connect')
})



router.get('/list',(req, res)=>{
    res.render('movie.ejs')
})


router.get('/',(req, res)=>{
  var responseData = {};

  var query = connection.query('select title from movie', function(err, rows){
    if(err) throw err;
    if(rows.length){
        console.log(rows)
      responseData.result = 1
      responseData.data = rows
      console.log('title : '+ rows.title)
    }else{
      console.log('none : '+ rows)
      responseData.result = 0

    }
    res.json(responseData);
  })
})

router.post('/',(req, res)=>{
    
    var body = req.body
    var title = body.title
    var type = body.type;
    var grade = body.grade;
    var actor = body.actor;
    console.log('title : ', title);
    // connection.query('insert into user (email, name, pw) values ("'+email+'", "'+ name +'","'+passwd+'")')
    var sql = {title, type, grade, actor}
    var query = connection.query('insert into movie set ?', sql, function(err, rows){
      if(err) throw err
      else
      console.log("ok db insert : ", rows.insertId, rows.name);
      return res.json({'result' : 1})
    })
})




router.get('/:title', function(req, res){
  var title = req.params.title


  console.log('title=>', title)
  var responseData = {};

  var query = connection.query('select * from movie where title = "'+title+'"', function(err, rows){
    if(err) throw err;
    if(rows[0]){
        console.log(rows[0])
      responseData.result = 1
      responseData.data = rows
      console.log('title : '+ rows[0])
    }else{
      console.log('none : '+ rows)
      responseData.result = 0

    }
    res.json(responseData);
  })
    
  })









module.exports = router