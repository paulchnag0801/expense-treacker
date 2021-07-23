// mongoose
const mongoose = require('mongoose') // 載入 mongoose
mongoose.connect('mongodb://localhost/expense-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}) // 設定連線到 mongoDB

// 載入資料
const Record = require('../record')
const recordList = require('./record.json')
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < recordList.length; i++) {
    Record.create({
      name: recordList[i].name,
      category: recordList[i].category,
      date: recordList[i].date,
      amount: recordList[i].amount,
    })
  }
  console.log('done')
})
