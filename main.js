const divCam = document.getElementById('camera');
const divSnap = document.getElementById('snapshot');

//HOJEEEEEEEEEEEEEEEEE!
const divControles = document.getElementById('controles');
const divEmotion1 = document.getElementById('emotion1');
const divEmoji1 = document.getElementById('emoji1');
const divEmotion2 = document.getElementById('emotion2');
const divEmoji2 = document.getElementById('emoji2');

//colocar Modelo Ai (teatchablemachine);
const URL = "https://teachablemachine.withgoogle.com/models/MsgOrdH27/";
const modelURL = URL + "model.json";
const metadataURL = URL + "metadata.json";
const classifier = ml5.imageClassifier(modelURL, modelReady);

const emocoes = {
    "feliz": "&#128522;",
    "triste": "&#128532;",
    "irritado": "&#128548;"
}
function preenchePrevisao(previsao, divEmotion, divEmoji) {
    divEmotion.textContent = previsao;
    const emocao = previsao.toLowerCase();
    const emoji = emocoes[emocao];
    divEmoji.innerHTML = emoji;
}
function modelReady() {
    console.log('Model Ready');
    divControles.style.display = "block";
}

function begin() {
    Webcam.snap(dataURI => {
        const ibagem = document.createElement("img");
        ibagem.id = "captura";
        ibagem.src = dataURI;
        divSnap.innerHTML = "";
        divSnap.appendChild(ibagem);
        divControles.style.display = "none";
        classifier.classify(ibagem, gotResult);
    });
}


//camera
Webcam.set({
    width: 350,
    height: 300,
    imageFormat: 'png',
    pngQuality: 90

})
//permissão
Webcam.attach(divCam);


function begin(){
    Webcam.snap(dataURI => {
        const ibagem = document.createElement("img");
        ibagem.id = "captura";
        ibagem.src = dataURI;
        //colocar dentro do html
        divSnap.innerHTML = "";
        divSnap.appendChild(ibagem);
        //speak("triste", "feliz");
        //Hojeeeeeeeeeeeeeeeeeeeee
        divControles.style.display = "none";
        classifier.classify(ibagem, gotResult)
    
      
    });
}
//explicação
function gotResult(error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
        const resultado1 =  result[0].label;
        const resultado2 =  result[1].label;
        console.log(resultado1, resultado2);
        speak(resultado1, resultado2);
        preenchePrevisao(resultado1, divEmotion1, divEmoji1);
        preenchePrevisao(resultado2, divEmotion2, divEmoji2);
    }
    divControles.style.display = "block";
}

