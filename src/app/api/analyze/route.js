import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const TRUSTED_LINKS = [
    "https://www.mayoclinic.org",
    "https://www.webmd.com",
    "https://www.nhs.uk"
];

function getLinks(symptoms) {
    const keywords = {
        "cough": "https://www.mayoclinic.org/diseases-conditions/cough/symptoms-causes/syc-20351310",
        "fever": "https://www.webmd.com/children/fever-causes-symptoms-treatments",
        "headache": "https://www.nhs.uk/conditions/headaches/",
        "stomach": "https://www.mayoclinic.org/symptoms/abdominal-pain/basics/when-to-see-doctor/sym-20050728",
        "rash": "https://www.webmd.com/skin-problems-and-treatments/guide/common-childhood-skin-problems"
    };
    const links = new Set();
    const lowerSymptoms = symptoms.toLowerCase();
    for (const [word, link] of Object.entries(keywords)) {
        if (lowerSymptoms.includes(word)) {
            links.add(link);
        }
    }
    return links.size > 0 ? Array.from(links) : TRUSTED_LINKS;
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { symptoms, patientInfo } = body;

        if (!symptoms) {
            return NextResponse.json({ error: 'Symptoms are required' }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        const links = getLinks(symptoms);

        if (!apiKey || apiKey.includes('your_gemini_api_key_here')) {
            return NextResponse.json({
                error: "Please grab your free key from https://aistudio.google.com and paste it into your .env file."
            }, { status: 401 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        let patientContext = "";
        if (patientInfo) {
            patientContext = `Patient Profile:\n- Name: ${patientInfo.name || 'Private'}\n- Age: ${patientInfo.age || 'Unknown'}\n- Gender: ${patientInfo.gender || 'Unknown'}\n- Blood Group: ${patientInfo.bloodGroup || 'Unknown'}\n- Height: ${patientInfo.height ? patientInfo.height + ' cm' : 'Unknown'}\n- Weight: ${patientInfo.weight ? patientInfo.weight + ' kg' : 'Unknown'}\n- Medical History: ${patientInfo.history || 'None reported'}\n\nPlease factor these demographics and medical history into your probabilistic analysis.\n\n`;
        }

        const prompt = `${patientContext}A user describes the following symptoms: ${symptoms}
You are an expert AI medical assistant. You MUST return your response as a raw JSON object with exactly these keys:
- "conditions": A string listing the top 3 possible common medical conditions. YOU MUST output this as a numbered list where EACH condition starts on a completely NEW LINE with a double line break (\\n\\n) between them. Formatting Example: "1. **Condition Name**: Description \\n\\n 2. **Condition Name**: Description"
- "prescription": A string suggesting over-the-counter (OTC) medications. Format with bullet points.
- "advice": A string offering safety advice and a reminder to consult a doctor. YOU MUST format this exclusively as a bulleted list using the '*' character, with double spacing between each point.

Do not wrap the JSON in Markdown code blocks like \`\`\`json. Return only the raw JSON. Do not output anything else.`;

        const result = await model.generateContent(prompt);
        let textResult = result.response.text().trim();

        // Clean up markdown tracking if the AI disobeys
        if (textResult.startsWith('```json')) {
            textResult = textResult.replace(/^```json/g, '').replace(/```$/g, '').trim();
        } else if (textResult.startsWith('```')) {
            textResult = textResult.replace(/^```/g, '').replace(/```$/g, '').trim();
        }

        let aiData;
        try {
            aiData = JSON.parse(textResult);
        } catch (e) {
            console.error("Failed to parse JSON: ", textResult);
            throw new Error("Failed to parse AI medical response into structured format. Please try again.");
        }

        return NextResponse.json({ ...aiData, links });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: error.message || 'An error occurred during analysis' }, { status: 500 });
    }
}
