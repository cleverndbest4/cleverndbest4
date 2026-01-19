// src/ai/codegen.js
// AI Code Generation Tool

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate code snippet from a description
 * @param {string} description - What you want the code to do
 * @param {string} language - Programming language (default: javascript)
 */
export async function generateCode(description, language = "javascript") {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an AI code generator assistant." },
        { role: "user", content: `Write ${language} code to: ${description}` }
      ],
      max_tokens: 300,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("CodeGen Error:", error);
    return null;
  }
}
feat: add AI code generation tool