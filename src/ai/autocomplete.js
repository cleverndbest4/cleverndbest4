// src/ai/autocomplete.js
// AI auto-completion and correction helper

import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Your secret API key
});

// Function to auto-complete text
export async function autoCompleteText(promptText) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an assistant that auto-completes and corrects text." },
        { role: "user", content: promptText }
      ],
      max_tokens: 150,
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("AutoComplete Error:", error);
    return null;
  }
}

// Function to correct text
export async function correctText(inputText) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an assistant that corrects grammar, spelling, and clarity." },
        { role: "user", content: `Correct this: ${inputText}` }
      ],
      max_tokens: 150,
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Correction Error:", error);
    return null;
  }
}
feat: add AI auto-complete and correction tool