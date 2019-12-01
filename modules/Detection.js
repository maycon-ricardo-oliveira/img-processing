const mongoose = require('mongoose')

const DetectionSchema = new mongoose.Schema({
    classScore: Number,  
    imageHeight: Number,
    imageWidth: Number,
    expressions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expression'
    }]
})


module.exports = mongoose.model('Detection', DetectionSchema);
