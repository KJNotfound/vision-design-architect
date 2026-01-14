
import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const generateTechnicalDrawing = async (
  imageBase64: string, 
  mimeType: string, 
  customContext: string
): Promise<string | null> => {
  const ai = getAIClient();
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: imageBase64,
              mimeType: mimeType,
            },
          },
          {
            text: `Act as a professional Industrial Designer and Technical Draftsman. 
            I am providing an image of a product. Your task is to generate a high-quality 3-view technical drawing (Orthographic Projection).
            
            USER SPECIFIC CONTEXT: ${customContext || 'General product design.'}
            
            REQUIREMENTS:
            1. The output must contain exactly three distinct views: Top View, Front View, and Side View.
            2. Arrange the views in a professional engineering layout.
            3. Use a clean, neutral background (white or very light grey).
            4. Retain all key textures, patterns, and geometric features mentioned in the context.
            5. The style should look like a CAD render or a polished product blueprint.
            6. Do not include excessive text labels unless they are part of the product's design.`,
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    
    return null;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
