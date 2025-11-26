import { GoogleGenAI } from "@google/genai";
import { GeoLocation } from "../types";

const MODEL_NAME = "gemini-2.5-flash";

export const searchPlaces = async (
  query: string,
  location?: GeoLocation,
  category?: string,
  excludeNames: string[] = []
): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please set the API_KEY environment variable.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `
    You are an advanced data extraction assistant specializing in Google Maps.
    Your goal is to find businesses or places based on the user's query and format the output strictly as a Markdown table.
    
    Rules:
    1. Find at least 10-20 relevant results if possible.
    2. The output MUST be a Markdown table.
    3. The table MUST have these columns: Name, Address, Rating, Review Count, Phone, Website.
    4. If specific data is missing for a row, put "N/A".
    5. Do not include any conversational text before or after the table. Only the table.
    6. Ensure the data is accurate based on the Google Maps tool grounding.
  `;

  const toolConfig: any = {
    tools: [{ googleMaps: {} }],
  };

  // Add location context if available to refine search results
  if (location) {
    toolConfig.toolConfig = {
      retrievalConfig: {
        latLng: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      },
    };
  }

  // Construct a more specific prompt based on category
  let promptText = `Find ${query}`;
  
  if (category && category !== 'All Categories') {
    promptText += ` specifically within the ${category} category`;
  }

  // Handle exclusions to find "more" results (pagination simulation)
  if (excludeNames.length > 0) {
    // We limit the number of excluded names to avoid excessive token usage, 
    // though Gemini Flash context is large. 
    // We prioritize excluding the most recently found ones or all if feasible.
    const namesToExclude = excludeNames.join(', ');
    promptText += `. IMPORTANT: Do NOT include these businesses in the results: ${namesToExclude}. Find DIFFERENT businesses not listed here.`;
  }

  promptText += `. Provide a list with Name, Address, Rating, Review Count, Phone, and Website.`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: promptText,
      config: {
        systemInstruction: systemInstruction,
        ...toolConfig
      },
    });

    return response.text || "";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
