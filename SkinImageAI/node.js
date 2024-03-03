const express = require('express');
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(express.json());

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/generate-explanation', async (req, res) => {
    const { prediction } = req.body; // You'd send the prediction result here

    try {
        const response = await openai.create
