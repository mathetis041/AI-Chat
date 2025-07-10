import { Bot, User } from "lucide-react";

type Message = {
  id: number;
  text: string;
  sender: string;
  timestamp: Date;
};

type ChatMessageProps = {
  darkMode: boolean;
  message: Message;
  formatTime: (date: Date) => string;
};

const ChatMessage = ({ darkMode, formatTime, message }: ChatMessageProps) => {
  return (
    <div
      className={`mb-4 flex ${
        message.sender === 'user' ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`flex w-full max-w-[80%] rounded-2xl px-5 py-3.5 md:max-w-[70%] ${
          message.sender === 'user'
            ? darkMode
              ? 'bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow-md'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
            : darkMode
              ? 'border border-gray-700 bg-gray-800 text-gray-100'
              : 'bg-white text-gray-800 shadow-md'
        }`}
      >
        <div
          className={`mr-3 flex-shrink-0 ${
            message.sender === 'user'
              ? 'text-indigo-200'
              : darkMode
                ? 'text-indigo-400'
                : 'text-indigo-600'
          }`}
        >
          {message.sender === 'user' ? (
            <User className="h-5 w-5" />
          ) : (
            <Bot className="h-5 w-5" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-5">
            <span className="font-medium">
              {message.sender === 'user' ? 'You' : 'AI Assistant'}
            </span>
            <span
              className={`text-xs ${
                message.sender === 'user'
                  ? 'opacity-70'
                  : darkMode
                    ? 'text-gray-400'
                    : 'text-gray-500'
              }`}
            >
              {formatTime(message.timestamp)}
            </span>
          </div>
          <p className="hiphens-auto whitespace-pre-wrap break-words text-sm leading-relaxed md:text-base">
            {message.text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
