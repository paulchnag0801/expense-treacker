const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const Category = require('../../models/Category')

//create new record
router.get('/new', async (req, res) => {
  const categoryList = await Category.find().sort({ _id: 'asc' }).lean()
  res.render('new', { categoryList })
})

router.post('/', async (req, res) => {
  const userId = req.user._id
  const { name, date, category, amount } = req.body
  const CategoryIcon = await Category.findOne({ name: category }).lean().exec()
  const categoryId = CategoryIcon._id
  await Record.create({
    name,
    date,
    category,
    amount,
    userId,
    categoryId,
  })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// 瀏覽特定支出
router.get('/:id', async (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  await Record.findOne({ _id, userId })
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
router.get('/:record_id/edit', async (req, res) => {
  // const categoryId = req.category.id
  const userId = req.user._id
  const categoryList = await Category.find().sort({ _id: 'asc' }).lean()
  const _id = req.params.record_id
  await Record.findOne({ _id, userId })
    .lean()
    .then((record) => res.render('edit', { record, categoryList }))
    .catch((error) => console.log(error))
})

//在修改頁面edit，編輯支出。
router.put('/:record_id', (req, res) => {
  // const categoryId = req.category.id
  const userId = req.user._id
  const _id = req.params.record_id
  const { name, date, category, amount, shop } = req.body
  return Record.findOne({ _id, userId })
    .then((record) => {
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      record.shop = shop
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// 刪除單筆支出
router.delete('/:record_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.record_id
  return Record.findOne({ _id, userId })
    .then((record) => record.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

module.exports = router
