import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

let client: GoogleGenAI | null = null;

export const initializeGemini = () => {
  // Ideally, this comes from process.env.API_KEY in a real build environment.
  // For this demo, we check if the key exists.
  if (process.env.API_KEY) {
    client = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
};

export const sendMessageToAgent = async (
  history: { role: 'user' | 'model', text: string }[],
  newMessage: string
): Promise<string> => {
  if (!client) {
     // Fallback mock response if no API key is configured in the environment
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("system_error: API_KEY_MISSING. Please check environment variables to enable the neural link. \n\n(Note: In a real deployment, this connects to Gemini 2.5 Flash for Q&A about my resume.)");
      }, 1000);
    });
  }

  try {
    // Construct a simple prompt with history for context since we are using generateContent (stateless)
    // for simplicity in this specific single-file demo structure, or we could use chat.
    // Using stateless generation with history appended is robust for simple portfolio Q&A.
    
    const chatHistoryStr = history.map(h => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.text}`).join('\n');
    const fullPrompt = `${SYSTEM_INSTRUCTION}\n\nHistory:\n${chatHistoryStr}\n\nUser: ${newMessage}\nAssistant:`;

    const response: GenerateContentResponse = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
    });

    return response.text || "Error: Empty response from neural core.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "critical_failure: Connection to AI Agent severed. Please try again.";
  }
};