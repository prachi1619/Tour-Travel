interface ChatResponse {
  text: string;
  suggestions: string[];
}

interface ChatPattern {
  keywords: string[];
  responses: string[];
  suggestions: string[];
  followUp?: {
    question: string;
    patterns: ChatPattern[];
  };
}

const patterns: ChatPattern[] = [
  {
    keywords: ['hello', 'hi', 'hey', 'greetings'],
    responses: [
      "Hello! I'm your travel assistant. How can I help you plan your perfect trip?",
      "Hi there! Ready to explore some amazing destinations?",
      "Welcome! Let me help you plan your next adventure!"
    ],
    suggestions: [
      'Plan a trip',
      'Find destinations',
      'Travel tips',
      'Budget advice'
    ]
  },
  {
    keywords: ['plan', 'trip', 'vacation', 'holiday'],
    responses: [
      "Great! Let's plan your perfect trip. What type of destination interests you?",
      "I'll help you plan an amazing journey. What's your preferred travel style?"
    ],
    suggestions: [
      'Beach destination',
      'Mountain adventure',
      'City exploration',
      'Cultural experience'
    ],
    followUp: {
      question: "How long are you planning to travel?",
      patterns: [
        {
          keywords: ['weekend', 'short', '2-3 days'],
          responses: ["Perfect for a quick getaway! Here are some nearby destinations that would be great for a weekend trip:"],
          suggestions: [
            'Popular weekend getaways',
            'Short trip itineraries',
            'Quick travel tips'
          ]
        },
        {
          keywords: ['week', '7 days', 'seven'],
          responses: ["A week gives you plenty of time to explore! Here are some suggestions:"],
          suggestions: [
            'Week-long itineraries',
            'Multi-city tours',
            'Popular 7-day trips'
          ]
        }
      ]
    }
  },
  {
    keywords: ['budget', 'cost', 'money', 'expensive', 'cheap'],
    responses: [
      "Let me help you plan a trip within your budget. Here are some money-saving tips:",
      "There are many ways to travel on a budget. Here's what I recommend:"
    ],
    suggestions: [
      'Find cheap flights',
      'Budget accommodation',
      'Save on food',
      'Free activities'
    ]
  },
  {
    keywords: ['destination', 'where', 'place', 'location'],
    responses: [
      "I can help you find the perfect destination. What interests you most?",
      "There are so many amazing places to explore! What's your travel style?"
    ],
    suggestions: [
      'Popular destinations',
      'Hidden gems',
      'Seasonal recommendations',
      'Trending locations'
    ]
  },
  {
    keywords: ['safety', 'safe', 'security', 'emergency'],
    responses: [
      "Safety is crucial while traveling. Here are important tips to keep in mind:",
      "Let me share some essential safety advice for travelers:"
    ],
    suggestions: [
      'Travel insurance tips',
      'Emergency contacts',
      'Safe neighborhoods',
      'Health precautions'
    ]
  },
  {
    keywords: ['food', 'eat', 'restaurant', 'cuisine'],
    responses: [
      "Food is one of the best parts of traveling! Here are some culinary tips:",
      "Let me help you discover amazing local cuisine and dining experiences:"
    ],
    suggestions: [
      'Local specialties',
      'Restaurant recommendations',
      'Street food guide',
      'Food safety tips'
    ]
  },
  {
    keywords: ['transport', 'travel', 'get around', 'transportation'],
    responses: [
      "Here's what you need to know about getting around:",
      "Let me help you understand your transportation options:"
    ],
    suggestions: [
      'Public transit guide',
      'Taxi vs ride-sharing',
      'Car rental tips',
      'Walking tours'
    ]
  }
];

const defaultResponse: ChatResponse = {
  text: "I understand you're interested in travel. Could you tell me more about what you're looking for?",
  suggestions: [
    'Plan a trip',
    'Find destinations',
    'Get travel tips',
    'Budget advice'
  ]
};

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
// For development - in production, use proper environment variable handling
const OPENROUTER_API_KEY = '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';

function findBestMatch(input: string): ChatPattern | null {
  const words = input.toLowerCase().split(' ');
  let bestMatch: ChatPattern | null = null;
  let maxMatches = 0;

  for (const pattern of patterns) {
    let matches = 0;
    for (const keyword of pattern.keywords) {
      if (words.some(word => word.includes(keyword) || keyword.includes(word))) {
        matches++;
      }
    }
    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatch = pattern;
    }
  }

  return maxMatches > 0 ? bestMatch : null;
}

export function generateResponse(userInput: string): ChatResponse {
  const pattern = findBestMatch(userInput);
  
  if (!pattern) {
    return defaultResponse;
  }

  return {
    text: pattern.responses[Math.floor(Math.random() * pattern.responses.length)],
    suggestions: pattern.suggestions
  };
}

export function getSuggestions(): string[] {
  return defaultResponse.suggestions;
}

export async function getChatbotResponse(userMessage: string): Promise<ChatResponse> {
  try {
    // Add travel context to the prompt
    const systemMessage = "You are a knowledgeable travel assistant. Provide helpful, concise travel advice and recommendations. Focus on practical tips and specific suggestions. For itineraries, include specific places, timings, and practical details.";
    
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Tour Planner'
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: systemMessage
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      console.log('Falling back to pattern matching due to API error:', await response.text());
      return generateResponse(userMessage);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content;

    if (!aiResponse) {
      return generateResponse(userMessage);
    }

    // Get contextual suggestions based on the user's query
    const pattern = findBestMatch(userMessage);
    const suggestions = pattern ? pattern.suggestions : defaultResponse.suggestions;

    return {
      text: aiResponse,
      suggestions
    };

  } catch (error) {
    console.error('Chatbot error:', error);
    // Fall back to pattern matching on error
    return generateResponse(userMessage);
  }
} 