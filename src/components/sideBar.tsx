import type React from "react";
import type { Message } from "../../types/types";

interface SidebarProps {
  sessions: Record<string, Message[]>;
  activeSessionId: string;
  setActiveSessionId: React.Dispatch<React.SetStateAction<string>>;
  handleNewChat: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sessions,
  activeSessionId,
  setActiveSessionId,
  handleNewChat,
}) => {
  return (
    <div className="h-full w-64 space-y-4 border-r bg-gray-100 p-4 dark:bg-gray-900">
      <button
        onClick={handleNewChat}
        className="w-full rounded bg-indigo-600 py-2 text-white hover:bg-indigo-700"
      >
        + New Chat
      </button>

      <div className="max-h-[calc(100vh-100px)] space-y-2 overflow-y-auto">
        {Object.entries(sessions).map(([id, msgs]) => (
          <div
            key={id}
            onClick={() => setActiveSessionId(id)}
            className={`cursor-pointer rounded px-3 py-2 ${
              id === activeSessionId
                ? 'bg-indigo-600 text-white'
                : 'hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
          >
            {msgs?.[0]?.text?.slice(0, 20) || 'New Session'}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
