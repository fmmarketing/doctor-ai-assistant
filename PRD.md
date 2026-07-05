# PRD.md — Doctor AI Assistant MVP

## 1. Product Overview

We are building a web application for doctors to manage patients, create consultations, write SOAP notes manually, and generate SOAP note drafts from consultation audio using AI.

The product helps doctors save time documenting consultations. The AI assists with transcription and draft generation, but the doctor always remains responsible for reviewing, editing, approving, and saving the final clinical note.

This MVP is focused on one core workflow:

Doctor logs in → creates/selects a patient → creates a consultation → writes or generates a SOAP note → reviews and approves the note → note is saved in the patient history.

---

## 2. Core Product Rule

AI must never save a final clinical note automatically.

AI can only generate a draft. The doctor must review, edit if needed, and explicitly approve the note before it becomes part of the final patient history.

Every AI-generated note must have a clear status:

* Draft
* Pending doctor review
* Approved
* Rejected
* Edited by doctor

---

## 3. MVP Goal

The goal of this MVP is to validate the core value proposition:

"Doctors can save time by turning consultation audio into a structured SOAP note draft that they can review, edit, approve, and save."

The MVP should not try to become a complete medical platform yet. It should focus only on clinical documentation.

---

## 4. Target User

Primary user:

* Independent doctor
* Private practice doctor
* Doctor who needs to document consultations faster
* Doctor who wants a simple digital patient history and AI-assisted SOAP notes

Initial assumption:

* One doctor account
* No multi-clinic structure
* No complex roles
* No real patient data during development

---

## 5. Main Functionality

The MVP must include:

### Authentication

* Doctor login
* Doctor logout
* Protected app routes

### Patients

* Create patient
* View patient list
* Search patients by name or phone
* View patient profile
* Edit basic patient information

### Consultations

* Create consultation for a patient
* Add chief complaint / reason for consultation
* View consultation details
* View consultation history inside the patient profile

### Manual SOAP Notes

* Write SOAP note manually
* SOAP structure:

  * Subjective
  * Objective
  * Assessment
  * Plan
* Save SOAP note to the consultation
* Show note in patient history

### Audio Upload

* Upload consultation audio
* Store audio securely using Supabase Storage
* Link audio to a consultation
* Show audio status:

  * Uploaded
  * Processing
  * Transcribed
  * Failed

### AI Transcription

* Transcribe uploaded consultation audio using Groq or OpenAI
* Save transcript linked to the audio session
* Display transcript for doctor review

### AI SOAP Draft Generation

* Generate a structured SOAP draft from the transcript
* Save AI output as draft only
* Mark missing or unclear information as "Not documented"
* Never invent clinical details
* Allow doctor to edit the generated draft

### Doctor Review and Approval

* Doctor can review AI-generated SOAP draft
* Doctor can edit the draft
* Doctor can approve the final note
* Only approved notes become part of the final patient history

### Basic Audit Log

Track important actions:

* Patient created
* Patient updated
* Consultation created
* Manual note saved
* Audio uploaded
* Transcript generated
* AI SOAP draft generated
* SOAP note approved
* SOAP note edited
* SOAP note rejected

---

## 6. Not Included in MVP

Do not build these yet:

* WhatsApp integration
* Calendar integration
* Payment system
* Prescriptions
* Multi-doctor dashboard
* Secretary role
* Clinic management
* RAG
* ICD-10 coding
* Native mobile app
* Real patient data
* Billing
* Insurance
* Lab results
* Document management
* Advanced compliance dashboard
* Telemedicine
* Patient portal
* Marketing landing page

The first experience should be the actual app, not a marketing website.

---

## 7. Tech Stack

Use the following stack:

* Next.js App Router
* TypeScript
* Supabase Postgres
* Supabase Auth
* Supabase Storage
* Tailwind CSS
* shadcn/ui
* Vercel for deployment
* GitHub for source control
* Groq or OpenAI for transcription and SOAP draft generation

Use MCP integrations when available, especially for:

* Supabase
* GitHub
* Vercel
* Browser testing / DevTools

If MCP is not available or unstable, use the official SDK, CLI, or API.

---

## 8. Look and Feel

The app should feel:

* Clean
* Professional
* Calm
* Clinical
* Simple
* Practical
* Fast to use

Use shadcn/ui components for:

* Buttons
* Forms
* Tables
* Cards
* Dialogs
* Tabs
* Badges
* Textareas
* Dropdowns
* Toasts

