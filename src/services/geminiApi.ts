const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = `${
  import.meta.env.VITE_GEMINI_API_URL
}?key=${GEMINI_API_KEY}`;

export const generateContent = async (message: string): Promise<string> => {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not defined');
  }

  try {
    console.log('Calling Gemini API with message:', message);
    console.log('API URL:', GEMINI_API_URL);
    console.log('API Key present?', !!GEMINI_API_KEY);

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: message }],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response from Gemini API:', errorText);
      throw new Error(
        `Gemini API error: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    console.log('Gemini response:', data);

    const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!responseText) {
      throw new Error('No valid response text found in candidates');
    }

    return responseText;
  } catch (error) {
    console.error('Error generating content:', error);
    throw new Error('Failed to generate content');
  }
};
