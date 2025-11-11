const PERSONALITIES_API = 'https://16personalities-api.com';

export async function fetchMBTIQuestions() {
  try {
    const response = await fetch(`${PERSONALITIES_API}/questions`);
    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching MBTI questions:', error);
    // Fallback to local questions if API fails
    return getFallbackQuestions();
  }
}

// Fallback questions in case API is unavailable
function getFallbackQuestions() {
  return [
    // Extraversion vs Introversion (E/I)
    {
      id: 1,
      text: "You regularly make new friends.",
      dimension: "E/I",
      direction: 1
    },
    {
      id: 2,
      text: "You often get so lost in thoughts that you ignore or forget your surroundings.",
      dimension: "E/I",
      direction: -1
    },
    {
      id: 3,
      text: "You do not usually initiate conversations.",
      dimension: "E/I",
      direction: -1
    },
    {
      id: 4,
      text: "You are usually highly motivated and energetic.",
      dimension: "E/I",
      direction: 1
    },
    {
      id: 5,
      text: "You often feel as if you have to justify yourself to other people.",
      dimension: "E/I",
      direction: -1
    },
    {
      id: 6,
      text: "You are a relatively reserved and quiet person.",
      dimension: "E/I",
      direction: -1
    },
    {
      id: 7,
      text: "You rarely worry about whether you make a good impression on people you meet.",
      dimension: "E/I",
      direction: 1
    },
    {
      id: 8,
      text: "You enjoy vibrant social events with lots of people.",
      dimension: "E/I",
      direction: 1
    },
    {
      id: 9,
      text: "You prefer to be alone rather than surrounded by a lot of people.",
      dimension: "E/I",
      direction: -1
    },
    {
      id: 10,
      text: "You feel comfortable just walking up to someone you find interesting and striking up a conversation.",
      dimension: "E/I",
      direction: 1
    },
    {
      id: 11,
      text: "You avoid making phone calls and prefer texting or email instead.",
      dimension: "E/I",
      direction: -1
    },
    {
      id: 12,
      text: "After a long social event, you feel energized and ready for more activities.",
      dimension: "E/I",
      direction: 1
    },

    // Sensing vs Intuition (S/N)
    {
      id: 13,
      text: "You rarely do something just out of sheer curiosity.",
      dimension: "S/N",
      direction: -1
    },
    {
      id: 14,
      text: "You often contemplate the reasons for human existence.",
      dimension: "S/N",
      direction: 1
    },
    {
      id: 15,
      text: "You prefer to focus on the present moment rather than thinking about the future.",
      dimension: "S/N",
      direction: -1
    },
    {
      id: 16,
      text: "You are more interested in abstract theories than practical applications.",
      dimension: "S/N",
      direction: 1
    },
    {
      id: 17,
      text: "You trust facts and concrete information more than theories.",
      dimension: "S/N",
      direction: -1
    },
    {
      id: 18,
      text: "You enjoy exploring unconventional ideas and possibilities.",
      dimension: "S/N",
      direction: 1
    },
    {
      id: 19,
      text: "You prefer step-by-step instructions over figuring things out yourself.",
      dimension: "S/N",
      direction: -1
    },
    {
      id: 20,
      text: "You often think about how things could be improved or done differently.",
      dimension: "S/N",
      direction: 1
    },
    {
      id: 21,
      text: "You focus on what is rather than what could be.",
      dimension: "S/N",
      direction: -1
    },
    {
      id: 22,
      text: "You enjoy discussing philosophical and theoretical concepts.",
      dimension: "S/N",
      direction: 1
    },
    {
      id: 23,
      text: "You prefer hands-on experience over theoretical knowledge.",
      dimension: "S/N",
      direction: -1
    },
    {
      id: 24,
      text: "You often get caught up in daydreaming about future possibilities.",
      dimension: "S/N",
      direction: 1
    },

    // Thinking vs Feeling (T/F)
    {
      id: 25,
      text: "You find it easy to stay relaxed and focused even when there is some pressure.",
      dimension: "T/F",
      direction: 1
    },
    {
      id: 26,
      text: "You feel superior to other people.",
      dimension: "T/F",
      direction: 1
    },
    {
      id: 27,
      text: "Winning a debate matters less to you than making sure no one gets upset.",
      dimension: "T/F",
      direction: -1
    },
    {
      id: 28,
      text: "You worry too much about what other people think.",
      dimension: "T/F",
      direction: -1
    },
    {
      id: 29,
      text: "If you had a business, you would find it very difficult to fire loyal but underperforming employees.",
      dimension: "T/F",
      direction: -1
    },
    {
      id: 30,
      text: "Logic is usually more important than heart when it comes to making important decisions.",
      dimension: "T/F",
      direction: 1
    },
    {
      id: 31,
      text: "You often base your decisions on how they will affect other people's feelings.",
      dimension: "T/F",
      direction: -1
    },
    {
      id: 32,
      text: "You value truth over tact when giving feedback.",
      dimension: "T/F",
      direction: 1
    },
    {
      id: 33,
      text: "You find it difficult to give negative feedback even when it's necessary.",
      dimension: "T/F",
      direction: -1
    },
    {
      id: 34,
      text: "You believe compassion is more important than being right.",
      dimension: "T/F",
      direction: -1
    },
    {
      id: 35,
      text: "You can easily put your emotions aside when focusing on a task.",
      dimension: "T/F",
      direction: 1
    },
    {
      id: 36,
      text: "You prioritize maintaining harmony in relationships over being honest.",
      dimension: "T/F",
      direction: -1
    },

    // Judging vs Perceiving (J/P)
    {
      id: 37,
      text: "You try to respond to your emails as soon as possible.",
      dimension: "J/P",
      direction: 1
    },
    {
      id: 38,
      text: "Being organized is more important to you than being adaptable.",
      dimension: "J/P",
      direction: 1
    },
    {
      id: 39,
      text: "Your home and work environments are quite tidy.",
      dimension: "J/P",
      direction: 1
    },
    {
      id: 40,
      text: "You would rather improvise than spend time coming up with a detailed plan.",
      dimension: "J/P",
      direction: -1
    },
    {
      id: 41,
      text: "You usually prefer just doing what you feel like at any given moment instead of planning a particular daily routine.",
      dimension: "J/P",
      direction: -1
    },
    {
      id: 42,
      text: "You like to have a schedule and stick to it.",
      dimension: "J/P",
      direction: 1
    },
    {
      id: 43,
      text: "You often leave things to the last minute.",
      dimension: "J/P",
      direction: -1
    },
    {
      id: 44,
      text: "You prefer to finish projects well before the deadline.",
      dimension: "J/P",
      direction: 1
    },
    {
      id: 45,
      text: "You feel stressed when things are not organized and structured.",
      dimension: "J/P",
      direction: 1
    },
    {
      id: 46,
      text: "You enjoy keeping your options open rather than making firm commitments.",
      dimension: "J/P",
      direction: -1
    },
    {
      id: 47,
      text: "You make to-do lists and feel satisfaction from checking items off.",
      dimension: "J/P",
      direction: 1
    },
    {
      id: 48,
      text: "You adapt easily when plans change unexpectedly.",
      dimension: "J/P",
      direction: -1
    },

    // Mixed questions for balance
    {
      id: 49,
      text: "You often take initiative in social situations.",
      dimension: "E/I",
      direction: 1
    },
    {
      id: 50,
      text: "You enjoy analyzing patterns and finding underlying meanings.",
      dimension: "S/N",
      direction: 1
    },
    {
      id: 51,
      text: "You believe rules are meant to be followed strictly.",
      dimension: "T/F",
      direction: 1
    },
    {
      id: 52,
      text: "You prefer spontaneity over careful planning.",
      dimension: "J/P",
      direction: -1
    },
    {
      id: 53,
      text: "You need alone time to recharge after social interactions.",
      dimension: "E/I",
      direction: -1
    },
    {
      id: 54,
      text: "You rely on your instincts and gut feelings when making decisions.",
      dimension: "S/N",
      direction: 1
    },
    {
      id: 55,
      text: "You consider how your decisions will impact people emotionally.",
      dimension: "T/F",
      direction: -1
    },
    {
      id: 56,
      text: "You feel more comfortable with clear deadlines and expectations.",
      dimension: "J/P",
      direction: 1
    },
    {
      id: 57,
      text: "You enjoy being the center of attention.",
      dimension: "E/I",
      direction: 1
    },
    {
      id: 58,
      text: "You focus on practical solutions rather than theoretical possibilities.",
      dimension: "S/N",
      direction: -1
    },
    {
      id: 59,
      text: "You value efficiency over feelings when solving problems.",
      dimension: "T/F",
      direction: 1
    },
    {
      id: 60,
      text: "You thrive in flexible, unstructured environments.",
      dimension: "J/P",
      direction: -1
    }
  ];
}

