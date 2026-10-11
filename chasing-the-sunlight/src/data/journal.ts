export interface JournalPost {
  id: string;
  title: string;
  location: string;
  state: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  photos?: string[];
  relatedStateCode?: string;
}

export const journalPosts: JournalPost[] = [
  {
    id: '1',
    title: 'The First Sunset',
    location: 'Phoenix, Arizona',
    state: 'Arizona',
    date: '2025-10-12',
    excerpt: 'Starting this journey in the desert, where the sky blazes with color and Dad\'s memory feels closest.',
    content: `Standing in the Arizona desert, I watched my first sunset of this journey. The sky turned shades I didn't know existed—deep oranges bleeding into purples, all silhouetted by towering saguaros.

Dad always said the desert had a soul. I never quite understood what he meant until today. As the sun dipped below the horizon, I felt his presence in the warm evening breeze, in the way the light touched everything it reached.

This trip is for you, Dad. Every sunset, every mile, every moment of beauty I find along the way. You taught me to never forget to look up, and I never will.`,
    tags: ['memory', 'Arizona', 'beginning'],
  },
  {
    id: '2',
    title: 'Mountain High',
    location: 'Rocky Mountain National Park, Colorado',
    state: 'Colorado',
    date: '2025-10-18',
    excerpt: 'The mountains hold memories in their peaks, and tonight they shared them with me.',
    content: `Six days and countless miles later, I found myself in Dad's favorite place—the mountains. He always said there was something about elevation that made everything clearer, both the view and your thoughts.

Tonight's sunset painted the Rocky Mountain peaks in shades of pink and gold. I sat on a boulder, the same kind of spot where Dad would park his old truck, and I understood. Up here, closer to the sky, the grief feels different. Lighter, somehow. Not gone, but transformed into something I can carry.

A fellow traveler stopped and asked what I was photographing. When I told them about this project, they shared that they lost their father too. We sat together in silence, watching the light fade. Sometimes that's all you need—shared understanding and a beautiful sunset.`,
    tags: ['Colorado', 'mountains', 'connection'],
  },
  {
    id: '3',
    title: 'Road Notes: Days 1-10',
    location: 'Somewhere between Arizona and Colorado',
    state: 'Multiple',
    date: '2025-10-20',
    excerpt: 'Reflections from the first leg of the journey—what I\'ve learned, what I\'ve felt, and what keeps me going.',
    content: `Ten days on the road. Two states down, forty-eight to go.

I've learned that gas station coffee tastes better when you're chasing something meaningful. That sunrise and sunset bookend each day with hope. That strangers are kinder than you expect when you tell them you're on a journey of remembrance.

The van's handling well, though it creaks in a way that reminds me of Dad's old truck. I swear sometimes I can hear him laughing at my playlist choices. He was more of a classic rock guy, but I think he'd appreciate the folk music that's been my companion.

I'm learning to sit with the quiet. To let the grief come and go like the changing landscapes outside my window. Each sunset isn't just a photo—it's a conversation, a moment of connection, a way to say "I'm still here, and I still remember."

Next up: heading north through the heartland. More sunsets, more stories, more miles. For you, Dad. Always for you.`,
    tags: ['reflection', 'road trip', 'journey'],
  },
];
