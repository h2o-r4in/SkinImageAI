// Update this path to where your model's 'model.json' and 'metadata.json' are located
const URL = "./my-model/";

let model, maxPredictions;

// Load the model
async function loadModel() {
    const modelURL = URL + 'model.json';
    const metadataURL = URL + 'metadata.json';
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    document.getElementById('predictButton').disabled = false; // Enable the predict button after the model is loaded
}

// Wait for the DOM to load before trying to load the model
document.addEventListener('DOMContentLoaded', function() {
    loadModel();
});

// Event listener for the predict button
document.getElementById('predictButton').addEventListener('click', async () => {
    const imageUpload = document.getElementById('imageUpload');
    if (imageUpload.files.length > 0) {
        const file = imageUpload.files[0];
        const image = new Image();
        const reader = new FileReader();

        // Once the file reader loads the image, draw it on a canvas
        reader.onload = async function(e) {
            image.src = e.target.result;
            image.onload = async function() {
                // Create a canvas and get its context
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

                // Make a prediction with the canvas as input
                const prediction = await model.predict(canvas);
                displayPrediction(prediction);
            };
        };
        reader.readAsDataURL(file);
    }
});

// Function to display the prediction results
function displayPrediction(prediction) {
    const resultText = prediction.map(p => `${p.className}: ${p.probability.toFixed(2)}`).join('<br>');
    document.getElementById('predictionResult').innerHTML = resultText;
}

// Read the file as a data URL and trigger the onload event
reader.readAsDataURL(file);

