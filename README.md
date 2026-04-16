# MediScribe: AI Medical Diagnostic Dashboard

MediScribe is a Generative AI-powered clinical symptom checker built with Next.js, React, and Google's Gemini 2.5 Flash Large Language Model.

## 🚀 How to Run this Project Locally in VS Code

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
