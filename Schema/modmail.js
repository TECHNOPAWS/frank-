const { Schema, model } = require('mongoose')

const schema = new Schema({
  userid: String,
  channel: String,
  sent: {
    type: Boolean,
    default: false
  },
  created: {
    type: Boolean,
    default: false
  }
})

module.exports = new model('modmail', schema)