import type { Message } from '../../types/types';

// utils/chatSession.ts

export const createNewSession = (
  sessions: { [id: string]: Message[] },
  setSessions: React.Dispatch<
    React.SetStateAction<{ [id: string]: Message[] }>
  >,
  setActiveSessionId: React.Dispatch<React.SetStateAction<string>>,
) => {
  const id = `session-${Date.now()}`;
  const newSession: Message[] = [
    {
      id: Date.now(),
      text: 'Hello! Let’s start a new conversation.',
      sender: 'bot',
      timestamp: new Date(),
    },
  ];

  const updatedSessions = {
    ...sessions,
    [id]: newSession,
  };

  setSessions(updatedSessions);
  setActiveSessionId(id);
  localStorage.setItem('chat_sessions', JSON.stringify(updatedSessions));
  localStorage.setItem('active_chat_id', id);
};
