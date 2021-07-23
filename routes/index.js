const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const filter = require('./modules/filter')
const records = require('./modules/records')

router.use('/', home) // 將網址結構符合 / 字串開頭的 request 導向 home 模組
router.use('/filter', filter)  // 將網址結構符合 /filter 字串開頭的 request 導向 filter 模組
router.use('/records', records)//將網址結構符合 /records 字串開頭的 request 導向 records 模組

module.exports = router
