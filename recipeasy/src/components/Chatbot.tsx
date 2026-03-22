"use client";

import { useState, useRef, useEffect } from "react";
import { Star, Send, Sparkles, ChefHat, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function Chatbot() {
    const [isMaximized, setIsMaximized] = useState(true);
    const [messages, setMessages] = useState<Message[]>([
        {
        id: "1",
        role: "assistant",
        content:
            "Hello! I'm Gemini Ramsey, your RecipEasy cooking assistant powered by Gemini AI. I'm here to help you with all your cooking questions! Ask me about recipes, cooking techniques, ingredient substitutions, meal planning, dietary modifications, and more. How can I help you today?",
        },
    ]);
    const [inputMessage, setInputMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: inputMessage,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputMessage("");
        setIsTyping(true);

        // // Simulate AI response with varied responses
        // setTimeout(() => {
        //     const aiResponses = [
        //         "Great question! When substituting ingredients, it's important to consider the role they play in the recipe. For example, butter provides moisture and flavor, so if you're replacing it, coconut oil or vegetable oil work well for moisture, but you might want to add a pinch of salt for flavor.",
        //         "Absolutely! The key to perfectly cooked pasta is to salt your water generously (it should taste like the sea) and cook it until it's al dente - firm to the bite. Always save some pasta water before draining, as the starchy water helps your sauce cling to the pasta beautifully!",
        //         "That's a wonderful idea! To meal prep successfully, choose recipes that store well - soups, stews, grain bowls, and roasted vegetables are great options. Invest in good quality airtight containers and label everything with dates. Most meals will keep for 3-4 days in the fridge.",
        //         "For a dairy-free version, you can use coconut milk, almond milk, or oat milk depending on what you're making. For cream-based sauces, full-fat coconut milk works wonderfully. For baking, oat milk is often the best substitute as it has a neutral flavor and good consistency.",
        //         "The secret to crispy chicken skin is to make sure it's completely dry before cooking! Pat it with paper towels, then let it air-dry in the fridge uncovered for a few hours or overnight. High heat and not moving it too much while cooking also helps achieve that perfect golden crisp.",
        //         "Excellent question! You can reduce sugar in most recipes by 25-30% without drastically affecting the outcome. In baking, you might need to adjust liquid slightly. You can also substitute with natural sweeteners like honey or maple syrup, but remember they're sweeter, so use less.",
        //         "When your vegetables turn out soggy, it's usually because of overcrowding in the pan or too low heat. Give your veggies space to breathe - they should be in a single layer. Use high heat and don't stir too frequently. This allows moisture to evaporate and creates those delicious caramelized edges!",
        //         "For perfectly cooked rice every time, use the right water ratio (usually 1:2 rice to water for white rice), bring to a boil, then reduce to the lowest heat and cover tightly. Don't peek! Let it steam for 15-18 minutes, then let it rest off heat for 5 minutes before fluffing.",
        //         "Food safety is crucial! Raw chicken should be stored at 40°F or below and used within 1-2 days. Always use separate cutting boards for raw meat and vegetables to avoid cross-contamination. Cook chicken to an internal temperature of 165°F to ensure it's safe to eat.",
        //         "Great thinking about flavor! Building layers of flavor starts with aromatics like onions, garlic, and ginger. Toast your spices to release their oils, add acid (like lemon juice or vinegar) to brighten dishes, and don't forget salt - it enhances all other flavors. Finish with fresh herbs for a pop of freshness!",
        //     ];

        //     const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];

        //     const aiMessage: Message = {
        //         id: (Date.now() + 1).toString(),
        //         role: "assistant",
        //         content: randomResponse,
        //     };

        //     setMessages((prev) => [...prev, aiMessage]);
        //     setIsTyping(false);
        // }, 1200);

        // Get the AI response from the Python Gemini REST API
        try {
            const response = await fetch("http://localhost:8000/gemini_api/generate_prompt", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "prompt": inputMessage
                }),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const jsonResponse = await response.json()

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: jsonResponse.answer,
            };

            setMessages((prev) => [...prev, aiMessage]);
        }
        catch (error) {
            console.error("Request to backend API failed with error: ", error);
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "Unfortunately, an unexpected error occurred while processing your question. Can you ask me again?",
            };

            setMessages((prev) => [...prev, aiMessage]);
        }
        finally {
            setIsTyping(false);
        }
    };

    const suggestedQuestions = [
        "How do I make perfect scrambled eggs?",
        "What's a good substitute for eggs in baking?",
        "How can I make my vegetables more flavorful?",
        "Tips for meal prep      the week?",
        "How do I know when meat is cooked properly?",
        "What herbs go well with chicken?",
    ];

    const handleSuggestionClick = (question: string) => {
        setInputMessage(question);
    };

    return (
        <div className="min-h-screen bg-[#9CAF88] relative overflow-hidden">
            {/* Decorative Corner Borders */}
            <div className="absolute top-0 left-0 w-48 h-48 pointer-events-none">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                <path
                    d="M 10 10 Q 10 10 40 15 Q 60 18 80 12 Q 100 6 110 20 M 110 20 Q 115 30 108 45 Q 100 65 110 80 M 15 10 L 15 110 M 18 15 Q 20 50 15 80 Q 12 100 18 110"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.6"
                />
                <circle cx="30" cy="25" r="3" fill="white" opacity="0.6" />
                <circle cx="50" cy="30" r="2" fill="white" opacity="0.6" />
                <circle cx="25" cy="50" r="2" fill="white" opacity="0.6" />
                </svg>
            </div>

            <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none rotate-90">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                <path
                    d="M 10 10 Q 10 10 40 15 Q 60 18 80 12 Q 100 6 110 20 M 110 20 Q 115 30 108 45 Q 100 65 110 80 M 15 10 L 15 110 M 18 15 Q 20 50 15 80 Q 12 100 18 110"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.6"
                />
                <circle cx="30" cy="25" r="3" fill="white" opacity="0.6" />
                <circle cx="50" cy="30" r="2" fill="white" opacity="0.6" />
                <circle cx="25" cy="50" r="2" fill="white" opacity="0.6" />
                </svg>
            </div>

            <div className="absolute bottom-0 left-0 w-48 h-48 pointer-events-none -rotate-90">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                <path
                    d="M 10 10 Q 10 10 40 15 Q 60 18 80 12 Q 100 6 110 20 M 110 20 Q 115 30 108 45 Q 100 65 110 80 M 15 10 L 15 110 M 18 15 Q 20 50 15 80 Q 12 100 18 110"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.6"
                />
                <circle cx="30" cy="25" r="3" fill="white" opacity="0.6" />
                <circle cx="50" cy="30" r="2" fill="white" opacity="0.6" />
                <circle cx="25" cy="50" r="2" fill="white" opacity="0.6" />
                </svg>
            </div>

            <div className="absolute bottom-0 right-0 w-48 h-48 pointer-events-none rotate-180">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                <path
                    d="M 10 10 Q 10 10 40 15 Q 60 18 80 12 Q 100 6 110 20 M 110 20 Q 115 30 108 45 Q 100 65 110 80 M 15 10 L 15 110 M 18 15 Q 20 50 15 80 Q 12 100 18 110"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.6"
                />
                <circle cx="30" cy="25" r="3" fill="white" opacity="0.6" />
                <circle cx="50" cy="30" r="2" fill="white" opacity="0.6" />
                <circle cx="25" cy="50" r="2" fill="white" opacity="0.6" />
                </svg>
            </div>

            {/* Minimized Chatbot Button */}
            {!isMaximized && (
            <button
                onClick={() => setIsMaximized(true)}
                className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-[#6B4423] to-[#8B5A2B] text-white rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center z-50 border-4 border-white"
            >
                <Sparkles className="w-8 h-8" />
            </button>
            )}

            {/* Maximized Chatbot */}
      {isMaximized && (
        <div className="fixed bottom-6 right-6 w-[450px] h-[700px] bg-white/98 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-[#9CAF88] flex flex-col z-50">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-[#6B4423] to-[#8B5A2B] text-white p-4 rounded-t-2xl">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white">Gemini Ramsey</h3>
                  <p className="text-white/80 text-xs">
                    Your AI culinary companion
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsMaximized(false)}
                className="hover:bg-white/20 p-2 rounded transition-colors"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>

            
            </div>

            {/* Chat Messages */}
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                {messages.map((message) => (
                    <div
                    key={message.id}
                    className={`flex ${
                        message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                    >
                    <div
                        className={`max-w-[85%] ${
                        message.role === "user" ? "order-2" : "order-1"
                        }`}
                    >
                        {message.role === "assistant" && (
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-6 h-6 bg-gradient-to-br from-[#6B4423] to-[#8B5A2B] rounded-full flex items-center justify-center">
                            <Sparkles className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-xs text-[#6B4423]">
                            Gemini
                            </span>
                        </div>
                        )}
                        <div
                        className={`rounded-2xl px-4 py-2.5 ${
                            message.role === "user"
                            ? "bg-[#9CAF88] text-white ml-auto"
                            : "bg-[#F5F5F5] text-[#4a5240] border-2 border-[#9CAF88]/30"
                        }`}
                        >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        </div>
                    </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex justify-start">
                    <div className="max-w-[85%]">
                        <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#6B4423] to-[#8B5A2B] rounded-full flex items-center justify-center">
                            <Sparkles className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-xs text-[#6B4423]">
                            Gemini
                        </span>
                        </div>
                        <div className="bg-[#F5F5F5] border-2 border-[#9CAF88]/30 rounded-2xl px-4 py-2.5">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#6B4423] rounded-full animate-bounce"></div>
                            <div
                            className="w-2 h-2 bg-[#6B4423] rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                            ></div>
                            <div
                            className="w-2 h-2 bg-[#6B4423] rounded-full animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                            ></div>
                        </div>
                        </div>
                    </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
                </div>
            </ScrollArea>

            {/* Suggested Questions (only show when conversation is new) */}
            {messages.length === 1 && (
                <div className="px-4 py-3 bg-[#9CAF88]/10 border-t border-[#9CAF88]/30">
                <p className="text-xs text-[#6B4423] mb-2">
                    Suggested questions:
                </p>
                <div className="grid grid-cols-1 gap-2">
                    {suggestedQuestions.slice(0, 3).map((question, index) => (
                    <button
                        key={index}
                        onClick={() => handleSuggestionClick(question)}
                        className="text-left px-3 py-2 bg-white border border-[#9CAF88] rounded-lg text-xs text-[#4a5240] hover:bg-[#9CAF88]/20 hover:border-[#6B4423] transition-colors"
                    >
                        <ChefHat className="w-3 h-3 inline mr-2 text-[#6B4423]" />
                        {question}
                    </button>
                    ))}
                </div>
                </div>
            )}

            {/* Chat Input */}
            <form
                onSubmit={handleSendMessage}
                className="p-4 border-t-2 border-[#9CAF88]/30 bg-white rounded-b-2xl"
            >
                <div className="flex gap-2">
                <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-1 border-2 border-[#9CAF88] focus:border-[#6B4423] focus:ring-[#6B4423]/20"
                    disabled={isTyping}
                />
                <Button
                    type="submit"
                    disabled={isTyping || !inputMessage.trim()}
                    className="bg-[#6B4423] hover:bg-[#8B5A2B] text-white"
                >
                    <Send className="w-4 h-4" />
                </Button>
                </div>
            </form>
            </div>
        )}

        </div>
    )
}