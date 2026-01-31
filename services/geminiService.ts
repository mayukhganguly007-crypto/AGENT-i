
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async testAgent(agentName: string, agentSystemInstruction: string, history: Message[], userPrompt: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...history.map(m => ({ role: m.role === 'assistant' ? 'model' as any : 'user' as any, parts: [{ text: m.content }] })),
          { role: 'user', parts: [{ text: userPrompt }] }
        ],
        config: {
          systemInstruction: `You are simulating an AI agent named "${agentName}". Your core capabilities are: ${agentSystemInstruction}. 
          Adopt this persona strictly. Do not break character. Be helpful, concise, and professional.`,
          temperature: 0.7,
        },
      });

      return response.text;
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "I'm having trouble connecting to my neural network right now. Please try again later.";
    }
  }

  async generateAgentDescription(idea: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Create a professional marketplace description for an AI agent with this idea: ${idea}. 
        Include: A catchy Name, a Tagline, a detailed 2-paragraph Description, and 4 bullet-pointed Capabilities. 
        Format as clear JSON with keys: name, tagline, description, capabilities.`,
        config: {
          responseMimeType: "application/json",
        }
      });
      return JSON.parse(response.text || '{}');
    } catch (error) {
      console.error("Description Gen Error:", error);
      return null;
    }
  }
}

export const gemini = new GeminiService();
