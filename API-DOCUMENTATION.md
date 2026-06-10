# AI Talent Intelligence HRMS
## API Documentation

---

### THEME: AI-Powered HR Management System

---

### Team Details
| S.No | Name | Email | Year |
|------|------|-------|------|
| 1. | Jayashree | - | - |

---

## System Architecture

The AI Talent Intelligence HRMS project is designed using Clean Architecture principles, enforcing separation of layers across the frontend (Next.js 15) and backend (FastAPI):

- **Frontend**: Next.js 15 with React and TypeScript
- **Backend**: FastAPI (Python) with async endpoints
- **Database**: PostgreSQL with SQLAlchemy ORM
- **AI Engine**: Google Gemini 1.5 Flash
- **Caching/Real-time**: Redis (optional)
- **Authentication**: JWT-based authentication

---

## 1. Introduction

AI Talent Intelligence HRMS is a next-generation enterprise-grade Human Resource Management System powered by Artificial Intelligence. It streamlines talent acquisition, candidate screening, voice interviews, workforce tracking, attrition forecasting, and analytical business insights.

This document describes the APIs utilized within the AI Talent Intelligence HRMS application and their respective functionalities.

---

## 2. API Overview

The AI Talent Intelligence HRMS platform integrates multiple APIs to deliver secure, intelligent, and efficient HR management services. The Web Speech API enables voice-based interactions, the Google Gemini API powers AI-driven recruitment and employee analytics, and the REST API manages communication between the frontend, backend, database, and AI modules. Together, these APIs create a seamless and scalable AI-powered HR management system.

| API Name | Category | Purpose |
|----------|----------|---------|
| Web Speech API | Browser-Native API | Voice interaction |
| Google Gemini API | Generative AI API | AI-powered analysis |
| FastAPI REST API | Backend Service API | Business operations |

**Web Speech API** enables real-time speech recognition and text-to-speech capabilities for features such as the AI Interview Portal. The **Google Gemini API** serves as the application's artificial intelligence engine, powering resume screening, interview question generation, transcript evaluation, employee performance analysis, attrition prediction, and voice command interpretation. Additionally, the **FastAPI REST API** acts as the communication layer between the frontend, backend, database, and AI services, managing employee records, attendance, leave requests, recruitment processes, and other business operations. Together, these APIs create a scalable, secure, and AI-powered HR management ecosystem that enhances productivity and decision-making.

---

## 3. Web Speech API

The Web Speech API enables voice-based interaction within the AI Talent Intelligence HRMS platform through speech recognition and speech synthesis. It allows users to communicate with the system using voice commands and receive spoken responses in real time.

### 3.1 Overview
The Web Speech API enables voice-based communication within AI Talent Intelligence HRMS without requiring external speech recognition services.

**Components:**
1. **Speech Recognition (Speech-to-Text)** – Converts spoken words into text.
2. **Speech Synthesis (Text-to-Speech)** – Converts text responses into spoken audio.

### 3.2 Use Cases
- **AI Interview Portal**
  - Captures candidate responses in real time
  - Converts spoken answers into text for evaluation
- **AI Interviewer**
  - Reads interview questions aloud
  - Improves accessibility and interview experience
- **Voice Assistant Feedback**
  - Provides spoken confirmations and system responses

### 3.3 Implementation
| Feature | Implementation |
|---------|----------------|
| Speech Recognition | `window.SpeechRecognition` \| `window.webkitSpeechRecognition` |
| Speech Synthesis | `window.speechSynthesis`, `SpeechSynthesisUtterance` |

---

## 4. Google Gemini API

### 4.1 Overview
Google Gemini serves as the Artificial Intelligence engine powering the AI Talent Intelligence HRMS platform.

| Component | Details |
|-----------|---------|
| Model Used | `gemini-1.5-flash` |
| SDK | `google-generativeai` |

### 4.2 AI Operations

#### Resume Vetting
Analyzes candidate resumes and extracts structured information including:
- Personal details (name, phone, email)
- Skills
- Work experience
- Education
- Projects

#### Candidate Ranking Engine
Compares candidate's skills and experience against job requirements using:
- Hugging Face Sentence Transformers (`all-MiniLM-L6-v2`) for embeddings
- Cosine similarity for matching
- Score range: 0%–100%

#### Question Generation
- Generates technical interview questions
- Uses candidate resume data and selected job role

#### Transcript Evaluation
Evaluates interview conversations based on:
- Communication Skills
- Confidence Level
- Technical Accuracy
Score Range: 1–10

#### Skill Gap Analyzer
- Compares employee's current skills against target role
- Identifies missing skills
- Creates learning roadmap with courses and certifications

#### Attrition Forecaster
Predicts resignation risk using:
- Employee Tenure
- Salary (implied)
- Attendance Trends
- Satisfaction Score
- Work-Life Balance
- Environment Satisfaction
Risk Score: 0%–100%

#### HR Analytics Copilot
- Natural language query interface
- Generates data-driven insights from HR data

---

## 5. FastAPI REST API Services

### 5.1 Overview
REST API serves as the core communication layer between the frontend, backend, database, and AI services.

| Component | Details |
|-----------|---------|
| Framework | FastAPI |
| Communication Protocol | HTTP / HTTPS |
| Data Format | JSON |
| Documentation | Auto-generated at `/docs` (Swagger UI) |

---

### 5.2 API Endpoints

