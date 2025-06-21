import { smoothStream, streamText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const openrouter = createOpenRouter({
  apiKey: process.env.OPEN_ROUTER_API_KEY,
});

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    system: "You are an expert storyteller",
    model: openrouter.chat("google/gemini-2.5-flash-preview"),
    experimental_transform: smoothStream(),
    messages: [
      {
        role: "user",
        content: `
Write a short story in the style of Ernest Hemingway.

Set the story in an early 20th-century coastal fishing village, focusing on a solitary, weathered protagonist. Begin with a concise introduction (3-5 sentences) to establish the scene and mood. After the introduction, pause and wait for my input on what happens next (e.g., a single sentence or a detailed description).

Continue the story based on my input, maintaining Hemingway’s style and tone, and incorporating vivid sensory details and understated emotions. Ensure each continuation builds naturally from my input and the established narrative.
`,
      },
      ...messages,
    ],
  });

  return result.toDataStreamResponse();
}
