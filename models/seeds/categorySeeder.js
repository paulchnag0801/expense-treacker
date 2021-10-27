if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Category = require('../Category')
const categoryList = require('./category.json')

// 取得資料庫連線狀態
const db = require('../../config/mongoose')

// 連線成功
db.once('open', async () => {
  try {
    console.log('mongodb connected!')
    await Category.create(categoryList)
    console.log('categorySeeder create success!')
    process.exit()
  } catch (err) {
    console.log(err)
  }
})
