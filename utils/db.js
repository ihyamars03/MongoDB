const mongoose = require('mongoose')
const conn = mongoose.createConnection(
  'mongodb+srv://ihyamars:ihyamars@cluster0.qtoqg.mongodb.net/myapp?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
)
module.exports = conn
