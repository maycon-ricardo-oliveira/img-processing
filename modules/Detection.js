const mongoose = require('mongoose')

const DetectionSchema = new mongoose.Schema({
    score: {
        type: mongoose.Types.Decimal128,
    },  
    expressions: {
        type: mongoose.Types.Array,
    },
        
})

module.exports = mongoose.model('Detection', DetectionSchema)
