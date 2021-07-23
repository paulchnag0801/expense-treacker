const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose
const exphbs = require('express-handlebars')
const app = express()
const Record = require('./models/record')

mongoose.connect('mongodb://localhost/expense-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}) // 設定連線到 mongoDB

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
// setting static files
app.use(express.static('public'))

app.get('/', (req, res) => {
  let totalAmount = 0
  Record.find() // 取出 Restaurant model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ name: 'asc' })
    .then((records) => {
      for (let i = 0; i < records.length; i++) {
        totalAmount += Number(records[i].amount)
        switch (records[i].category) {
          case 'meals':
            records[i].category = 'utensils'
            break
          case 'traffics':
            records[i].category = 'shuttle-van'
            break
          case 'entertainments':
            records[i].category = 'grin-beam'
            break
          case 'living':
            records[i].category = 'home'
            break
          case 'others':
            records[i].category = 'pen'
            break
        }
      }
      res.render('index', { records, totalAmount })
    }) // 將資料傳給 index 樣板
    .catch((error) => console.error(error)) // 錯誤處理
})
//create new
app.get('/records/new', (req, res) => {
  return res.render('new')
})
app.post('/records', (req, res) => {
  const { name, amount, category, date } = req.body
  return Record.create({ name, amount, category, date })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

app.listen(3000, () => {
  console.log('App is running in http;//localhost:3000')
})
