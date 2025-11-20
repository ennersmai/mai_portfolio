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
  newMessage: string,
  onChunk?: (chunk: string) => void
): Promise<string> => {
  if (!client) {
     // Fallback mock response if no API key is configured in the environment
    const mockResponse = "system_error: API_KEY_MISSING. Please check environment variables to enable the neural link. \n\n(Note: In a real deployment, this connects to Gemini 2.5 Flash for Q&A about my resume.)";
    
    if (onChunk) {
      // Simulate streaming for mock response
      for (let i = 0; i < mockResponse.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 20));
        onChunk(mockResponse[i]);
      }
    }
    
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockResponse);
      }, 1000);
    });
  }

  try {
    // Construct a simple prompt with history for context since we are using generateContent (stateless)
    // for simplicity in this specific single-file demo structure, or we could use chat.
    // Using stateless generation with history appended is robust for simple portfolio Q&A.
    
    const chatHistoryStr = history.map(h => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.text}`).join('\n');
    const fullPrompt = `${SYSTEM_INSTRUCTION}\n\nHistory:\n${chatHistoryStr}\n\nUser: ${newMessage}\nAssistant:`;

    let fullText = '';

    if (onChunk) {
      // Use streaming
      try {
        const stream = await client.models.generateContentStream({
          model: 'gemini-2.5-flash',
          contents: fullPrompt,
        });

        for await (const chunk of stream) {
          // Handle different chunk formats
          let text = '';
          if (typeof chunk === 'string') {
            text = chunk;
          } else if (chunk.text) {
            text = chunk.text;
          } else if (chunk.response?.text) {
            text = chunk.response.text();
          } else if (chunk.candidates?.[0]?.content?.parts?.[0]?.text) {
            text = chunk.candidates[0].content.parts[0].text;
          }
          
          if (text) {
            fullText += text;
            onChunk(text);
          }
        }

        return fullText;
      } catch (streamError) {
        console.error("Streaming error:", streamError);
        // Fallback to non-streaming if streaming fails
        const response: GenerateContentResponse = await client.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: fullPrompt,
        });
        const responseText = response.text || "Error: Empty response from neural core.";
        onChunk(responseText);
        return responseText;
      }
    } else {
      // Fallback to non-streaming
      const response: GenerateContentResponse = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
      });

      return response.text || "Error: Empty response from neural core.";
    }
  } catch (error) {
    console.error("Gemini Error:", error);
    const errorMsg = "critical_failure: Connection to AI Agent severed. Please try again.";
    if (onChunk) {
      onChunk(errorMsg);
    }
    return errorMsg;
  }
};