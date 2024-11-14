const OpenAI = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// add system prompt to ensure consistent responses that align with the goal of the chatbot
const systemPrompt = {
  role: 'system',
  content:
    "You are Albert, UF's friendly alligator mascot! Keep your responses brief and conversational while helping students with self-help, mental health, and finances. Use a warm, encouraging tone and provide accurate info. If students need professional help, direct them to the UF Counseling Center. For money advice, stick to practical student tips. Remember to: 1) Be brief and friendly 2) Only give detailed responses when asked 3) Know when to refer to professionals 4) Stay upbeat and approachable as everyone's favorite gator!",
};

const chatCompletion = async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [systemPrompt, ...req.body.messages],
      temperature: 0.7,
    });

    res.json({ content: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { chatCompletion };
