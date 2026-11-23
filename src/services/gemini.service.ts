import { GoogleGenAI } from "@google/genai";

class GeminiService {
    apiKey: string;
    modelName: string;
    genAI: GoogleGenAI;

  constructor(apiKey:string, modelName:string) {
    this.apiKey = apiKey;
    this.modelName = modelName;

    if (!this.apiKey) {
      throw new Error("API key is required for GeminiProvider");
    }

    if (!this.modelName) {
      throw new Error("Model name is required for GeminiProvider");
    }

    this.genAI = new GoogleGenAI({ apiKey: this.apiKey });
  }

  async genereteEmbeddings(data: string | string[], taskType = "RETRIEVAL_QUERY") {
    try {
      const contents = Array.isArray(data) ? data : [data];
      const response = await this.genAI.models.embedContent({
        model: "gemini-embedding-001",
        contents: data,
        config: {
          taskType,
        },
      });

      const embeddings = response.embeddings!.map((e) => e.values);
      return embeddings;
    } catch (error: any) {
      console.error("Error generating embeddings", error);
      throw new Error(`Error generating embeddings: ${error.message}`);
    }
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      const response = await this.genAI.models.generateContent({
        model: this.modelName,
        contents: prompt,
      });
      return response.text || "No response generated.";
    } catch (error: any) {
      console.error("Error generating response from GeminiProvider:", error);
      throw new Error(`Error generating response: ${error.message}`);
    }
  }
}

export default GeminiService;
