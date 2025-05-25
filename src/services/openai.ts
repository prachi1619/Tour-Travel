import axios from 'axios';

interface ItineraryRequest {
  destination: string;
  duration: number;
  travelStyle: string;
  interests: string[];
}

export const generateItinerary = async (request: ItineraryRequest) => {
  try {
    const prompt = `Create a detailed ${request.duration}-day travel itinerary for ${request.destination}. 
    Travel style: ${request.travelStyle}
    Interests: ${request.interests.join(', ')}
    
    Please provide a day-by-day breakdown including:
    - Morning, afternoon, and evening activities
    - Recommended restaurants and dining experiences
    - Travel tips and logistics
    - Estimated time for each activity`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a knowledgeable travel planner who creates detailed, personalized travel itineraries.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      },
      {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating itinerary:', error);
    throw error;
  }
}; 