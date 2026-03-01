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

## 📚 Additional Module Architecture Designs

Two additional modules have been architecturally designed to demonstrate scalability planning. 

Full architecture documentation: `docs/additional-modules-architecture.md`

**Module 3:** B2B Proposal Generator  
**Module 4:** Sustainability Impact Reporting

Each includes:

- Objective & business logic
- Input/output specifications
- API endpoint design
- Database schema design
- Complete architecture flow

## 🛠 Tech Stack

- Node.js
- Express.js
- OpenAI API (Module 1)
- Google Gemini API via `@google/genai` (Module 2)
- MongoDB Atlas
- Mongoose
- RESTful API design

## 📁 Project Structure

```
rayeva-ai-system/
├── README.md                                      # Main documentation
├── docs/
│   └── additional-modules-architecture.md        # Architecture design for modules 3 & 4
│
├── module-1-category/                            # AI Auto Category & Tag Generator
│   ├── app.js                                    # Express app configuration
│   ├── package.json                              # Dependencies & scripts
│   ├── README.md                                 # Module documentation
│   ├── controllers/
│   │   └── category.controller.js                # Request handling for category endpoints
│   ├── middlewares/
│   │   └── error.middleware.js                   # Centralized error handling
│   ├── models/
│   │   ├── classification.model.js               # Category classification schema
│   │   └── log.model.js                          # Activity logging schema
│   ├── routes/
│   │   └── category.routes.js                    # API route definitions
│   └── services/
│       └── openai.service.js                     # OpenAI API integration service
│
└── module-2-support-bot/                         # AI Customer Support Bot
    ├── server.js                                 # Server entry point
    ├── package.json                              # Dependencies & scripts
    ├── README.md                                 # Module documentation
    └── src/
        ├── app.js                                # Express app configuration
        ├── controllers/
        │   └── webhookController.js              # Webhook request handling
        ├── models/
        │   ├── Conversation.js                   # Conversation history schema
        │   ├── Escalation.js                     # Escalation tracking schema
        │   └── Order.js                          # Order information schema
        ├── routes/
        │   └── webhookRoutes.js                  # Webhook route definitions
        ├── services/
        │   └── geminiService.js                  # Google Gemini API integration service
        └── utils/
            └── db.js                             # MongoDB connection utility
```

### Module Responsibilities

| Module | Purpose | Key Technology |
|--------|---------|-----------------|
| **Module 1** | Automatic product categorization & tagging | OpenAI API, Mongoose |
| **Module 2** | Customer support chatbot with escalation | Google Gemini API, Webhooks |
| **Module 3** | (Designed) B2B proposal generation | - |
| **Module 4** | (Designed) Sustainability reporting | - |

## 🎥 Demo Videos

### Module 1 – AI Auto Category & Tag Generator
https://drive.google.com/file/d/1raw40zRyqacVI-s7lUvPdiDIsiZVJ9Dv/view?usp=sharing

### Module 2 – AI Customer Support Bot
https://drive.google.com/file/d/1HLKO2rJ-J9c5uTExW6526HpYx7F4KwhP/view?usp=sharing

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