Avoid a marketing-style landing page.

The interface should help the doctor move quickly through this flow:

Patient → Consultation → SOAP note → Review → Approval → History

---

## 9. Main Pages

The app should include these pages:

### `/login`

Doctor login page.

### `/dashboard`

Simple doctor dashboard showing:

* Recent patients
* Recent consultations
* Quick action: create patient
* Quick action: search patient

### `/patients`

Patient list page.

Features:

* Search by name or phone
* Table/list of patients
* Button to create new patient

### `/patients/new`

Create patient page.

### `/patients/[id]`

Patient profile page.

Shows:

* Patient basic info
* Consultation history
* Notes history
* Button to create new consultation

### `/patients/[id]/edit`

Edit patient page.

### `/encounters/new?patientId=...`

Create consultation page for selected patient.

### `/encounters/[id]`

Consultation detail page.

Shows:

* Consultation information
* Manual SOAP editor
* Audio upload section
* Transcript section
* AI SOAP draft section
* Review and approval actions

---

## 10. Suggested Database Structure

Start with a simple database structure.

### `profiles`

Stores doctor profile linked to Supabase Auth.

Fields:

* id
* user_id
* full_name
* email
* role
* created_at
* updated_at

### `patients`

Stores patients.

Fields:

* id
* doctor_id
* first_name
* last_name
* phone
* email
* birth_date
* gender
* notes
* created_at
* updated_at

### `encounters`

Stores consultations.

Fields:

* id
* patient_id
* doctor_id
* chief_complaint
* status
* created_at
* updated_at

Allowed statuses:

* draft
* in_progress
* completed
* signed

### `clinical_notes`

Stores manual and AI-generated SOAP notes.

Fields:

* id
* encounter_id
* doctor_id
* note_type
* content
* created_by
* review_status
* approved_at
* created_at
* updated_at

Allowed note types:

* manual_soap
* ai_soap_draft
* final_soap

Allowed review statuses:

* manual
* ai_pending
* approved
* rejected
* edited

### `audio_sessions`

Stores consultation audio and transcription data.

Fields:

* id
* encounter_id
* doctor_id
* audio_url
* transcript
* status
* error_message
* created_at
* processed_at

Allowed statuses:

* uploaded
* processing
* transcribed
* failed

### `audit_logs`

Stores basic audit trail.

Fields:

* id
* doctor_id
* action
* entity_type
* entity_id
* metadata
* created_at

---

## 11. Security Rules

The MVP must follow these rules:

* A doctor can only access their own patients.
* A doctor can only access their own consultations.
* A doctor can only access their own notes.
* A doctor can only access their own audio files.
* Supabase Row Level Security should be enabled.
* Do not expose API keys on the client.
* Do not log transcripts, symptoms, or clinical note content in console logs.
* Do not use real patient data during development.

---

## 12. AI Behavior Rules

The AI should:

* Transcribe consultation audio
* Generate a structured SOAP draft
* Use only the transcript as source material
* Mark missing information as "Not documented"
* Avoid inventing symptoms
* Avoid inventing diagnoses
* Avoid inventing vitals
* Avoid inventing medications
* Avoid inventing treatment plans
* Avoid making definitive medical decisions
* Save generated content only as a draft
* Make it clear that the doctor must review and approve the note

The AI should not:

* Diagnose independently
* Recommend treatment as final
* Save final notes
* Modify patient history automatically
* Create prescriptions
* Send messages to patients
* Use external clinical knowledge unless explicitly implemented later

---

## 13. AI SOAP Output Format

The AI should return structured JSON:

```json
{
  "subjective": "string",
  "objective": "string",
  "assessment": "string",
  "plan": "string",
  "missing_information": ["string"],
  "confidence_notes": "string"
}
```

If something is not mentioned in the transcript, the AI must write:

```txt
Not documented.
```

---

## 14. Core User Flow

### Manual Note Flow

1. Doctor logs in.
2. Doctor creates or selects patient.
3. Doctor creates consultation.
4. Doctor writes SOAP note manually.
5. Doctor saves note.
6. Note appears in patient history.
7. Audit log is created.

### AI Note Flow

1. Doctor logs in.
2. Doctor selects patient.
3. Doctor creates consultation.
4. Doctor uploads consultation audio.
5. System transcribes audio.
6. System generates SOAP draft.
7. SOAP draft is marked as pending review.
8. Doctor reviews and edits draft.
9. Doctor approves final note.
10. Approved note appears in patient history.
11. Audit log is created.

