const express = require('express')
const { route } = require('..')
const router = express.Router()

router.get('/', (req, res) => {
  filteredCategory = ''
  let totalAmount = 0
  Record.find() // 取出 Restaurant model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ name: 'asc' })
    .then((records) => {
      for (let i = 0; i < records.length; i++) {
        totalAmount += Number(records[i].amount)
        // 將 category 字串轉為 icon 名稱
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
      res.render('index', { records, totalAmount, filteredCategory })
    }) // 將資料傳給 index 樣板
    .catch((error) => console.error(error)) // 錯誤處理
})



module.exports = router