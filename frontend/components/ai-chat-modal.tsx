"use client";
import type React from "react";

import { useState, useRef, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X, Send, Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { chatWithAgent } from "@/agent/llm";
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STORAGE_KEY = "chat_messages";

function AIChatModalContent({ isOpen, onClose }: AIChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    // {
    //   id: "1",
    //   role: "assistant",
    //   content:
    //     "Hi! I'm your shopping assistant. I can help you find products by type, color, size, or price. What are you looking for?",
    // },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState("product-search");

  // Load messages from localStorage on component mount
  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem(STORAGE_KEY);
      if (savedMessages) {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed);
      }
    } catch (error) {
      console.error("Error loading messages from localStorage:", error);
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    try {
      if (messages.length > 0) {
        // console.log("Chat Messages: ", messages);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      }
    } catch (error) {
      console.error("Error saving messages to localStorage:", error);
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handles sending prompt depending on selected mode
  const processMessage = async (userMessage: Message) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_AGENTSENSE_BACKEND_URL}/api/chat-message/e-commerce`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatMessages: [...messages],
          prompt: userMessage.content,
        }),
      }
    );

    const data = await response.json();
    console.log("✅ FAQ Search API response:", data);

    return {
      type: "faq",
      response: data.data,
    };
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // const result = await processMessage(userMessage);
      const result = await chatWithAgent([...messages, userMessage]);
      console.log("Chat with Agent: ", result);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: result.message,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to remove JSON blocks from a string
  function removeJsonFromString(str: string) {
    try {
      return str.replace(/```json\s*\n[\s\S]*?\n```/g, "").trim();
    } catch (e) {
      console.error("ERROR: removeJsonFromString", e);
      return str;
    }
    // Remove JSON code blocks (```json ... ```)
  }

  const clearChatHistory = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-end justify-end p-4 z-50 pointer-events-none">
      <Card className=" pointer-events-auto w-full max-w-sm md:max-w-md h-96 md:h-[700px] flex flex-col shadow-xl rounded-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold text-xl">Community Assistant</h2>
          <div className="flex gap-1">
            {messages.length > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearChatHistory}
                title="Clear chat history"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                  message.role === "user"
                    ? "bg-green-600 text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                <ReactMarkdown>
                  {removeJsonFromString(message.content)}
                </ReactMarkdown>
                {/* <p className="text-sm whitespace-pre-wrap">{message.content}</p> */}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted text-foreground px-4 py-2 rounded-lg">
                <p className="text-sm">Thinking...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* form */}

        <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            disabled={isLoading}
            className="flex-1 "
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="bg-green-600 hover:bg-green-700"
          >
            <Send className="w-4 h-4 " />
          </Button>
        </form>
      </Card>
    </div>
  );
}

export function AIChatModal(props: AIChatModalProps) {
  return (
    <Suspense fallback={null}>
      <AIChatModalContent {...props} />
    </Suspense>
  );
}
