export const getRandomResponse = (input: string) => {
  const botResponses = [
    'Hello! How can I assist you today?',
    'Hi there! What do you need help with?',
    'Greetings! How may I help you?',
    'Hey! What can I do for you?',
  ];

  return botResponses[Math.floor(Math.random() * botResponses.length)];
};

export const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};