#### Authentication APIs
**Base Route:** `/api/v1/auth`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register new user |
| POST | `/api/v1/auth/login` | Login user (returns JWT token) |
| GET | `/api/v1/auth/me` | Get current authenticated user details |

#### Employees APIs
**Base Route:** `/api/v1/employees`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/employees/` | Get all employees (paginated) |
| GET | `/api/v1/employees/stats` | Get employee statistics |
| GET | `/api/v1/employees/me/profile` | Get current employee profile |
| GET | `/api/v1/employees/{id}` | Get employee by ID |
| POST | `/api/v1/employees/` | Add new employee |
| PUT | `/api/v1/employees/{id}` | Update employee details |
| POST | `/api/v1/employees/{id}/predict-attrition` | Predict attrition for employee |
| GET | `/api/v1/employees/{id}/attrition` | Get attrition data for employee |
| POST | `/api/v1/employees/{id}/analyze-gap` | Analyze skill gap for employee |
| POST | `/api/v1/employees/{id}/analyze-performance` | Analyze employee performance |

#### Attendance APIs
**Base Route:** `/api/v1/attendance`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/attendance/punch-in` | Clock in attendance |
| POST | `/api/v1/attendance/punch-out` | Clock out attendance |
| GET | `/api/v1/attendance/me` | Get current user's attendance |
| GET | `/api/v1/attendance/team` | Get team attendance |

#### Leave APIs
**Base Route:** `/api/v1/leaves`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/leaves/` | Submit leave request |
| GET | `/api/v1/leaves/me` | Get current user's leaves |
| GET | `/api/v1/leaves/pending` | Get pending leave requests |
| PATCH | `/api/v1/leaves/{id}` | Approve/reject leave request |

#### Jobs & Candidates APIs
**Base Routes:** `/api/v1/jobs`, `/api/v1/candidates`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/jobs/` | Get all job postings |
| POST | `/api/v1/jobs/` | Create new job posting |
| GET | `/api/v1/jobs/{id}` | Get job posting by ID |
| POST | `/api/v1/candidates/upload-resume` | Upload and parse candidate resume |
| GET | `/api/v1/candidates/me/profile` | Get candidate profile |
| POST | `/api/v1/candidates/apply/{jobId}` | Apply for a job |
| GET | `/api/v1/candidates/my-applications` | Get my applications |
| GET | `/api/v1/candidates/rankings/{jobId}` | Get candidate rankings for a job |
| POST | `/api/v1/candidates/applications/{appId}/approve-screening` | Approve candidate screening |
| POST | `/api/v1/candidates/applications/{appId}/accept` | Accept candidate |
| POST | `/api/v1/candidates/applications/{appId}/reject` | Reject candidate |

#### Interviews APIs
**Base Route:** `/api/v1/interviews`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/interviews/schedule` | Schedule new interview |
| GET | `/api/v1/interviews/{id}` | Get interview details |
| POST | `/api/v1/interviews/{id}/chat` | Send chat message in interview |
| POST | `/api/v1/interviews/{id}/chat-audio` | Send audio response in interview |
| POST | `/api/v1/interviews/{id}/evaluate` | Evaluate interview |

#### HR Copilot APIs
**Base Route:** `/api/v1/copilot`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/copilot/` | Ask HR analytics copilot |

#### Notifications APIs
**Base Route:** `/api/v1/notifications`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/notifications/me` | Get my notifications |
| PATCH | `/api/v1/notifications/{id}/read` | Mark notification as read |

#### WebSocket API
| Endpoint | Description |
|----------|-------------|
| `/ws` | Real-time notifications and updates |

---

### 5.3 HTTP Client Configuration
| Component | Details |
|-----------|---------|
| Client Library | Native Fetch API |
| Authentication | Bearer Token (JWT) |
| Content-Type | `application/json` (except file uploads) |

---

## 6. Features

### Security Features
- JWT-Based Authentication
- Secure Password Hashing (bcrypt)
- Protected API Endpoints
- Role-Based Access Control (Admin, CEO, Manager, HR Recruiter, Employee, Candidate)
- Data Validation and Sanitization (Pydantic)

### Key Features
1. **Employee Management** – Manage employee records with functionalities to add, update, delete, and view employee information.
2. **Recruitment Management** – Streamline hiring through candidate registration, resume uploads, and AI-powered resume screening and ranking.
3. **Attendance Management** – Track employee attendance efficiently with punch-in/punch-out functionality.
4. **Leave Management** – Handle leave requests and approval workflows.
5. **AI-Powered Interviews** – Conduct voice-based interviews with AI-generated questions and automatic evaluation.
6. **Performance Tracking** – Monitor employee performance and analyze using detailed AI-powered analytics.
7. **Skill Gap Analysis** – Identify skill gaps and generate personalized learning roadmaps.
8. **Attrition Prediction** – Predict employee resignation risk with AI-powered forecasting.
9. **HR Analytics Copilot** – Natural language interface for data-driven HR insights.

---

## 7. Conclusion

The AI Talent Intelligence HRMS platform leverages Web Speech API, Google Gemini AI, and FastAPI REST APIs to deliver an intelligent, scalable, and secure HR management solution. These integrations enable voice-enabled interactions, AI-powered recruitment, employee analytics, secure authentication, and efficient workforce management.

---

## Deployment Links
- **Frontend (Vercel)**: [Your Frontend URL]
- **Backend (Render)**: `https://ai-talent-hrms.onrender.com`
- **API Documentation**: `https://ai-talent-hrms.onrender.com/docs`
