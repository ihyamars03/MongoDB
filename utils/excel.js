const xl = require('excel4node')
const barang = require('./barang')
require('./db')

const wb = new xl.Workbook()
const ws = wb.addWorksheet('Rekapan Harian')
var style = wb.createStyle({
  font: {
    color: 'black',
    size: 12,
  },
  //   numberFormat: '$#,##0.00; ($#,##0.00); -',
})

const printExcel = async () => {
  const items = await barang.find()
  let total = 0
  ws.cell(1, 1).string('No').style(style)
  ws.cell(1, 2).string('Tanggal (bln/tgl/tahun)').style(style)
  ws.cell(1, 3).string('Nama').style(style)
  ws.cell(1, 4).string('Harga').style(style)
  ws.cell(1, 5).string('Keterangan').style(style)
  ws.cell(1, 6).string('Total Harga').style(style)

  items.forEach((item, i) => {
    ws.cell(i + 2, 1)
      .string(`${i + 1}.`)
      .style(style)
    ws.cell(i + 2, 2)
      .string(item.tgl)
      .style(style)
    ws.cell(i + 2, 3)
      .string(item.nama)
      .style(style)
    ws.cell(i + 2, 4)
      .string(`Rp.${item.harga}`)
      .style(style)
    ws.cell(i + 2, 5)
      .string(item.keterangan)
      .style(style)
    total += parseInt(item.harga)
  })
  ws.cell(2, 6).string(`Rp.${total.toString()}`).style(style)

  wb.write('./data/Data_Harian.xlsx')
}

module.exports = printExcel
