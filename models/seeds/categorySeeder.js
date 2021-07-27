const Category = require('../Category')
const categoryList = require('./category.json')

// 取得資料庫連線狀態
const db = require('../../config/mongoose')


// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
  Category.create(categoryList).then(() => {
    console.log('done')
    db.close()
  })
})
