const mongoose = require('mongoose')

const ExpressionSchema = new mongoose.Schema({
    name: String,
    value: Number
})

module.exports = mongoose.model('Expression', ExpressionSchema);