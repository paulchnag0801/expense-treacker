if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 載入資料
const bcrypt = require('bcryptjs')
const User = require('../user')
const Record = require('../Record')
const recordList = require('./record.json')
const Category = require('../Category')
// 取得資料庫連線狀態
const db = require('../../config/mongoose')

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678',
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(SEED_USER.password, salt))
    .then((hash) =>
      User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash,
      })
    )
    .then((user) => {
      return Promise.all(
        recordList.map((record) => {
          const { name, category, date, amount } = record
          return Category.findOne({ name: category })
            .lean()
            .exec()
            .then((obj) => {
              // console.log(obj)
              const categoryId = obj._id
              const userId = user._id
              return Record.create({
                name,
                category,
                date,
                amount,
                userId,
                categoryId,
              })
            })
        })
      )
    })
    .then(() => {
      console.log('recordSeeder done!')
      process.exit()
    })
    .catch((err) => console.log(err))
})
