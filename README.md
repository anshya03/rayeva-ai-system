# 📖 Overview

This repository contains an AI-powered backend platform designed for sustainable commerce use cases.

The system demonstrates production-style architecture by implementing two fully functional AI modules and outlining architecture for additional scalable modules.

The focus is on structured AI integration with real business logic, validation, and cloud persistence.

## ✅ Implemented Modules

### 1️⃣ AI Auto Category & Tag Generator

Automatically classifies product descriptions into predefined business categories and generates:

- Primary category (restricted enum list)
- Sub-category
- 5–10 SEO tags
- Sustainability tags
- Confidence score (0–1)
- Structured JSON output
- MongoDB storage with validation

📂 Location: `module-1-category/`

### 2️⃣ AI Customer Support Bot

AI-powered backend chatbot that:

- Handles order status queries
- Answers return policy questions
- Escalates refund or high-priority issues
- Logs all conversations
- Integrates AI with business logic

📂 Location: `module-2-support-bot/`

## 🏗 Architecture Overview

The platform follows a layered backend architecture:

Client  
→ Routes  
→ Controllers  
→ Service Layer (AI Logic)  
→ Model Layer (Schema Validation)  
→ MongoDB Atlas  
→ Structured Response

Key principles:

- Separation of concerns
- Schema-level validation
- AI output sanitization
- Centralized error handling
- Structured JSON enforcement
- Cloud database integration

Each module is independently structured but follows consistent architectural patterns.

## 📚 Architecture Design for Additional Modules

The remaining modules are outlined in `docs/additional-modules-architecture.md`.

These include:

- B2B Proposal Generator
- Sustainability Impact Reporting
- Budget Allocation Engine

Each is documented with:

- Objective
- Inputs & outputs
- API design
- Data models
- Scalable architecture flow

## 🛠 Tech Stack

- Node.js
- Express.js
- OpenAI API (Module 1)
- Google Gemini API via `@google/genai` (Module 2)
- MongoDB Atlas
- Mongoose
- RESTful API design




## 🎥 Demo Videos

### Module 2 – AI Customer Support Bot
https://drive.google.com/file/d/1HLKO2rJ-J9c5uTExW6526HpYx7F4KwhP/view?usp=sharing


### Module 1 – AI Auto Category & Tag Generator
https://drive.google.com/file/d/1raw40zRyqacVI-s7lUvPdiDIsiZVJ9Dv/view?usp=sharing

## 📦 How To Run Each Module

Each module is independent and has its own environment variables.

### Module 1: AI Auto Category & Tag Generator

```bash
cd module-1-category
npm install
npm start
```

Required `.env`:

```env
OPENAI_API_KEY=your_openai_key
MONGO_URI=your_mongodb_uri
PORT=5000
```

### Module 2: AI Customer Support Bot

```bash
cd module-2-support-bot
npm install
npm start
```

Required `.env`:

```env
GEMINI_API_KEY=your_gemini_key
MONGO_URI=your_mongodb_uri
PORT=5000
```

## 🎯 Engineering Concepts Demonstrated

- AI prompt engineering
- Business rule enforcement
- Enum-based category restriction
- Confidence normalization
- Centralized error middleware
- Logging and monitoring
- Modular backend architecture
- Cloud database integration

## 🚀 System Goal

This platform demonstrates how AI systems can be integrated into real-world commerce workflows while maintaining structured validation, scalability, and clean backend architecture.