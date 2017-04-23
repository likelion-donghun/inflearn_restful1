const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const index = require('./router/index')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use('/', index)

app.listen(8080, function(){
    console.log('Server is running on 8080')
})