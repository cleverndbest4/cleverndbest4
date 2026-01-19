import { config } from "dotenv";
config();

import { Configuration, OpenAIApi } from "openai";
import { pipeline } from "@xenova/transformers";

// Initialize OpenAI (optional)
let openai;
if (process.env.OPENAI_API_KEY) {
  const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
  openai = new OpenAIApi(configuration);
}

// Initialize local LLM
let localGenerator;
async function initLocalLLM() {
  if (!localGenerator) {
    localGenerator = await pipeline("text-generation", "EleutherAI/gpt-neo-125M");
  }
  return localGenerator;
}

// Unified function
export async function generateText(prompt) {
  try {
    if (openai) {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        max_tokens: 200,
      });
      return response.data.choices[0].text;
    } else {
      const gen = await initLocalLLM();
      const output = await gen(prompt, { max_length: 200 });
      return output[0].generated_text;
    }
  } catch (err) {
    console.error("LLM Error:", err);
    return null;
  }
}