---

## 15. Implementation Process

Do not build everything at once.

Before coding, first analyze the PRD and propose:

* App architecture
* Database structure
* Main pages
* Core components
* Backend/API structure
* AI flow
* Build milestones

Then build milestone by milestone.

Each milestone should be small, testable, and focused.

---

## 16. Build Milestones

### Milestone 1 — Project Setup

Goal:

Set up the app foundation.

Includes:

* Next.js App Router
* TypeScript
* Tailwind CSS
* shadcn/ui
* Supabase client
* Basic layout
* GitHub repository
* Initial PRD file

Acceptance criteria:

* App runs locally
* Basic layout loads
* Supabase environment variables are configured
* No AI functionality yet

---

### Milestone 2 — Authentication

Goal:

Allow doctor to log in and access protected routes.

Includes:

* Supabase Auth
* Login page
* Logout
* Protected dashboard
* Profile creation

Acceptance criteria:

* Doctor can log in
* Doctor can log out
* Unauthenticated users cannot access app pages

---

### Milestone 3 — Patients

Goal:

Allow doctor to manage patients.

Includes:

* Create patient
* View patient list
* Search patients
* View patient profile
* Edit patient

Acceptance criteria:

* Doctor can create a patient
* Doctor can view only their own patients
* Doctor can open patient profile
* Patient data is saved in Supabase

---

### Milestone 4 — Consultations and Manual SOAP Notes

Goal:

Allow doctor to create consultations and write SOAP notes manually.

Includes:

* Create consultation
* SOAP editor
* Save manual SOAP note
* Patient consultation history
* Basic audit log

Acceptance criteria:

* Doctor can create consultation for a patient
* Doctor can save SOAP note manually
* Note appears in patient history
* Audit log is created

---

### Milestone 5 — Audio Upload

Goal:

Allow doctor to upload consultation audio.

Includes:

* Audio upload field
* Supabase Storage upload
* audio_sessions record
* Audio status display

Acceptance criteria:

* Doctor can upload audio
* Audio is linked to consultation
* Audio file is stored in Supabase Storage
* Audio session is saved in database

---

### Milestone 6 — AI Transcription

Goal:

Transcribe uploaded audio.

Includes:

* Server-side transcription endpoint
* Groq or OpenAI transcription
* Save transcript to audio_sessions
* Display transcript in consultation page

Acceptance criteria:

* Uploaded audio can be transcribed
* Transcript is saved
* Transcript is shown to doctor
* Errors are handled clearly

---

### Milestone 7 — AI SOAP Draft

Goal:

Generate SOAP note draft from transcript.

Includes:

* AI SOAP generation endpoint
* Structured SOAP JSON output
* Save AI draft in clinical_notes
* Mark draft as ai_pending
* Display draft for doctor review

Acceptance criteria:

* AI generates SOAP draft from transcript
* Draft is not final
* Doctor can view draft
* Missing information is marked clearly

---

### Milestone 8 — Review and Approval

Goal:

Allow doctor to approve, edit, or reject AI-generated SOAP draft.

Includes:

* Edit draft
* Approve note
* Reject note
* Save final approved SOAP note
* Audit log

Acceptance criteria:

* Doctor can edit AI draft
* Doctor can approve note
* Only approved note appears as final in history
* AI cannot approve note automatically
* Audit log is created

---

## 17. Development Rules for AI Coding Assistant

When helping build this app, follow these rules:

* Do not build features outside this PRD.
* Do not add WhatsApp, calendar, payments, prescriptions, RAG, or multi-doctor support.
* Before writing code, explain the implementation plan.
* Modify only files needed for the current milestone.
* Keep code simple and readable.
* Use TypeScript types.
* Use server-side code for AI API calls.
* Never expose API keys in client components.
* Add comments only where useful.
* After each milestone, provide a checklist for manual testing.
* Do not use real patient data.

---

## 18. Definition of Done for MVP

The MVP is complete when:

* Doctor can log in.
* Doctor can create and manage patients.
* Doctor can create consultations.
* Doctor can write manual SOAP notes.
* Doctor can upload consultation audio.
* System can transcribe the audio.
* System can generate a SOAP draft.
* Doctor can review, edit, approve, or reject the draft.
* Approved SOAP note appears in patient history.
* Basic audit logs are created.
* AI never saves final clinical notes automatically.
