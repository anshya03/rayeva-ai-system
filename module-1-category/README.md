📌 AI-Powered Product Classification System
📖 Overview

This project is a backend AI system that automatically classifies product descriptions into structured business categories using the OpenAI API.

The system generates:

Primary Category (from controlled business list)

Sub-category

5–10 SEO tags

Sustainability tags

Confidence score (0–1)

All results are validated and stored in MongoDB Atlas.

🚀 Features

AI-based semantic product classification

Strict business-category enforcement (enum validation)

SEO tag generation (5–10 tags)

Sustainability attribute detection

Confidence score normalization (0–1)

MongoDB Atlas cloud storage

Centralized error handling middleware

Request logging with response time tracking

🏗 Architecture Overview

The application follows a layered backend architecture:

Client
→ Routes
→ Controller
→ Service Layer (AI Logic)
→ Model Layer (Schema Validation)
→ MongoDB Atlas
→ Response

🔹 Routes

Maps API endpoints to controller functions.

Example:

POST /api/category/classify
🔹 Controller

Responsible for:

Input validation

Calling AI service

Saving results to database

Returning structured JSON response

🔹 Service Layer (AI Logic)

Handles:

Prompt construction

OpenAI API communication

JSON parsing

Business rule validation

Confidence normalization

This ensures separation of concerns and maintainability.

🔹 Model Layer (Mongoose Schema)

The schema enforces:

Primary category must match predefined enum list

SEO tags must be between 5–10

Confidence score must be between 0 and 1

Automatic timestamps for records

Schema-level validation guarantees database integrity.

🔹 Middleware

A global error-handling middleware ensures:

Centralized error management

Consistent API responses

Clean controller logic

🤖 AI Prompt Design

The prompt is engineered to:

Restrict primary category to predefined business categories

Enforce strict JSON output format

Prevent explanatory text

Normalize confidence scores

Generate structured metadata consistently

Temperature is set to 0.3 to improve deterministic outputs.

Additionally, AI outputs are validated before database insertion to prevent invalid category storage.

📊 Logging & Observability

The system logs:

Product description

Classification status (SUCCESS / FAILED)

Response time (milliseconds)

Error messages (if any)

This improves monitoring and debugging capabilities.

🛠 Tech Stack

Node.js

Express.js

OpenAI API

MongoDB Atlas

Mongoose

RESTful API Design