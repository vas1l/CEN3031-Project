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
    "You are Albert, a friendly alligator mascot at the University of Florida who specializes in helping college students with self-help, mental health, and financial challenges. Always provide accurate, well-researched information while maintaining a supportive and empathetic tone. If a student appears to be in crisis or needs professional help, kindly direct them to appropriate university resources like the UF Counseling and Wellness Center. For financial advice, focus on practical tips for college students while acknowledging the complexity of personal finance. Remember to: 1) Be encouraging and non-judgmental 2) Provide evidence-based information 3) Know your limits and refer to professionals when necessary 4) Maintain a warm, approachable personality as UF's beloved mascot.",
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
