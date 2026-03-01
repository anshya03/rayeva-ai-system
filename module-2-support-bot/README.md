AI WhatsApp Support Bot
📌 Overview

This project is an AI-powered WhatsApp Support Bot built for an e-commerce platform.

The system automatically understands customer queries, interacts with a real database, and performs business logic such as:

Checking order status

Handling return policy questions

Escalating refund or high-priority issues

Logging all customer interactions

The bot integrates Gemini 2.5 Flash for natural language understanding and MongoDB Atlas for persistent storage.

🚀 Tech Stack

Node.js

Express.js

MongoDB Atlas

Mongoose

Gemini 2.5 Flash (Google GenAI SDK)

🏗 System Architecture
User Message
      ↓
Express API (/api/webhook)
      ↓
Gemini 2.5 Flash (Intent Detection)
      ↓
Business Logic Layer
      ↓
MongoDB Database
      ↓
Structured JSON Response

The AI model is used only for intent detection.
All critical business decisions are handled by backend logic.

🧠 Core Features
1️⃣ Intelligent Intent Detection

The system classifies incoming messages into:

order_status

return_policy

refund_request

other

Example:

Input:

Where is my order ORD1002?

AI Output:

{
  "intent": "order_status"
}
2️⃣ Real-Time Order Status Retrieval

When a user requests order information:

The system extracts the order ID using regex.

It validates that the order belongs to the requesting phone number.

It fetches real data from MongoDB.

It returns structured JSON with order details.

Security is enforced by verifying both:

orderId

customerPhone

Example Response:

{
  "success": true,
  "intent": "order_status",
  "escalated": false,
  "response": "Your order ORD1002 is Delivered and will arrive by February 25.",
  "orderDetails": {
    "status": "Delivered",
    "estimatedDelivery": "February 25"
  }
}
3️⃣ Refund & High-Priority Escalation

If the system detects a refund-related request:

A new document is created in the escalations collection.

The case is marked as High priority.

The user receives confirmation.

The conversation is logged.

Example Escalation Document:

{
  "phone": "9876543210",
  "issue": "I want refund. Product damaged.",
  "priority": "High",
  "status": "Pending"
}
4️⃣ Conversation Logging

Every interaction is stored in the conversations collection.

Stored Data Includes:

Phone number

Original message

Detected intent

Final response

Timestamp

This enables:

Audit tracking

AI behavior monitoring

Business analytics

📂 Database Structure
orders
{
  "orderId": "ORD1002",
  "customerPhone": "9876543210",
  "status": "Delivered",
  "estimatedDelivery": "February 25",
  "refundStatus": "None"
}
conversations
{
  "phone": "9876543210",
  "message": "Where is my order ORD1002?",
  "intent": "order_status",
  "response": "...",
  "createdAt": "..."
}
escalations
{
  "phone": "9876543210",
  "issue": "Refund request",
  "priority": "High",
  "status": "Pending"
}
🔐 Security Considerations

Order status queries validate both order ID and phone number.

AI output is normalized and validated before use.

Sensitive credentials are stored in environment variables.

Database queries prevent cross-user data exposure.

⚙️ API Endpoint
POST /api/webhook

Request Body:

{
  "from": "9876543210",
  "message": "Where is my order ORD1002?"
}

Response:

Structured JSON based on detected intent.

🧩 Key Design Decisions

AI is used strictly for intent detection, not business logic.

Backend controls all database interactions.

Clear separation between:

AI layer

Business logic layer

Database layer

Edge cases handled:

Missing order ID

Invalid order ID

Unauthorized access

Unknown intents

🛠 How To Run Locally

Clone the repository

Install dependencies:

npm install

Add .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key

Start server:

npm start
📈 Future Improvements

WhatsApp Business API integration

Admin dashboard for escalations

Multi-language support

Sentiment-based escalation priority

Deployment to cloud (Render / DigitalOcean)