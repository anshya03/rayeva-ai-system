📘 Module 2: AI B2B Proposal Generator – Architecture Outline
Objective

Generate structured B2B sustainability proposals including:

Sustainable product mix

Budget allocation within limit

Cost breakdown

Impact positioning summary

Structured JSON output

Architecture Flow

Client
→ POST /api/proposal/generate
→ Controller
→ AI Service Layer
→ Budget Validation Logic
→ JSON Sanitization
→ MongoDB Storage
→ Response

Input Example
{
  "company_type": "Retail Chain",
  "budget_limit": 100000,
  "sustainability_goal": "Reduce plastic usage"
}
AI Prompt Strategy

The AI will be instructed to:

Suggest sustainable product mix

Ensure total cost ≤ budget_limit

Provide breakdown per category

Generate structured JSON only

Temperature: 0.3
Reason: deterministic business logic.

Output Structure
{
  "product_mix": [],
  "budget_allocation": [],
  "total_cost": 95000,
  "impact_summary": "",
  "confidence_score": 0.92
}
Data Model (Conceptual)

Proposal Schema:

company_type

budget_limit

product_mix

total_cost

impact_summary

createdAt

📘 Module 3: AI Impact Reporting Generator – Architecture Outline
Objective

Generate sustainability impact metrics per order:

Plastic saved

Carbon avoided (logic-based estimation)

Local sourcing summary

Human-readable impact statement

Architecture Flow

Order Completed
→ Trigger Impact Calculation
→ AI Service
→ Logic-based Estimation Layer
→ Store Impact Report in DB
→ Return structured JSON

Input Example
{
  "order_id": "ORD123",
  "items": [
    { "type": "Reusable Bottle", "quantity": 10 }
  ]
}
Logic Layer

Plastic saved = quantity × estimated grams

Carbon avoided = product factor × emission baseline

Local sourcing = based on supplier metadata

This module combines:

AI + deterministic business rules.

Output Structure
{
  "plastic_saved_grams": 1200,
  "carbon_avoided_kg": 4.5,
  "local_impact_summary": "",
  "impact_statement": "This order helped reduce..."
}
Data Model (Conceptual)

ImpactReport Schema:

order_id

plastic_saved

carbon_avoided

impact_statement

createdAt