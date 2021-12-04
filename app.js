const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const barang = require('./utils/barang')
const printExcel = require('./utils/excel')
const path = require('path')
const mime = require('mime')
const fs = require('fs')
const app = express()
const router = express.Router()
require('./utils/db')

const date = new Date()
// const tgl = `${date.getDate()}/${date.getUTCMonth() + 1}/${date.getFullYear()}`
const tgl = date.toLocaleString()
const port = 3000

app.set('view engine', 'ejs')

// middleware third-party
app.use(expressLayouts)

// middleware bawaan
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Halaman Home Page',
    layout: 'layout/main-layout',
  })
})
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Halaman About',
    layout: 'layout/main-layout',
  })
})
app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Halaman contact',
    layout: 'layout/main-layout',
  })
})
app.get('/list-barang', async (req, res) => {
  const items = await barang.find()
  let total = 0
  printExcel()
  res.render('list-barang', {
    title: 'Halaman Rekap harian',
    layout: 'layout/main-layout',
    items,
    total,
  })
})
app.get('/list-barang/add', (req, res) => {
  res.render('add-barang', {
    title: 'Form Tambah Barang',
    layout: 'layout/main-layout',
  })
})
app.post('/list-barang', async (req, res) => {
  const { nama, harga, keterangan } = req.body
  const items = { tgl, nama, harga, keterangan }
  await barang.insertMany(items)
  res.redirect('list-barang')
})

// router.get('list-barang/download', (req, res) => {
//   let file = __dirname + '/data/tes.txt'

//   res.download(file, function (err) {
//     if (err) {
//       console.log(err)
//     }
//   })
// })

app.get('/list-barang/delete/:id', async (req, res) => {
  const item = await barang.findOne({ _id: req.params.id })
  await barang.deleteOne({ _id: req.params.id })
  res.redirect('/list-barang')
})

app.get('/list-barang/:id', async (req, res) => {
  const item = await barang.findOne({ _id: req.params.id })
  res.render('detail-barang', {
    title: 'Detail Barang',
    layout: 'layout/main-layout',
    item,
  })
})

app.use((req, res) => {
  res.status(404)
  res.send(`<h1>Page Not Found 404</h1>`)
})

app.listen(port, () => {
  console.log(`Listening on http//:localhost/${port}`)
})
