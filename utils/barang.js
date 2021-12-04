const conn = require('./db')
const barang = conn.model('barang', {
  tgl: {
    type: 'string',
  },
  nama: {
    type: 'string',
    required: true,
  },
  harga: {
    type: 'string',
    required: true,
  },
  keterangan: {
    type: 'string',
  },
})

module.exports = barang
