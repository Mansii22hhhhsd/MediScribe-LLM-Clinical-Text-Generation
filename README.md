# Live Demo

 **Try MediScribe:** https://medi-scribe-llm-clinical-text-gener.vercel.app
# MediScribe: AI Medical Diagnostic Dashboard

MediScribe is a Generative AI-powered clinical symptom checker built with Next.js, React, and Google's Gemini 2.5 Flash Large Language Model.

## How to Run this Project Locally in VS Code

If you want to run this project on a new computer or present it to an examiner, follow these exact steps.

### 1. Prerequisites
You must have **Node.js** installed on your computer. 
- Download it here: [Node.js Official Website](https://nodejs.org/)
- Install the "LTS" (Long Term Support) version. 

### 2. VS Code Setup
- Open **VS Code** (Visual Studio Code).
- Go to `File > Open Folder` and select this `genai-medical-symptom-checker-` folder.
- *Recommended Extension*: Intall the **ES7+ React/Redux/React-Native snippets** and **Tailwind CSS IntelliSense** extensions for a better coding experience.

### 3. API Key Setup
This project requires a Google Gemini API Key to function.
1. Go to [Google AI Studio](https://aistudio.google.com/) and create a free API key.
2. In the root of your project folder in VS Code, create a file named exactly `.env`.
3. Open `.env` and paste your key like this:
   ```env
   GEMINI_API_KEY=AIzaSyYourSecretKeyGoesHere...
   ```

### 4. Install Dependencies
You need to download all the required packages (like Next.js, React, and html2pdf) that the project depends on.
1. Open the VS Code Terminal by clicking `Terminal > New Terminal` at the top of your screen.
2. Run the following command:
   ```bash
   npm install
   ```
   *(This will create a `node_modules` folder. It might take a minute or two).*

### 5. Start the Development Server
Once everything is installed, start the local server!
1. In the same terminal, run:
   ```bash
   npm run dev
   ```
2. You will see a message saying `Ready in x ms`.
3. Open your web browser (Chrome/Edge) and go to: **[http://localhost:3000](http://localhost:3000)**

---

### Tech Stack / Project Details
- **Frontend**: React, Next.js (App Router), Vanilla CSS (Glassmorphism UI)
- **Backend**: Next.js API Routes (`/api/analyze/route.js`)
- **AI Model**: Google Gemini 2.5 Flash
- **PDF Generation**: `html2pdf.js`

#  Application Preview

Below is the complete workflow of **MediScribe**, from patient registration to AI-generated clinical report generation.

### Patient Profile
Enter patient demographics and relevant medical history to provide context for AI-powered clinical analysis.
<img width="1918" height="908" alt="Screenshot 2026-07-04 171221" src="https://github.com/user-attachments/assets/3f52536e-e243-473f-9803-fe86ab53695b" />
### Symptom Assessment
Patients describe their symptoms, which are securely processed by the Gemini AI model.
<img width="1918" height="910" alt="Screenshot 2026-07-04 171427" src="https://github.com/user-attachments/assets/d5db7eb0-32d3-41f8-a859-8cb4e02082b6" />
### AI Processing
The application analyzes patient information and generates a structured clinical assessment.
<img width="1918" height="907" alt="Screenshot 2026-07-04 171447" src="https://github.com/user-attachments/assets/73eb0dee-ceb2-491b-b671-88a995e7cdc4" />
### Clinical Report
View AI-generated possible conditions, medication suggestions, and clinical recommendations.
<img width="1918" height="905" alt="Screenshot 2026-07-04 171512" src="https://github.com/user-attachments/assets/7038c0a1-4a08-4645-997c-a8e848cdb07f" />
### Safety Advice & PDF Export
Receive personalized safety recommendations and download the complete clinical report as a PDF.
<img width="1915" height="908" alt="Screenshot 2026-07-04 171531" src="https://github.com/user-attachments/assets/6bac748c-dd07-4768-ad9d-2537288b3d7e" />