// Calculate MBTI type from responses
export function calculateMBTI(responses) {
  const scores = {
    'E/I': 0,
    'S/N': 0,
    'T/F': 0,
    'J/P': 0
  };

  // Process each response
  responses.forEach(response => {
    const { dimension, direction, answer } = response;
    const score = answer * direction;
    scores[dimension] += score;
  });

  // Determine personality type
  const mbtiType = 
    (scores['E/I'] > 0 ? 'E' : 'I') +
    (scores['S/N'] > 0 ? 'N' : 'S') +
    (scores['T/F'] > 0 ? 'T' : 'F') +
    (scores['J/P'] > 0 ? 'J' : 'P');

  // Calculate percentages for each dimension
  const totalByDimension = {
    'E/I': responses.filter(r => r.dimension === 'E/I').length,
    'S/N': responses.filter(r => r.dimension === 'S/N').length,
    'T/F': responses.filter(r => r.dimension === 'T/F').length,
    'J/P': responses.filter(r => r.dimension === 'J/P').length
  };

  const percentages = {
    Extraversion: Math.round(((scores['E/I'] + totalByDimension['E/I'] * 2) / (2 * totalByDimension['E/I'] * 2)) * 100),
    Introversion: Math.round(((-scores['E/I'] + totalByDimension['E/I'] * 2) / (2 * totalByDimension['E/I'] * 2)) * 100),
    Intuition: Math.round(((scores['S/N'] + totalByDimension['S/N'] * 2) / (2 * totalByDimension['S/N'] * 2)) * 100),
    Sensing: Math.round(((-scores['S/N'] + totalByDimension['S/N'] * 2) / (2 * totalByDimension['S/N'] * 2)) * 100),
    Thinking: Math.round(((scores['T/F'] + totalByDimension['T/F'] * 2) / (2 * totalByDimension['T/F'] * 2)) * 100),
    Feeling: Math.round(((-scores['T/F'] + totalByDimension['T/F'] * 2) / (2 * totalByDimension['T/F'] * 2)) * 100),
    Judging: Math.round(((scores['J/P'] + totalByDimension['J/P'] * 2) / (2 * totalByDimension['J/P'] * 2)) * 100),
    Perceiving: Math.round(((-scores['J/P'] + totalByDimension['J/P'] * 2) / (2 * totalByDimension['J/P'] * 2)) * 100)
  };

  return {
    type: mbtiType,
    scores: percentages,
    rawScores: scores
  };
}