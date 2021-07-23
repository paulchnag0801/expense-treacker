const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

//create new record
router.get('/new', (req, res) => {
  res.render('new')
})
router.post('/', (req, res) => {
  const { name, amount, category, date } = req.body
  return Record.create({ name, amount, category, date })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 瀏覽特定支出
router.get('/:id', (req, res) => {
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
    .catch(error => console.log(error))
})

//從主頁修改單筆支出
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then((record) => {
      res.render('edit', { record })
    })
})
//在修改頁面edit，編輯支出。
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, amount, category, date } = req.body
  return Record.findById(id)
    .then(record => {
      record.name = name
      record.amount = amount
      record.category = category
      record.date = date
      return record.save()
    })
    .then(() => res.redirect(`/records/${id}`))
    .catch(error => console.log(error))
})

// 刪除單筆支出
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router