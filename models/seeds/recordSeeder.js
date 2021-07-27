// 載入資料
const Record = require('../record')
const recordList = require('./record.json')
// 取得資料庫連線狀態
const db = require('../../config/mongoose')

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
  Record.create(recordList).then(() => {
    console.log('done')
    db.close()
  })
})
