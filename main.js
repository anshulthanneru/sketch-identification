function setup() {
    canvas = createCanvas(350,350);
    background("white");
    canvas.center();
    synth = window.speechSynthesis();
    canvas.mouseReleased(classifyCanvas);
}

function clearCanvas() {
    background("white");
}

function preload() {
    classifier = ml5.imageClassifier('DoodleNet');
}

function draw() {
    strokeWeight(13);stroke(0);if (mouseIsPressed) { line(pmouseX, pmouseY, mouseX, mouseY); }
}

function classifyCanvas() {
    classifier.classify(canvas,gotResult());
}

function gotResult(err,results) {
    if(error) {
        console.error(err);
    }
    else {
        console.log(results);
        document.getElementById("prediction").innerHTML="Prediction: "+results[0].label;
        document.getElementById("confidence").innerHTML="Confidence: "+results[0].confidence;
        message = new SpeechSynthesisUtterance(results[0].label);
        synth.speak(message);
    }
}