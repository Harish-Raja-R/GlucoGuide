# GlucoGuide

> A polished diabetes management dashboard powered by Gemini AI, built for Indian dietary patterns and real glucose tracking.

![GlucoGuide](https://img.shields.io/badge/GlucoGuide-ready-brightgreen)
![Node.js](https://img.shields.io/badge/Platform-Node.js-blue)
![Gemini](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-purple)

---

## 🚀 What is GlucoGuide?

GlucoGuide is an interactive health dashboard that combines:

- Realistic glucose and lifestyle dataset support
- Diet, exercise, circadian, and wellness AI assistance
- Secure Gemini AI proxy backend for model calls
- Rich charts and personalized insights for Type 2 diabetes care

---

## 💡 Highlights

- `index.html` contains the full frontend dashboard UI
- `dataset.js` provides sample profile, glucose history, meal scans, and community posts
- `server.js` proxies AI requests to Gemini securely
- Supports both Google-style `GEMINI_API_KEY` and OpenAI-compatible `OPENAI_API_KEY`

---

## 🛠️ Setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env` and add your API key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

3. Start the app:

```bash
npm start
```

4. Open the dashboard in your browser:

```text
http://localhost:3000
```

---

## 🧠 Gemini AI Integration

The backend routes AI requests through `/api/ai` using:

- `gemini-2.5-flash` for OpenAI-compatible endpoints
- Google Gemini endpoint when a Google-style API key is present

This keeps your API key safe and avoids exposing it to the frontend.

---

## 📁 Files

- `index.html` - main UI and app logic
- `dataset.js` - sample health dataset used by the dashboard
- `server.js` - Node/Express proxy for AI requests
- `package.json` - project dependencies and scripts
- `.env.example` - API key example

---

## ✨ Usage

Use the dashboard to:

- Generate personalized diet and exercise plans
- Analyze glucose patterns
- Get circadian and wellness recommendations
- Chat with the AI health coach

---

## 📌 Notes

- Do not open `index.html` directly with `file://`
- Always run via `npm start` so the backend proxy is available
- If you see errors, check browser DevTools Network for `/api/ai`

---

## 🙌 Contributing

If you want to improve the UI, dataset, or AI prompts, feel free to open a PR.

---

Made with ❤️ for diabetes care and smart AI support.
