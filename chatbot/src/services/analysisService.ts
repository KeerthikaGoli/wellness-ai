import { MessageAnalysis } from '../types';

// Keyword sets for mental health condition detection
const mentalHealthKeywords = {
  anxiety: ['anxious', 'anxiety', 'nervous', 'worry', 'worried', 'panic', 'fear', 'scared', 'overthinking', 'stress', 'stressed'],
  depression: ['depressed', 'depression', 'sad', 'hopeless', 'empty', 'numb', 'unhappy', 'miserable', 'worthless', 'tired', 'exhausted', 'no motivation', 'no energy'],
  stress: ['stressed', 'overwhelmed', 'burnout', 'burned out', 'pressure', 'workload', 'overworked', 'deadline', 'too much', 'exhausted', 'stress'],
  loneliness: ['lonely', 'alone', 'isolated', 'no friends', 'no one to talk to', 'abandoned', 'disconnected', 'solitude', 'by myself']
};

// Keyword sets for mood detection
const moodKeywords = {
  happy: ['happy', 'joy', 'glad', 'great', 'good', 'excellent', 'amazing', 'wonderful', 'fantastic', 'excited', 'positive', 'blessed'],
  sad: ['sad', 'down', 'blue', 'upset', 'unhappy', 'heartbroken', 'disappointed', 'depressed', 'miserable', 'gloomy'],
  angry: ['angry', 'mad', 'frustrated', 'annoyed', 'irritated', 'furious', 'rage', 'upset', 'outraged', 'bitter'],
  anxious: ['anxious', 'nervous', 'tense', 'worried', 'scared', 'fearful', 'panic', 'uneasy', 'restless', 'apprehensive'],
  relaxed: ['relaxed', 'calm', 'peaceful', 'chilled', 'serene', 'tranquil', 'content', 'composed', 'mellow'],
  confused: ['confused', 'unsure', 'uncertain', 'puzzled', 'lost', 'perplexed', 'bewildered', 'disoriented', "don't know"],
  overwhelmed: ['overwhelmed', 'stressed', 'swamped', 'burdened', 'overloaded', 'struggling', 'too much', 'can\'t handle']
};

// Dynamic response templates based on context and severity
const responseTemplates = {
  anxiety: {
    mild: [
      "I notice a bit of anxiety in your message. Have you tried taking a few deep breaths? It's a simple but effective way to calm your mind.",
      "Sometimes anxiety can creep up on us. Would you like to explore what might be triggering these feelings?",
      "A touch of anxiety is perfectly normal. Let's work through this together - what helps you feel grounded?"
    ],
    moderate: [
      "I can hear the anxiety in your words. Remember that you've handled anxious moments before, and you can handle this too.",
      "Anxiety can feel overwhelming, but you're not alone in this. What specific worries are on your mind right now?",
      "When anxiety builds up, it's important to take care of yourself. Have you tried any relaxation techniques today?"
    ],
    severe: [
      "I hear how intense your anxiety is right now. If you're comfortable, let's break down what's happening step by step.",
      "This sounds really challenging. Have you considered reaching out to a mental health professional? They can provide specialized support for managing anxiety.",
      "When anxiety is this strong, sometimes we need to focus on just the next few minutes. What's one small thing we could do right now to help you feel a bit safer?"
    ]
  },
  depression: {
    mild: [
      "I'm noticing some down feelings in your message. What's been on your mind lately?",
      "Even small steps count on harder days. What's one tiny thing you could do for yourself today?",
      "It's okay to have low moments. Would you like to talk about what might help lift your spirits?"
    ],
    moderate: [
      "I hear how difficult things have been. Depression can make everything feel harder, but you're not alone in this.",
      "Your feelings are valid, and it's brave of you to share them. What kind of support would be most helpful right now?",
      "Sometimes depression can cloud our view of things. Can we explore what might bring a small ray of light to your day?"
    ],
    severe: [
      "I'm really concerned about how you're feeling. Have you considered talking to a mental health professional? They're trained to help with these intense feelings.",
      "You don't have to carry this heavy burden alone. Would you feel comfortable reaching out to someone you trust today?",
      "When things feel this dark, please remember that help is available. Would you like information about crisis support services?"
    ]
  }
};

// Contextual follow-up questions based on previous interactions
const followUpQuestions = {
  general: [
    "How long have you been feeling this way?",
    "What has helped you cope with similar feelings in the past?",
    "Would you like to explore these feelings a bit more?",
    "On a scale of 1-10, how intense would you say these feelings are right now?",
    "Have you noticed any patterns in when these feelings come up?"
  ],
  progress: [
    "How does this compare to how you were feeling yesterday?",
    "What's one small positive change you've noticed recently?",
    "What strategies have you found most helpful so far?",
    "Would you like to set a small goal for tomorrow?"
  ],
  support: [
    "Who in your life knows about what you're going through?",
    "What kind of support would be most helpful right now?",
    "Have you considered talking to a mental health professional about this?",
    "What resources or tools would help you feel more supported?"
  ]
};

// Activity suggestions based on mood and energy level
const activitySuggestions = {
  lowEnergy: [
    "Take a gentle 5-minute stretch break",
    "Listen to a calming playlist",
    "Write down three things you can see, hear, and feel right now",
    "Take a few slow, deep breaths",
    "Drink a glass of water mindfully"
  ],
  moderateEnergy: [
    "Go for a short walk outside",
    "Do a quick tidying task",
    "Call or message a friend",
    "Try a simple breathing exercise",
    "Write in a journal for 10 minutes"
  ],
  highEnergy: [
    "Try a workout or dance session",
    "Tackle a project you've been putting off",
    "Organize a space in your home",
    "Practice a hobby you enjoy",
    "Connect with friends or family"
  ]
};

