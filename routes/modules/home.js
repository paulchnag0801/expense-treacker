const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const Category = require('../../models/Category')
// 設定首頁路由

router.get('/', async (req, res) => {
  const userId = req.user._id
  const categoryList = await Category.find().sort({ _id: 'asc' }).lean()
  const records = await Record.find({ userId })
    .lean()
    .sort({ date: 'desc', _id: 'desc' })
  const categories = await Category.find().lean()
  records.forEach((record) => {
    categories.forEach((category) => {
      if (String(record.categoryId) === String(category._id)) {
        record.icon = category.icon
      }
    })
  })
  let totalAmount = 0
  for (let record of records) {
    totalAmount += record.amount
  }
  res.render('index', { totalAmount, records, categoryList })
})

//篩選路由
router.get('/filter', async (req, res) => {
  const categoryList = await Category.find().sort({ _id: 'asc' }).lean()
  const { categorySelector } = req.query
  if (categorySelector === 'All') {
    return res.redirect('/')
  }
    const records = await Record.find({ category: categorySelector })
      .lean()
      .sort({ _id: 'desc' })
  let totalAmount = 0
  for (let record of records) {
    totalAmount += record.amount
  }
  res.render('index', { totalAmount, records, categoryList, categorySelector })
})

module.exports = router
