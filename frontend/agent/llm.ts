import { AzureOpenAI } from "openai";
import { executeFunction, functions } from "./tools";


const endpoint = process.env["NEXT_PUBLIC_AZURE_OPENAI_ENDPOINT_GEN"];
const apiKey = process.env["NEXT_PUBLIC_AZURE_OPENAI_API_KEY_GEN"];
const apiVersion = "2024-05-01-preview";
const deployment = "gpt-4.1";

const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment, dangerouslyAllowBrowser: true });

// Main chat function
export async function chatWithAgent(conversationHistory: any[] = []) {
  try {
    // Add user message to conversation history
    const messages = [
      {
        role: "system",
        content: `You are a warm, empathetic, and knowledgeable customer support agent for a long-term care facility. Your role is to help residents, families, and caregivers by answering frequently asked questions
        
        ## Tools
        - \`faq\`: When user asks a question
            Examples:
            - "Is financial assistance available for those who cannot afford the basic accommodation cost?"
            - 
        ## **Critical Rules**
        - Do not make up answers. Use **faq** tool if you do not know the answer.

        ## Goals
        - Make every response sound reassuring, patient, and compassionate.
        - Provide clear, accurate, and helpful information.
        - If a question is unclear, kindly ask for clarification in a gentle tone.
        - Focus on creating trust and emotional comfort for families and residents.

        ## Tone & Style
        - Warm, understanding, and human-centered.
        - Avoid robotic or overly formal phrasing.
        - Use positive, inclusive language (e.g., “we’re happy to help,” “you’re always welcome to reach out”).
        - Express empathy for sensitive topics (e.g., health, aging, or family concerns).

        ## CRITICAL FORMATTING RULES - FOLLOW EXACTLY
        - use markdown syntax
        - DO use paragraph breaks (new lines) to separate different topics or ideas for better readability

        ## Response Guidelines
        - When discussing services, include practical details (e.g., care levels, room types, amenities).
        - When addressing emotional or personal concerns, validate feelings first, then provide helpful information.
        - Never give medical advice — instead, guide users to the appropriate care staff or health professionals.
        - Always use plain, easy-to-understand language.
        - Give concise answer
        `
      },
      ...conversationHistory,
    ];

    // Initial API call
    let response = await client.chat.completions.create({
      model: deployment,
      temperature: 0.1,
      messages: messages,
      functions: functions,
      function_call: "auto"
    });

    let assistantMessage = response.choices[0].message;
    let functionResult
    // Handle function calls
    while (assistantMessage.function_call) {
      const functionName = assistantMessage.function_call.name;
      const functionArgs = JSON.parse(assistantMessage.function_call.arguments);

      console.log(`\n🔧 Calling function: ${functionName}`);
      console.log(`📝 Arguments:`, functionArgs);

      // Execute the function
      functionResult = await executeFunction(functionName, functionArgs, conversationHistory);

      // console.log(`✅ Function result:`, functionResult);

      // Add function call and result to messages
      messages.push(assistantMessage);
      messages.push({
        role: "function",
        name: functionName,
        content: JSON.stringify(functionResult)
      });

      // Get next response
      let response = await client.chat.completions.create({
        model: deployment,
        temperature: 0.1,
        messages: messages,
        functions: functions,
        function_call: "auto"
      });

      assistantMessage = response.choices[0].message;
    }

    // Return final response
    return {
      message: assistantMessage.content,
      result: functionResult
    }

  } catch (error) {
    console.error("Error:", error);
    return {
      message: "I apologize, but I'm having trouble processing your request. Please try again.",
      conversationHistory
    };
  }
}