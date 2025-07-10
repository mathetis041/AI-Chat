import ChatInput from "./components/chatInput";
import ChatMessage from "./components/chatMessage";
import Header from "./components/header";
import LoadingIndicator from "./components/loadingIndicator";
import { useState } from "react";
import { formatTime } from "../utils/chatUtils";
import { generateContent } from "./services/geminiApi";

// ==================================================
// Author: Matthew Vincent
// Project: AI Chat App
// GitHub: https://github.com/mathetis041
// Date: July 2025
// ==================================================

type Message = {
  id: number;
  text: string;
  sender: string;
  timestamp: Date;
};

const App = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hello, how can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    try {
      const aiResponse = await generateContent(input);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now() + 2,
        text: 'Something went wrong while generating response.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

      {/* chat message area */}
      <div className="flex-1 overflow-y-auto px-4 pb-32 pt-24 md:px-6">
        <div className="mx-auto max-w-5xl space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              darkMode={darkMode}
              message={message}
              formatTime={formatTime}
            />
          ))}
          {isLoading ? <LoadingIndicator darkMode={darkMode} /> : null}
        </div>
      </div>
      <ChatInput
        darkMode={darkMode}
        input={input}
        setInput={setInput}
        loading={isLoading}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default App;
