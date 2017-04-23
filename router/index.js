const express = require('express')
const router = express.Router()
const path = require('path')
const movie = require('./movie/movie')

router.use('/movie', movie)


module.exports = router