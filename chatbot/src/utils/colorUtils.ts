/**
 * Returns a tailwind color class for a given mood
 */
export const getColorForMood = (mood: string): string => {
  const lowerMood = mood.toLowerCase();
  
  switch (lowerMood) {
    case 'happy':
    case 'excited':
      return 'green-500';
    case 'sad':
      return 'blue-400';
    case 'angry':
      return 'red-500';
    case 'anxious':
      return 'yellow-500';
    case 'relaxed':
      return 'teal-400';
    case 'confused':
      return 'purple-400';
    case 'overwhelmed':
      return 'orange-500';
    default:
      return 'gray-500';
  }
};

/**
 * Returns a tailwind color class for a given mental health condition
 */
export const getColorForMentalHealth = (condition: string): string => {
  const lowerCondition = condition.toLowerCase();
  
  switch (lowerCondition) {
    case 'anxiety':
      return 'yellow-600';
    case 'depression':
      return 'blue-600';
    case 'stress':
    case 'burnout':
      return 'orange-600';
    case 'loneliness':
      return 'purple-600';
    default:
      return 'gray-600';
  }
};