// "use client"

// import { useChat } from "@ai-sdk/react"
// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { X, MessageCircle, Send } from "lucide-react"

// export function ChatWidget() {
//   const [isOpen, setIsOpen] = useState(false)
//   const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
//     api: "/api/chat",
//   })

//   return (
//     <>
//       {/* Chat Button */}
//       {!isOpen && (
//         <button
//           onClick={() => setIsOpen(true)}
//           className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-50 flex items-center gap-2"
//         >
//           <MessageCircle size={24} />
//         </button>
//       )}

//       {/* Chat Window */}
//       {isOpen && (
//         <div className="fixed bottom-6 right-6 w-96 max-h-96 bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-gray-200">
//           {/* Header */}
//           <div className="bg-green-600 text-white p-4 rounded-t-lg flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <MessageCircle size={20} />
//               <div>
//                 <h3 className="font-semibold">COGIR Assistant</h3>
//                 <p className="text-xs text-green-100">Always here to help</p>
//               </div>
//             </div>
//             <button onClick={() => setIsOpen(false)} className="hover:bg-green-700 p-1 rounded transition">
//               <X size={20} />
//             </button>
//           </div>

//           {/* Messages */}
//           <ScrollArea className="flex-1 p-4">
//             <div className="space-y-4">
//               {messages.length === 0 && (
//                 <div className="text-center text-gray-500 py-8">
//                   <p className="font-semibold mb-2">Hello! 👋</p>
//                   <p className="text-sm">Ask me anything about COGIR senior living services.</p>
//                 </div>
//               )}
//               {messages.map((message, i) => (
//                 <div key={i} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
//                   <div
//                     className={`max-w-xs px-4 py-2 rounded-lg ${
//                       message.role === "user"
//                         ? "bg-green-600 text-white rounded-br-none"
//                         : "bg-gray-100 text-gray-900 rounded-bl-none"
//                     }`}
//                   >
//                     <p className="text-sm">{message.content}</p>
//                   </div>
//                 </div>
//               ))}
//               {isLoading && (
//                 <div className="flex justify-start">
//                   <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg rounded-bl-none">
//                     <div className="flex gap-2">
//                       <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
//                       <div
//                         className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
//                         style={{ animationDelay: "0.2s" }}
//                       />
//                       <div
//                         className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
//                         style={{ animationDelay: "0.4s" }}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </ScrollArea>

//           {/* Input */}
//           <form
//             onSubmit={(e) => {
//               e.preventDefault()
//               handleSubmit()
//             }}
//             className="border-t border-gray-200 p-4 flex gap-2"
//           >
//             <Input
//               value={input}
//               onChange={handleInputChange}
//               placeholder="Ask a question..."
//               className="flex-1"
//               disabled={isLoading}
//             />
//             <Button type="submit" disabled={isLoading} className="bg-green-600 hover:bg-green-700">
//               <Send size={18} />
//             </Button>
//           </form>
//         </div>
//       )}
//     </>
//   )
// }
