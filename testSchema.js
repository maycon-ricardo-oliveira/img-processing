const DetectionModel = require('./modules/Detection');
const ExpressionModel = require('./modules/Expression');

const testExpressions = [
    {
        name : 'angry',
        value : '1.00'
    },

    {
        name : 'happy',
        value : '0.055'
    },
];

const testDetections = {
    score: '5.000',
    expressions: []
}

myModel();

async function myModel() {

    const detection = await DetectionModel.create({
        score : testDetections.score
    });
    
    
    await Promise.all(testExpressions.map( async expression => {
        
        const expressionObj = new ExpressionModel({...expression});

        await expressionObj.save();
        detection.expressions.push(expressionObj);     
    }));
 
    await detection.save();

    detections = await DetectionModel.find().populate('Expression')
    console.log(detections)

}


