import logo from "../assets/images/favicon.ico";
import { Moon, Sparkle, Sun } from "lucide-react";

type HeaderProps = {
  toggleDarkMode: () => void;
  darkMode: boolean;
};

const Header = ({ toggleDarkMode, darkMode }: HeaderProps) => {
  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 ${
        darkMode
          ? 'border-gray-700 bg-gray-800 text-white'
          : 'border-gray-200 bg-white'
      } border-b px-6 py-4 shadow-lg`}
    >
      <div className="item-center mx-auto flex max-w-5xl justify-between">
        {/* left side content */}
        <div className="flex items-center space-x-3">
          <div className="rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 p-2">
            <img src={logo} alt="chatbot icon" className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold">AI Chat</h1>
        </div>

        {/* right side content */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 rounded px-3 py-1 text-sm font-medium">
            <Sparkle
              className={`${
                darkMode ? 'text-indigo-400' : 'text-indigo-600'
              } h-4 w-4`}
            />
            <span
              className={`${
                darkMode ? 'text-indigo-300' : 'text-indigo-700'
              } text-sm font-medium `}
            >
              AI Powered
            </span>
          </div>
          <button
            className={`cursor-pointer rounded-full p-2 ${
              darkMode
                ? 'bg-gray-700 text-yellow-300'
                : 'bg-indigo-100 text-indigo-700'
            }`}
            onClick={toggleDarkMode}
          >
            {darkMode ? <Sun /> : <Moon />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
