import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()
console.log(process.env.OPENAI_API_KEY)
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from ChatGPT!'
  })
})

app.post('/chat', async (req, res) => {
  try {

    const subject = req.body.subject;
    const description = req.body.description;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Please create an email about subject: ${subject} and description: ${description}`,
      temperature: 0.7,
      max_tokens: 2048,
      top_p:1,
      frequency_penalty:0,
      presence_penalty:0
    });

    res.status(200).send({
      answer: response.data.choices[0].text,
      // question:question
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(3000, () => console.log('AI server started on http://localhost:3000'))