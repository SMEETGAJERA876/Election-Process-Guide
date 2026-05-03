🚀 MASTER PROMPT: Interactive Election Education Assistant Builder
1) Role & Scope

You are an Election Education Architect + Full-Stack AI Developer.

Your task:

Design and generate a complete MVP + scalable system for an interactive assistant that teaches election processes, timelines, and steps.
Output production-ready architecture, code scaffolding, content templates, and deployment instructions.
Ensure modularity, scalability, and region adaptability.
2) Target Audience, Learning Goals & Accessibility
🎯 Target Users
First-time voters (18–25)
Students (academic + competitive exams)
General public (basic awareness)
🎓 Learning Goals (Measurable)
Understand election lifecycle (pre, during, post)
Complete voter registration independently
Identify key deadlines and processes
Score ≥80% on assessment quizzes
♿ Accessibility Requirements
Plain-language summaries (grade 6 reading level)
Screen reader support (ARIA roles)
Keyboard navigation
Multilingual support (English + regional languages)
High contrast UI mode
3) Core Features & User Flows
🔹 Core Features
Guided timeline explorer
Interactive quizzes
Searchable glossary
FAQ chatbot
Scenario-based tutorials
Practice ballot simulator
🔄 User Flows
A. Onboarding
Input: age, region, language
Output: personalized learning path
B. Timeline Exploration
Interactive step-by-step election journey
Expandable milestones
C. Quiz Flow
MCQ + scenario-based questions
Instant feedback + scoring
D. Glossary Lookup
Search + click-to-expand definitions
E. Regional Customization
Dynamic content loading based on region
4) Content Scope & Structure
📚 Core Modules
Getting Started
Electoral Cycles & Milestones
Registration & Eligibility
Voting Plans & Methods
Post-Election Procedures
🌍 Regional Adaptability
Use data-driven templates per region (e.g., India)
Support dynamic updates via config files or APIs
5) Engagement, Accessibility & UX
🎮 Engagement
Progress tracking dashboard
Achievement badges
Completion indicators
♿ UX Accessibility
Screen reader compatibility
Keyboard-only navigation
Responsive layout (mobile-first)
🌐 Localization
JSON-based translation system
Content fallback (default language)
6) Delivery Formats & Platforms
🌐 Web App (primary)
📱 Mobile-responsive (PWA)
💬 Chat-based tutor
🔌 Embeddable widget
📡 Content API (for reuse)
7) Data Sources, Accuracy & Maintenance
📊 Sources
Official election authorities (e.g., Election Commission of India)
Government portals
🔄 Strategy
Citation tagging per content block
Version control for content
Update cadence: monthly or event-triggered
Change log tracking
8) MVP Definition & Phased Roadmap
🟢 MVP
Timeline explorer
Glossary
Quiz module
Region-aware templates
Basic progress tracking
🟡 Phase 2
Practice ballot simulator
Multilingual expansion
Scenario-based tutorials
🔵 Phase 3
Real-time election updates
Offline mode
Voice assistant
9) Non-Functional Requirements
⚡ Performance
Load time < 2 seconds
Lazy loading for content modules
🔐 Security & Privacy
No sensitive personal data storage
HTTPS enforced
Anonymous usage mode
📜 Compliance
Accessibility standards (WCAG)
Data protection compliance
10) Metrics & Evaluation
📈 Success Metrics
Module completion rate
Quiz score improvement
User retention
User satisfaction score
11) Tech Stack (Concrete)
🖥️ Frontend
React + TypeScript
Hooks + Context API
Accessible component library
⚙️ Backend
Node.js (TypeScript) or serverless functions
REST/GraphQL API
🗄️ Data & CMS
Headless CMS or JSON-based content
Localization pipeline
🔗 Integrations
Official data APIs
Translation APIs
Analytics tools
12) Data Model (Generate Schema)

Create the following entities:

User {
  id,
  locale,
  role,
  preferences
}

Region {
  id,
  name,
  country_codes,
  language
}

ContentModule {
  id,
  region_id,
  title,
  sections
}

TimelineEvent {
  id,
  module_id,
  date,
  description
}

Quiz {
  id,
  module_id,
  questions
}

GlossaryTerm {
  id,
  term,
  definition,
  region_id
}

Citation {
  id,
  source_url,
  access_date
}

Progress {
  user_id,
  module_id,
  completed,
  score,
  last_access
}
13) Initial Content Outline
Module 1: Getting Started
Overview
How to use assistant
Glossary intro
Module 2: Electoral Cycles
Phases
Timeline
Module 3: Registration
Eligibility
Process
Module 4: Voting
Methods
Poll day steps
Module 5: Post-Election
Counting
Results
14) MVP Description

The MVP must:

Generate a personalized election timeline
Provide searchable glossary
Include quiz module
Be region-aware
Support responsive + accessible UI
15) Deliverables (AUTO-GENERATE)

Produce:

📁 Project Scaffold
Frontend + backend structure
Config files
Routing setup
📚 Content Templates
JSON/YAML content for modules
Region-specific placeholders
🧪 Sample Data
Example quizzes
Timeline events
Glossary entries
🧾 API Definitions
Endpoints for content, progress, quizzes
🖥️ UI Components
Timeline viewer
Quiz interface
Glossary search
🚀 Deployment Guide
Local setup steps
Build instructions
Hosting options (cloud/serverless)
⚡ Final Instruction

Generate:

Complete architecture diagram (text-based)
Code skeletons (frontend + backend)
Sample content for at least one region
Test cases for key flows
Deployment instructions

Ensure:

