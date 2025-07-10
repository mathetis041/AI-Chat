import { Send } from "lucide-react";

// ==================================================
// Author: Matthew Vincent
// Project: AI Chat App
// GitHub: https://github.com/mathetis041
// Date: July 2025
// ==================================================

type ChatInputProps = {
  darkMode: boolean;
  input: string;
  setInput: (value: string) => void;
  loading: boolean;
  handleSendMessage: () => void;
};

const ChatInput = ({
  darkMode,
  input,
  setInput,
  loading,
  handleSendMessage,
}: ChatInputProps) => {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 ${
        darkMode
          ? 'border-t border-gray-700 bg-gray-800'
          : 'border-t border-gray-200 bg-white'
      } p-4`}
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={input}
            disabled={loading}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && input.trim()) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            onChange={(e) => setInput(e.target.value)}
            placeholder={loading ? 'Sending...' : 'Type your message here...'}
            className={`flex-1 border ${
              darkMode
                ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400'
                : 'border-gray-300 bg-white text-gray-900'
            } rounded-full px-5 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              loading ? 'cursor-not-allowed opacity-50' : ''
            }`}
          />

          <button
            className={`rounded-full p-3 shadow-md transition-colors ${
              darkMode ? 'text-white' : 'text-gray-800'
            } ${
              loading || !input.trim()
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer'
            }`}
            onClick={handleSendMessage}
            disabled={loading || !input.trim()}
          >
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
