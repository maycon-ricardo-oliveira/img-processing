const video = document.getElementById('video')
const motivation = {
  happy: [
      {
          word: "Só se pode alcançar um grande êxito quando nos mantemos fiéis a nós mesmos.",
          author: 'Friedrich Nietzsche'
      },

      {
          word: "Feliz é aquele que vê a felicidade dos outros sem ter inveja. O sol é para todos e a sombra pra quem merece.",
          author: 'Friedrich Nietzsche'
      },

      {
          word: "Na plenitude da felicidade, cada dia é uma vida inteira.",
          author: 'Johann Goethe'
      },
  ],
     
  angry: [
      {
          word: "Sua mente vai responder a maioria das perguntas se você aprender a relaxar e esperar pela resposta.",
          author: 'William S. Burroughs'
      },

      {
          word: "Relaxa a mente, se não estressa.",
          author: 'Racionais MCs'
      },

      {
          word: "A vida pode estar no nível hard. Mas a minha mente tá no modo relax.",
          author: 'W. De Ribeiro'
      }
  ] 
}

var currentMotivation = { }
var indice = {
  happy: 0,
  angry: 0
}

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('../models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('../models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('../models'),
  faceapi.nets.faceExpressionNet.loadFromUri('../models')
]).then(startVideo)

function startVideo() {

  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {

  const canvas = faceapi.createCanvasFromMedia(video) 
  document.getElementById('test').appendChild(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)


    if (resizedDetections.length > 0 && resizedDetections[0].expressions.angry > 0.5) {

        const angryDetection = {
          classScore :  resizedDetections[0].detection.classScore,
          imageHeight: resizedDetections[0].detection.imimageHgeHeight,
          imageWidth: resizedDetections[0].detection.imageimageWidth,
          expressions: {
            name  : 'angry',
            value : resizedDetections[0].expressions.angry
          }
        }

        printEmocion(angryDetection);
        
    }

    if (resizedDetections.length > 0 && resizedDetections[0].expressions.happy > 0.5) {

      const happrExpression = {
        classScore : resizedDetections[0].detection.classScore,
        imageHeight: resizedDetections[0].detection.imimageHgeHeight,
        imageWidth:  resizedDetections[0].detection.imageimageWidth,
        expressions: {
          name  : 'happy',
          value : resizedDetections[0].expressions.happy
        }
      }
      
      printEmocion(happrExpression);
    
  }

  function printEmocion(detection) {
    
    if (detection.expressions.name == 'happy' && indice.happy < motivation.happy.length) {

      document.getElementById("expression").textContent = "É ótimo te ver feliz meu caro";
      document.getElementById("motivation-text").textContent = motivation.happy[indice.happy].word;
      document.getElementById("author").textContent = motivation.happy[indice.happy].author;
      indice.happy++;
      
    } else {

      indice.happy = 0;

    }

    if(detection.expressions.name == 'angry' && indice.angry < motivation.angry.length) {

      document.getElementById("expression").textContent = "Poxa, você está nervoso meu caro";
      document.getElementById("motivation-text").textContent = motivation.angry[indice.angry].word;
      document.getElementById("author").textContent = motivation.angry[indice.angry].author;
      indice.angry++;

    } else {

      indice.angry = 0;

    }
   
  }


  }, 400)
})