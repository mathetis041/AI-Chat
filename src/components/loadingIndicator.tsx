import { Bot } from "lucide-react";

type LoadingIndicatorProps = {
  darkMode: boolean;
};

const LoadingIndicator = ({ darkMode }: LoadingIndicatorProps) => {
  return (
    <div className="flex justify-start">
      <div
        className={`${
          darkMode
            ? 'border border-gray-700 bg-gray-800 text-gray-100'
            : 'bg-white text-gray-800 shadow-md'
        } max-w-[80%] rounded-2xl px-5 md:max-w-[70%]`}
      >
        <div className="flex items-center space-x-3">
          <Bot
            className={`h-5 w-5 ${
              darkMode ? 'text-indigo-400' : 'text-indigo-600'
            }`}
          />
          <div className="flex space-x-1">
            <div
              className={`h-2.5 w-2.5 ${
                darkMode ? 'bg-gray-500' : 'bg-indigo-400'
              } animate-bounce rounded-full`}
              style={{ animationDelay: '0s' }}
            ></div>
            <div
              className={`h-2.5 w-2.5 ${
                darkMode ? 'bg-gray-500' : 'bg-indigo-400'
              } animate-bounce rounded-full`}
              style={{ animationDelay: '150s' }}
            ></div>
            <div
              className={`h-2.5 w-2.5 ${
                darkMode ? 'bg-gray-500' : 'bg-indigo-400'
              } animate-bounce rounded-full`}
              style={{ animationDelay: '300ms' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
