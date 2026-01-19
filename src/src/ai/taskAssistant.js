// src/ai/taskAssistant.js
// AI Task & Workflow Assistant

import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Suggest next development tasks for your project
 * @param {string} projectOverview - Short summary of your project
 */
export async function suggestTasks(projectOverview) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a project assistant suggesting development tasks." },
        { role: "user", content: `Given this project overview, suggest 5 tasks I should do next:\n${projectOverview}` }
      ],
      max_tokens: 200,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("TaskAssistant Error:", error);
    return null;
  }
}