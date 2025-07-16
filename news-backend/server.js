const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');
require('dotenv').config();

const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(express.json());


app.get('/extract', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'Missing URL' });

  try {
    const response = await fetch(url);
    const html = await response.text();

    const dom = new JSDOM(html, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    if (!article || !article.textContent) {
      return res.status(500).json({ error: 'Failed to extract article content' });
    }

    res.json({ content: article.textContent });
  } catch (error) {
    console.error("Extraction error:", error);
    res.status(500).json({ error: 'Failed to extract content', details: error.message });
  }
});

// 2️⃣ Summarize content using OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/summarize', async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: 'Missing content to summarize' });

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `Summarize this article in 3-4 lines:\n\n${content}` }],
      temperature: 0.7,
    });

    res.json({ summary: completion.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: 'Failed to generate summary', details: error.message });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`📰 News API server running at http://localhost:${PORT}`);
});