/**
 * Analyzes text for mental health conditions with keyword counting
 */
export const analyzeMentalHealth = (text: string): string | null => {
  const lowerText = text.toLowerCase();
  const conditionCounts = new Map<string, number>();
  
  // Count occurrences for each condition's keywords
  Object.entries(mentalHealthKeywords).forEach(([condition, keywords]) => {
    const count = keywords.reduce((acc, keyword) => {
      const regex = new RegExp(keyword, 'g');
      const matches = lowerText.match(regex);
      return acc + (matches ? matches.length : 0);
    }, 0);
    
    if (count > 0) {
      conditionCounts.set(condition, count);
    }
  });
  
  // Only return condition if we have significant matches
  if (conditionCounts.size === 0) return null;
  
  // Get condition with highest count
  const [highestCondition] = [...conditionCounts.entries()].sort((a, b) => b[1] - a[1]);
  
  // Require at least 3 keyword matches for a condition to be detected
  return highestCondition[1] >= 3
    ? highestCondition[0].charAt(0).toUpperCase() + highestCondition[0].slice(1)
    : null;
};

/**
 * Analyzes text for mood with keyword counting
 */
export const analyzeMood = (text: string): string | null => {
  const lowerText = text.toLowerCase();
  const moodCounts = new Map<string, number>();
  
  // Count occurrences for each mood's keywords
  Object.entries(moodKeywords).forEach(([mood, keywords]) => {
    const count = keywords.reduce((acc, keyword) => {
      const regex = new RegExp(keyword, 'g');
      const matches = lowerText.match(regex);
      return acc + (matches ? matches.length : 0);
    }, 0);
    
    if (count > 0) {
      moodCounts.set(mood, count);
    }
  });
  
  // Only return mood if we have significant matches
  if (moodCounts.size === 0) return null;
  
  // Get mood with highest count
  const [highestMood] = [...moodCounts.entries()].sort((a, b) => b[1] - a[1]);
  
  // Require at least 2 keyword matches for a mood to be detected
  return highestMood[1] >= 2
    ? highestMood[0].charAt(0).toUpperCase() + highestMood[0].slice(1)
    : null;
};

/**
 * Determines response severity based on keyword frequency and intensity
 */
const determineSeverity = (text: string, condition: string): 'mild' | 'moderate' | 'severe' => {
  const lowerText = text.toLowerCase();
  const intensifiers = ['very', 'really', 'extremely', 'so', 'too', 'much', 'always', 'never'];
  const urgentPhrases = ["can't take it", "can't handle", "need help", "hopeless", "giving up"];
  
  let severityScore = 0;
  
  // Check for intensifiers
  intensifiers.forEach(word => {
    if (lowerText.includes(word)) severityScore += 1;
  });
  
  // Check for urgent phrases
  urgentPhrases.forEach(phrase => {
    if (lowerText.includes(phrase)) severityScore += 2;
  });
  
  // Check keyword frequency
  const keywords = mentalHealthKeywords[condition.toLowerCase() as keyof typeof mentalHealthKeywords] || [];
  const keywordCount = keywords.reduce((acc, keyword) => {
    const regex = new RegExp(keyword, 'g');
    const matches = lowerText.match(regex);
    return acc + (matches ? matches.length : 0);
  }, 0);
  
  severityScore += keywordCount;
  
  if (severityScore >= 5) return 'severe';
  if (severityScore >= 3) return 'moderate';
  return 'mild';
};

/**
 * Generates a dynamic response based on user message and analysis
 */
export const generateResponse = (
  userMessage: string, 
  analysis: Partial<MessageAnalysis>
): string => {
  let response = '';
  
  // Add empathetic acknowledgment
  const acknowledgments = [
    "I hear you, and what you're feeling is valid. ",
    "Thank you for sharing that with me. ",
    "I appreciate you opening up about this. ",
    "It takes courage to express these feelings. ",
    "I'm here to listen and support you. "
  ];
  response += acknowledgments[Math.floor(Math.random() * acknowledgments.length)];
  
  // Add condition-specific response if detected
  if (analysis.mentalHealth) {
    const severity = determineSeverity(userMessage, analysis.mentalHealth);
    const condition = analysis.mentalHealth.toLowerCase() as keyof typeof responseTemplates;
    
    if (responseTemplates[condition]) {
      const templates = responseTemplates[condition][severity];
      response += templates[Math.floor(Math.random() * templates.length)] + " ";
    }
  }
  
  // Add mood-specific support if detected
  if (analysis.mood) {
    const mood = analysis.mood.toLowerCase();
    const energyLevel = ['happy', 'excited', 'angry'].includes(mood) ? 'highEnergy' :
                       ['relaxed', 'confused'].includes(mood) ? 'moderateEnergy' : 'lowEnergy';
    
    const activities = activitySuggestions[energyLevel as keyof typeof activitySuggestions];
    response += `\n\nHere's a suggestion: ${activities[Math.floor(Math.random() * activities.length)]}. `;
  }
  
  // Add appropriate follow-up question
  const questionType = analysis.mentalHealth ? 'support' : 
                      analysis.mood ? 'progress' : 'general';
  const questions = followUpQuestions[questionType as keyof typeof followUpQuestions];
  response += "\n\n" + questions[Math.floor(Math.random() * questions.length)];
  
  return response;
};