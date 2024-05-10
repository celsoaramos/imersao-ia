import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory, SafetySetting } from "@google/generative-ai";


const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey ?? "");
const geminiModel = "gemini-pro"
const generationConfig = {
  "candidate_count": 1,
  "temperature": 0.5
}

const safetySettings: SafetySetting[] = [
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE }
];

const getResponse = async(prompt: string, ) => {
  const model = genAI.getGenerativeModel({ 
    model: geminiModel,
    generationConfig,
    safetySettings
  });

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  return text;
}

export { getResponse }