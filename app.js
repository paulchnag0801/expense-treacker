const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose
const exphbs = require('express-handlebars')
const app = express()
const Record = require('./models/record')
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    eq: function (a, b) {
      return a === b
    },
  },
})
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

app.engine('hbs', hbs.engine)
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
//create new record
app.get('/records/new', (req, res) => {
  return res.render('new')
})
app.post('/records', (req, res) => {
  const { name, amount, category, date } = req.body
  return Record.create({ name, amount, category, date })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

//read record detail
app.get('/records/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => {
      switch (record.category) {
        case 'meals':
          record.category = '餐飲食品'
          break
        case 'traffics':
          record.category = '交通出行'
          break
        case 'entertainments':
          record.category = '休閒娛樂'
          break
        case 'living':
          record.category = '家居物業'
          break
        case 'others':
          record.category = '其他'
          break
      }
      res.render('detail', { record })
    })
    .catch((error) => console.log(error))
})

//從主頁修改單筆支出
app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  const { name, amount, category, date } = req.body
  Record.findById(id)
    .lean()
    .then((record) => {
      res.render('edit', { record })
    })
})

//在修改頁面edit，編輯支出。
// 修改單筆支出
app.post('/records/:id/edit', (req, res) => {
  const id = req.params.id
  const { name, amount, category, date }= req.body
  return Record.findById(id)
    .then(record => {
      record.name = name
      record.amount = amount
      record.category = category
      record.date = date
      return record.save()
    })
    .then(()=> res.redirect(`/records/${id}`))
    .catch(error => console.log(error))
})

app.listen(3000, () => {
  console.log('App is running in http;//localhost:3000')
})
