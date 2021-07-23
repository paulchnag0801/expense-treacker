const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose
const exphbs = require('express-handlebars')
const routes = require('./routes')
const app = express()
const Record = require('./models/record')
const methodOverride = require('method-override')
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
app.use(methodOverride('_method'))
app.use(routes)

//宣告篩選category
let filteredCategory = ''



app.listen(3000, () => {
  console.log('App is running in http;//localhost:3000')
})
