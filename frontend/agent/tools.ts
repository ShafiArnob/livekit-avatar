type FunctionArgs = {
  query: string
}
export async function executeFunction(functionName: string, functionArgs: FunctionArgs, conversationHistory: any[]) {
  switch (functionName) {
    case "faq":
      return await faq(functionArgs.query || "", conversationHistory)

    default:
      return { error: "Unknown function" };
  }
}

export const functions = [{
  name: "faq",
  description: `Your job answer users questions`,
  parameters: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "query that user wants to know"
      }
    },
    required: ["query"]
  }
},]

async function faq(query: string, messages: any[]) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AGENTSENSE_BACKEND_URL}/api/chat-message/e-commerce`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chatMessages: [...messages],
        prompt: query,
      }),
    }
  );

  const data = await response.json();
  // console.log("✅ FAQ Search API response:", data);

  return data.data
}