interface ItineraryOptions {
  destination: string;
  duration: number;
  interests: string[];
  budget: string;
  travelStyle: string;
}

interface DayPlan {
  day: number;
  activities: {
    time: string;
    activity: string;
    location?: string;
    notes?: string;
  }[];
}

interface Itinerary {
  destination: string;
  duration: number;
  summary: string;
  dailyPlans: DayPlan[];
  tips: string[];
  estimatedBudget: string;
}

// const OPENROUTER_API_KEY = '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';
const OPENROUTER_API_KEY = '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';

export async function testApiConnection(): Promise<boolean> {
  try {
    // Test with a minimal request to the main API endpoint
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://tour-travel-planner.com',
        'X-Title': 'Tour & Travel Planner'
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: 'Hi'
          }
        ],
        max_tokens: 5
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('OpenRouter API Error:', errorData);
      return false;
    }

    const data = await response.json();
    return data && data.choices && data.choices.length > 0;
  } catch (error) {
    console.error('Error testing API connection:', error);
    return false;
  }
}

export async function generateItinerary(options: ItineraryOptions): Promise<Itinerary> {
  try {
    const prompt = `Generate a detailed ${options.duration}-day travel itinerary for ${options.destination}.
Travel style: ${options.travelStyle}
Budget level: ${options.budget}
Interests: ${options.interests.join(', ')}

Please provide the itinerary in the following format:

Trip Summary:
[A brief overview of the trip]

Daily Schedule:
Day 1:
9:00 AM - [Activity description] (Location)
11:00 AM - [Activity description] (Location)
[Continue with more activities...]

Day 2:
[Similar format to Day 1]

[Continue for all days...]

Travel Tips:
• [Tip 1]
• [Tip 2]
• [Tip 3]
[Add more tips...]

Budget Estimate:
• Accommodation: [Cost]
• Meals: [Cost]
• Activities: [Cost]
• Transportation: [Cost]
• Miscellaneous: [Cost]
Total Estimated Cost: [Total]

Please ensure each day's activities include specific times and locations. Format times in 12-hour format (e.g., 9:00 AM, 2:30 PM).`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://tour-travel-planner.com',
        'X-Title': 'Tour & Travel Planner'
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an expert travel planner. Always provide detailed itineraries with specific times, locations, and activities. Use clear formatting with proper sections for Trip Summary, Daily Schedule, Travel Tips, and Budget Estimate. Include realistic time estimates for activities and travel between locations.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('OpenRouter API Error:', errorData);
      throw new Error(errorData?.error?.message || 'Failed to generate itinerary');
    }

    const data = await response.json();
    if (!data || !data.choices || !data.choices[0]?.message?.content) {
      throw new Error('Invalid response from OpenRouter API');
    }

    const content = data.choices[0].message.content;
    return parseItineraryResponse(content, options);
  } catch (error) {
    console.error('Error generating itinerary:', error);
    throw error;
  }
}

function parseItineraryResponse(content: string, options: ItineraryOptions): Itinerary {
  try {
    // Initialize the itinerary object
    const itinerary: Itinerary = {
      destination: options.destination,
      duration: options.duration,
      summary: '',
      dailyPlans: [],
      tips: [],
      estimatedBudget: ''
    };

    // Split content into major sections
    const sections = content.split(/\n(?=(?:Trip Summary|Daily Schedule|Travel Tips|Budget|Day \d+))/i);
    
    sections.forEach(section => {
      const sectionText = section.trim();
      
      // Parse Summary
      if (sectionText.toLowerCase().startsWith('trip summary')) {
        itinerary.summary = sectionText.replace(/^trip summary:?\s*/i, '').trim();
      }
      
      // Parse Daily Schedule
      else if (/^day \d+/i.test(sectionText)) {
        const dayMatch = sectionText.match(/^day (\d+)/i);
        if (dayMatch) {
          const dayNumber = parseInt(dayMatch[1]);
          const activities = parseActivities(sectionText);
          
          if (activities.length > 0) {
            itinerary.dailyPlans.push({
              day: dayNumber,
              activities
            });
          }
        }
      }
      
      // Parse Travel Tips
      else if (sectionText.toLowerCase().startsWith('travel tips')) {
        itinerary.tips = sectionText
          .replace(/^travel tips:?\s*/i, '')
          .split('\n')
          .filter(line => line.trim())
          .map(tip => tip.replace(/^[•\-*]\s*/, '').trim());
      }
      
      // Parse Budget
      else if (sectionText.toLowerCase().includes('budget')) {
        itinerary.estimatedBudget = formatBudget(sectionText);
      }
    });

    // Sort daily plans by day number
    itinerary.dailyPlans.sort((a, b) => a.day - b.day);

    return itinerary;
  } catch (error) {
    console.error('Error parsing itinerary response:', error);
    throw new Error('Failed to parse itinerary response');
  }
}

function parseActivities(dayText: string): Array<{ time: string; activity: string; location?: string }> {
  const activities: Array<{ time: string; activity: string; location?: string }> = [];
  
  // Remove the "Day X" header
  const content = dayText.replace(/^day \d+:?\s*/i, '');
  
  // Split into individual activities
  const activityLines = content.split(/(?=\d{1,2}:\d{2}\s*(?:AM|PM|am|pm)?)/);
  
  activityLines.forEach(line => {
    const timeMatch = line.match(/(\d{1,2}:\d{2}\s*(?:AM|PM|am|pm)?)/i);
    if (timeMatch) {
      const time = timeMatch[1];
      let activity = line.replace(timeMatch[0], '').trim();
      
      // Remove bullet points and dashes
      activity = activity.replace(/^[-•:]\s*/, '');
      
      // Extract location if present
      let location: string | undefined;
      const locationMatch = activity.match(/📍\s*([^\.]+)/) || 
                          activity.match(/\(([^)]+)\)/) || 
                          activity.match(/at\s+([^\.]+)/) ||
                          activity.match(/in\s+([^\.]+)/);
      
      if (locationMatch) {
        location = locationMatch[1].trim();
        activity = activity.replace(/📍\s*[^\.]+/, '').trim();
      }
      
      if (activity) {
        activities.push({
          time: standardizeTime(time),
          activity,
          location
        });
      }
    }
  });
  
  return activities;
}

function standardizeTime(time: string): string {
  // Convert time to 12-hour format with AM/PM
  const timeMatch = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)?/i);
  if (timeMatch) {
    let [_, hours, minutes, meridiem] = timeMatch;
    let hour = parseInt(hours);
    
    // If no AM/PM is provided, make assumptions based on hour
    if (!meridiem) {
      meridiem = hour >= 5 && hour < 12 ? 'AM' : 'PM';
    }
    
    meridiem = meridiem.toUpperCase();
    
    // Convert to 12-hour format
    if (meridiem === 'PM' && hour < 12) hour += 12;
    if (meridiem === 'AM' && hour === 12) hour = 0;
    
    // Format back to string
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes.padStart(2, '0')} ${meridiem}`;
  }
  return time; // Return original if no match
}

function formatBudget(budgetText: string): string {
  // Remove any markdown formatting
  let budget = budgetText.replace(/^#+\s*/, '');
  
  // Split into lines and filter out empty ones
  const lines = budget.split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.toLowerCase().startsWith('budget'));
  
  // Join with proper formatting
  return lines.join('\n');
}

export function estimateTripCost(itinerary: Itinerary): string {
  // Add cost estimation logic here if needed
  return itinerary.estimatedBudget;
} 