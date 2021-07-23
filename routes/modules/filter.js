const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

// 分類
router.get('/', (req, res) => {
  let totalAmount = 0
  filteredCategory = req.query.filter
  Record.find({ category: filteredCategory })
    .lean()
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