Minimal manual setup required
Modular, scalable, and production-ready structure
✅ Outcome

This prompt should produce a fully functional MVP blueprint + starter codebase for an interactive election education assistant with minimal human effort.

If you want, I can next:

Convert this into a real working React project
Or generate UI wireframes + screenshots
Or build a hackathon-ready PPT + demo script

Just tell me 👍


 ##########new implementation ############
 
 🚀 MASTER PROMPT: Electoral Education Landing Page Generator
ROLE & CONTEXT

You are a full-stack developer + product designer + prompt engineer.
Build a responsive, accessible web landing page (with optional chat tutor) that explains election processes, timelines, and steps.
The system must be integration-ready with Google Stitch (or Stitch-like workflows) for fetching live data and sending user events.

Output:

Architecture + file structure
Frontend code (React + TypeScript)
Optional backend (serverless/Firebase/Supabase)
Data schemas
Sample content
UI components
Integration hooks (Stitch/webhooks)
Deployment checklist
TARGET AUDIENCE & LEARNING GOALS
Personas:
First-time voters
Students
General public
Learning Goals:
Understand electoral cycles
Identify deadlines and milestones
Know eligibility and registration steps
Understand voting methods and post-election process
CORE FEATURES & USER FLOWS
MVP Features:
Timeline view (interactive election journey)
Glossary (searchable terms)
Quiz (5–10 questions)
FAQs
Scenario-based tutorials
Newsletter/signup (consent-based)
User Flow:
Landing page
Select region
Explore timeline
Open glossary
Take quiz
View FAQs
Receive tailored tip (via webhook/Stitch)
Edge Flows:
Late registration guidance
Overseas voter help
Change of eligibility
Accessibility toggles
CONTENT SCOPE & STRUCTURE
Domains:
Electoral cycles
Milestones
Deadlines
Eligibility
Registration
Voting plans
Post-election procedures
Regional Adaptability:
Region-based dynamic content
Configurable templates
Content Data Model:
ContentBlock {
  region,
  topic,
  title,
  body,
  last_updated,
  citations
}
ENGAGEMENT, ACCESSIBILITY & INCLUSIVITY
Progress indicators
Plain-language summaries
Hints/tooltips
Multilingual support
Screen reader compatibility
Keyboard navigation
High contrast mode
WCAG 2.1 AA compliance
DELIVERY FORMATS
Web landing page (primary)
Mobile responsive
Embedded chatbot widget
Chat tutor mode
Export to PDF option
Embeddable components
DATA SOURCES & ACCURACY
Use official election authorities (e.g., Election Commission of India)
Include citations per content block
Maintain:
source_url
last_updated
Update Strategy:
Scheduled fetch via Stitch (daily/weekly)
Versioning + change logs
Content review workflow
MVP & ROADMAP
MVP:
Timeline
Glossary
Quiz
Region selector
Basic progress tracking
Phase 2:
Regional customization
Practice ballots
Real-time updates
Phase 3:
Multilingual expansion
AI tutor
Analytics dashboard
NON-FUNCTIONAL REQUIREMENTS
Performance:
Fast load (<2s)
Lazy loading
Caching
Security:
HTTPS only
No sensitive data storage
Privacy:
Consent-based data collection
Transparent usage
SUCCESS METRICS
User completion rate
Quiz pass rate
Engagement time
User satisfaction
Region-wise usage
TECH STACK
Frontend:
React + TypeScript
Tailwind CSS
Accessible UI components
State:
Zustand or Context API
localStorage for offline
Backend (optional):
Firebase / Supabase
CMS:
Headless CMS (Contentful/Sanity) OR JSON
Integration:
Google Stitch (data + workflows)
Webhooks for events
i18n:
i18next
Deployment:
Vercel / Netlify
DATA MODEL
Region { id, name, country, locale }

Topic { id, region_id, title, slug }

ContentBlock { id, region_id, topic_id, title, body, citations, last_updated }

TimelineEvent { id, region_id, date, description, type }

Quiz { id, region_id, question, options, correct_option, explanation }

UserProgress { user_id, region_id, completed_sections, quiz_scores }

Settings { language, accessibility, region }
INITIAL CONTENT (MVP)
Timeline:
Registration window
Campaign period
Voting day
Results
Glossary:
Key election terms
Quiz:
5–10 basic questions
FAQs:
6–12 common questions
UI Elements:
Region selector
Accessibility toggle
Citations block
MVP DESCRIPTION

Build a responsive landing page with:

Region selector
Timeline component
Glossary modal
Quiz module
FAQ section
Signup form

Include:

Google Stitch integration to:
Fetch latest election data
Send user interaction events
REQUIRED OUTPUT

Generate:

📁 Project Structure
/frontend
/backend (optional)
/content
/config
🖥️ Frontend Components
TimelineViewer
GlossaryModal
QuizComponent
FAQSection
RegionSelector
AccessibilityControls
⚙️ Backend/API
GET /content
GET /timeline
GET /quiz
POST /progress
POST /events (Stitch webhook)
🔗 Integration Hooks
Stitch data fetch function
Webhook sender for user events
📚 Sample Data
Timeline events
Glossary terms
Quiz questions
🧪 Test Cases
Region switching
Quiz scoring
Timeline rendering
Accessibility navigation
🚀 Deployment Checklist
Install dependencies
Configure environment variables
Connect Stitch/webhooks
Build & deploy
FINAL INSTRUCTION

Ensure:

Clean modular architecture
Minimal setup required
Fully functional MVP
Scalable design

Output must include:

Code skeletons
Sample content
Integration setup
Deployment steps

