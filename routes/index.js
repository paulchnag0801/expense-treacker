const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const records = require('./modules/records')
const users = require('./modules/users')

router.use('/', home) // 將網址結構符合 / 導入home.js
router.use('/records',records) //將網址結構符合 /records 導入 records.js
router.use('/users', users)
module.exports = router
