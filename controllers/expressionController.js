const DetectionModel = require('../modules/Detection');
const ExpressionModel = require('../modules/Expression');

module.exports = {
    async store(req, res) {



        console.log(req.body)
        
        // const detection = await DetectionModel.create({
        //     score : happyDetection.classScore
        // });
        
        // await Promise.all(happyExpression.map( async expression => {
            
        //     const expressionObj = new ExpressionModel({...expression});

        //     await expressionObj.save();
        //     detection.expressions.push(expressionObj);     
            
        // }));

        // await detection.save();

        // detections = await DetectionModel.find().populate('Expression')
        // console.log(detections)
    }

}
