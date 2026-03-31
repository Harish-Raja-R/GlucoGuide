require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const AI_API_KEY = OPENAI_API_KEY || GEMINI_API_KEY;
const USE_GOOGLE_GEMINI = !!GEMINI_API_KEY && GEMINI_API_KEY.startsWith('AIza');

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post('/api/ai', async (req, res) => {
  if (!AI_API_KEY) {
    return res.status(500).json({ error: 'OPENAI_API_KEY or GEMINI_API_KEY not configured' });
  }

  const { system = '', prompt = '', model = 'gemini-2.5-flash' } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt' });
  }

  try {
    const useGoogle = USE_GOOGLE_GEMINI;
    const requestUrl = useGoogle
      ? `https://generativelanguage.googleapis.com/v1/models/${model}:generate?key=${encodeURIComponent(AI_API_KEY)}`
      : 'https://api.openai.com/v1/responses';

    const requestBody = useGoogle
      ? {
          prompt: {
            text: `${system}\n\n${prompt}`
          },
          temperature: 0.8,
          maxOutputTokens: 1000
        }
      : {
          model,
          input: [
            { role: 'system', content: system },
            { role: 'user', content: prompt }
          ],
          max_output_tokens: 1000,
          temperature: 0.8
        };

    const headers = {
      'Content-Type': 'application/json'
    };
    if (!useGoogle) {
      headers.Authorization = `Bearer ${AI_API_KEY}`;
    }

    const response = await fetch(requestUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('AI provider returned error', response.status, response.statusText, errorBody);
      return res.status(response.status).json({ error: `AI provider error ${response.status}: ${errorBody}` });
    }

    const data = await response.json().catch((parseError) => {
      console.error('Unable to parse AI provider JSON:', parseError);
      return null;
    });

    if (!data) {
      return res.status(502).json({ error: 'Invalid JSON returned from AI provider' });
    }

    let text = '';
    if (useGoogle) {
      text = (data.candidates || [])
        .map(candidate => candidate.output || candidate.outputText || '')
        .join('\n') || '';
    } else {
      text = data.output_text || (data.output || [])
        .flatMap(item => item.content || [])
        .map(block => block.text || '')
        .join('') || '';
    }

    return res.json({ text, raw: data });
  } catch (error) {
    console.error('AI proxy error:', error);
    return res.status(500).json({ error: error.message || 'AI proxy failure' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`GlucoGuide server running at http://localhost:${port}`);
});
