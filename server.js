const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path');
const router = express.Router();
const mongoose = require('mongoose');
const BodyParser = require('body-parser')
const detections = require('./routes/detections')
const port = 5000;
const host = 'localhost';

const ExpressionController   = require('./controllers/expressionController')

app.use('/', router);
app.use(cors())
app.use(express.json())
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: true }))

router.get('/',function(req,res) {

    res.sendFile(path.join(__dirname+'/index.html'));
    app.use("/scripts", express.static('./scripts/'));
    app.use("/lib", express.static('./lib/'));
    app.use("/models", express.static('./models/'));

  })

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://mongo/img-process', { useNewUrlParser: true });
        console.log("MongoDB Conected")
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};


app.listen(port, host);