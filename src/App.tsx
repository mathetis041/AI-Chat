import ChatInput from './components/chatInput';
import ChatMessage from './components/chatMessage';
import Header from './components/header';
import LoadingIndicator from './components/loadingIndicator';
import { Sidebar } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { formatTime } from '../utils/chatUtils';
import { createNewSession } from './components/newChat';
import { generateContent } from './services/geminiApi';

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

const getInitialSessions = (): { [id: string]: Message[] } => {
  const saved = localStorage.getItem('chat_sessions');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      Object.keys(parsed).forEach((key) => {
        parsed[key] = parsed[key].map((msg: Message) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
      });
      return parsed;
    } catch (err) {
      console.error('Failed to parse sessions:', err);
    }
  }

  const defaultId = `session-${Date.now()}`;
  return {
    [defaultId]: [
      {
        id: Date.now(),
        text: 'Hello, how can I help you today?',
        sender: 'bot',
        timestamp: new Date(),
      },
    ],
  };
};

const getInitialDarkMode = (): boolean => {
  return localStorage.getItem('dark_mode') === 'true';
};

const App = () => {
  const initialSessions = getInitialSessions();
  const [sessions, setSessions] = useState<{ [id: string]: Message[] }>(
    getInitialSessions,
  );

  const [activeSessionId, setActiveSessionId] = useState<string>(() => {
    return (
      localStorage.getItem('active_chat_id') || Object.keys(initialSessions)[0]
    );
  });
  const [darkMode, setDarkMode] = useState<boolean>(getInitialDarkMode);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');

  const currentMessages = sessions[activeSessionId] || [];

  const createNewSessionId = () => `session-${Date.now()}`;

  const saveSessionsToStorage = (sessions: { [id: string]: Message[] }) => {
    localStorage.setItem('chat_sessions', JSON.stringify(sessions));
  };

  const saveActiveSessionId = (id: string) => {
    localStorage.setItem('active_chat_id', id);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    saveSessionsToStorage(sessions);
  }, [sessions]);

  useEffect(() => {
    saveActiveSessionId(activeSessionId);
  }, [activeSessionId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [sessions, activeSessionId]);

  useEffect(() => {
    localStorage.setItem('dark_mode', JSON.stringify(darkMode));
  }, [darkMode]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    const updatedMessages = [...(sessions[activeSessionId] || []), userMessage];
    setSessions((prev) => ({
      ...prev,
      [activeSessionId]: updatedMessages,
    }));
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

      const updatedWithBot = [...updatedMessages, botMessage];
      setSessions((prev) => ({
        ...prev,
        [activeSessionId]: updatedWithBot,
      }));
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now() + 2,
        text: 'Something went wrong while generating response.',
        sender: 'bot',
        timestamp: new Date(),
      };
      const updatedWithError = [...updatedMessages, errorMessage];
      setSessions((prev) => ({
        ...prev,
        [activeSessionId]: updatedWithError,
      }));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <div className="flex">
        <Sidebar />
        {/* chat message area */}
        <div className="flex-1 overflow-y-auto px-4 pb-32 pt-24 md:px-6">
          <div className="mx-auto max-w-5xl space-y-4">
            {currentMessages.map((message) => (
              <ChatMessage
                key={message.id}
                darkMode={darkMode}
                message={message}
                formatTime={formatTime}
              />
            ))}
            {isLoading ? <LoadingIndicator darkMode={darkMode} /> : null}
            <div ref={bottomRef} />
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
    </div>
  );
};

export default App;
