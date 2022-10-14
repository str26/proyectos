/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

const video = document.getElementById('webcam');
const liveView = document.getElementById('liveView');
const demosSection = document.getElementById('demos');
const enableWebcamButton = document.getElementById('webcamButton');

// Comprueba si el acceso a la cámara web es compatible.
function getUserMediaSupported() {
  return !!(navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia);
}

// Si se admite la cámara web, añadir un receptor de eventos al botón para que cuando el usuario
// quiera activarlo para llamar a la función enableCam que  
// definiremos en el siguiente paso.
if (getUserMediaSupported()) {
  enableWebcamButton.addEventListener('click', enableCam);
} else {
  console.warn('getUserMedia() is not supported by your browser');
}

// Placeholder de función para el próximo paso. Pegar sobre esto en el siguiente paso.
function enableCam(event) {
}


// Habilitar la vista de la cámara web en vivo y comenzar la clasificación.
function enableCam(event) {
  // Sólo continúa si el COCO-SSD ha terminado de cargarse.
  if (!model) {
    return;
  }
  
  // Ocultar el botón una vez pulsado.
  event.target.classList.add('removed');  
  
  // Parámetros getUsermedia para forzar el vídeo pero no el audio.
  const constraints = {
    video: true
  };

  // Activar el flujo de video de la webcam.
  navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
    video.srcObject = stream;
    video.addEventListener('loadeddata', predictWebcam);
  });
}

// Placeholder de función para el próximo paso.
function predictWebcam() {
}

// Finge que el modelo se ha cargado para que podamos probar el código de la webcam.
var model = true;
demosSection.classList.remove('invisible');

// Almacenar el modelo resultante en el ámbito global de nuestra aplicación.
var model = undefined;

// Antes de poder utilizar la clase COCO-SSD debemos esperar a que termine de
// cargar. Los modelos de Machine Learning pueden ser grandes y tardan un momento  
// para obtener todo lo necesario para su ejecución.
// Nota: cocoSsd es un objeto externo cargado desde nuestro index.html
// importación de etiquetas de script, así que ignora cualquier advertencia en Glitch.
cocoSsd.load().then(function (loadedModel) {
  model = loadedModel;
  // Mostrar la sección de demo ahora el modelo está listo para ser usado.
  demosSection.classList.remove('invisible');
});


var children = [];

function predictWebcam() {
  // Ahora vamos a empezar a clasificar un cuadro en el flujo de video.
  model.detect(video).then(function (predictions) {
    // Elimina cualquier resalto que hayamos hecho en el cuadro anterior.
    for (let i = 0; i < children.length; i++) {
      liveView.removeChild(children[i]);
    }
    children.splice(0);
    
     // Ahora vamos a recorrer las predicciones y dibujarlas en la vista en vivo si
     // tienen una puntuación de confianza alta.
    for (let n = 0; n < predictions.length; n++) {
      // Si estamos más de un 66% seguras de que lo hemos clasificado bien, ¡dibújalo!
      if (predictions[n].score > 0.66) {
        const p = document.createElement('p');
        p.innerText = predictions[n].class  + ' - with ' 
            + Math.round(parseFloat(predictions[n].score) * 100) 
            + '% confidence.';
        p.style = 'margin-left: ' + predictions[n].bbox[0] + 'px; margin-top: '
            + (predictions[n].bbox[1] - 10) + 'px; width: ' 
            + (predictions[n].bbox[2] - 10) + 'px; top: 0; left: 0;';

        const highlighter = document.createElement('div');
        highlighter.setAttribute('class', 'highlighter');
        highlighter.style = 'left: ' + predictions[n].bbox[0] + 'px; top: '
            + predictions[n].bbox[1] + 'px; width: ' 
            + predictions[n].bbox[2] + 'px; height: '
            + predictions[n].bbox[3] + 'px;';

        liveView.appendChild(highlighter);
        liveView.appendChild(p);
        children.push(highlighter);
        children.push(p);
      }
    }
    
     // Llama a esta función de nuevo para seguir prediciendo cuando el navegador está listo.
    window.requestAnimationFrame(predictWebcam);
  });
}