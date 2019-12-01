const express = require('express')
const router = express.Router();
router.post('/expressions', function(req,res) {

    console.log(req.body);
    
 } );