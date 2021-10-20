const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const records = require('./modules/records')
const users = require('./modules/users')
const auth = require('./modules/auth')

const { authenticator } = require('../middleware/auth')

router.use('/records', authenticator,records) //將網址結構符合 /records 導入 records.js
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home) // 將網址結構符合 / 導入home.js
module.exports = router
