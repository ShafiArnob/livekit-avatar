import { generateText } from "ai"

const systemPrompt = `You are a helpful AI assistant for COGIR, a senior living community. 
You provide information about:
- Senior living services and accommodations
- Health and wellness programs
- Dining and culinary services
- Social activities and events
- Location information
- How to schedule tours or get more information

Be warm, professional, and helpful. Keep responses concise and friendly.`

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    // Extract the last user message
    const lastMessage = messages[messages.length - 1]
    const userPrompt = lastMessage.content

    // Generate response using AI SDK
    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      system: systemPrompt,
      prompt: userPrompt,
    })

    return Response.json({ content: text })
  } catch (error) {
    console.error("Chat API error:", error)
    return Response.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
