import { useState, useEffect } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

export default function Gemini() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [chat, setChat] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const MODEL_NAME = `gemini-1.0-pro-001`;
  const genAi = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

  const generateConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutput: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  useEffect(() => {
    const initChat = async () => {
      try {
        const newChat = await genAi
          .getGenerativeModel({ model: MODEL_NAME })
          .startChat({
            generateConfig,
            safetySettings,
            history: messages.map((msg) => ({
              text: msg.text,
              role: msg.role,
            })),
          });
        setChat(newChat);
      } catch (err) {
        setError("Failed to initialize chat. Please try again.");
      }
    };
    initChat();
  }, []);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const userMessage = {
        text: userInput,
        role: "user",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setUserInput("");

      if (chat) {
        const result = await chat.sendMessage(userInput);
        const botMessage = {
          text: result.response.text(),
          role: "bot",
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="mt-8 min-h-screen flex items-center justify-center bg-zinc-900">
      <div className="w-full max-w-4xl p-8 bg-zinc-800 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center text-zinc-100">
          Gemini AI Chat
        </h1>
        <div className="space-y-4 mb-6 h-96 overflow-y-auto p-6 bg-zinc-700 rounded-lg shadow-inner">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg break-words ${
                message.role === "user"
                  ? "bg-zinc-600 text-zinc-100 border-l-4 border-teal-500"
                  : "bg-zinc-800 text-zinc-100 border-l-4 border-purple-500"
              }`}
              style={{
                maxWidth: "80%",
                marginLeft: message.role === "user" ? "auto" : "0",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              {message.text}
            </div>
          ))}
        </div>
        {error && <div className="text-red-400 mb-6 text-center">{error}</div>}
        <div className="flex">
          <input
            type="text"
            className="flex-grow p-4 rounded-l-lg bg-zinc-700 text-zinc-100 placeholder-zinc-400 focus:outline-none  focus:ring-teal-500"
            placeholder="Type a message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className={`p-4 rounded-r-lg ${
              loading
                ? "bg-zinc-600 cursor-not-allowed"
                : "bg-zinc-600 hover:bg-zinc-500"
            } text-zinc-100 font-semibold transition duration-300`}
            onClick={handleSendMessage}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
