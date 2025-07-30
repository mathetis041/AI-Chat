export type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

export type ChatSession = {
  id: string;
  title: string;
  createdAt: string;
  messages: Message[];
};
