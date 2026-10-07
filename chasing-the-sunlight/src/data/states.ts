export interface StateData {
  name: string;
  code: string;
  date: string | null;
  location: string | null;
  photos: {
    featured: string;
    additional: string[];
    captions?: string[];
  } | null;
  reflection: string | null;
  status: 'completed' | 'in-progress' | 'pending';
}

export const statesData: StateData[] = [
  {
    name: 'Hawaii',
    code: 'HI',
    date: '2025-11-10',
    location: 'Waikiki Beach, HI',
    photos: {
      featured: '/src/assets/hawaii-sunset.jpg',
      additional: ['/src/assets/dad-sunset-1.jpg', '/src/assets/dad-sunset-2.jpg'],
      captions: ['Golden hour over the Pacific, watching the sky transform', 'The final moments before darkness, peaceful and reflective']
    },
    reflection: 'Sailboats dotted the horizon as the sun melted into the Pacific. The warmth of the islands reminded me that beauty can be found even in the midst of grief.',
    status: 'completed',
  },
  // Remaining states as pending
  { name: 'Alabama', code: 'AL', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'Alaska', code: 'AK', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'Arizona', code: 'AZ', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'Arkansas', code: 'AR', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'California', code: 'CA', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'Colorado', code: 'CO', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'Connecticut', code: 'CT', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'Delaware', code: 'DE', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'Florida', code: 'FL', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'Georgia', code: 'GA', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'Idaho', code: 'ID', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'Illinois', code: 'IL', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'Indiana', code: 'IN', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'Iowa', code: 'IA', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'Kansas', code: 'KS', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'Kentucky', code: 'KY', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'Louisiana', code: 'LA', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'Maine', code: 'ME', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'Maryland', code: 'MD', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  {
    name: 'Massachusetts',
    code: 'MA',
    date: '2025-01-15',
    location: 'Massachusetts',
    photos: {
      featured: '/src/assets/massachusetts-sunset.jpg',
      additional: [],
      captions: []
    },
    reflection: 'A breathtaking display of pink and violet clouds painted the winter sky. The silhouettes of trees and homes stood witness to nature\'s evening masterpiece, a reminder that beauty finds us even in the coldest seasons.',
    status: 'completed',
  },
  { name: 'Michigan', code: 'MI', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'Minnesota', code: 'MN', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  {
    name: 'Mississippi',
    code: 'MS',
    date: '2024-11-15',
    location: 'Gulf Coast, MS',
    photos: {
      featured: '/src/assets/mississippi-sunset.jpg',
      additional: [],
      captions: []
    },
    reflection: 'The golden hour painted the Gulf Coast in warmth as palm trees swayed in the breeze. The bridge stretched across the water like a path to tomorrow, reminding me that journeys connect us to what matters most.',
    status: 'completed',
  },
  { name: 'Missouri', code: 'MO', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'Montana', code: 'MT', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'Nebraska', code: 'NE', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'Nevada', code: 'NV', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'New Hampshire', code: 'NH', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'New Jersey', code: 'NJ', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'New Mexico', code: 'NM', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'New York', code: 'NY', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'North Carolina', code: 'NC', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'North Dakota', code: 'ND', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'Ohio', code: 'OH', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'Oklahoma', code: 'OK', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'Oregon', code: 'OR', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'Pennsylvania', code: 'PA', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'Rhode Island', code: 'RI', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'South Carolina', code: 'SC', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'South Dakota', code: 'SD', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'Tennessee', code: 'TN', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'Texas', code: 'TX', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'Utah', code: 'UT', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'Vermont', code: 'VT', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'Virginia', code: 'VA', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'Washington', code: 'WA', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'West Virginia', code: 'WV', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'Wisconsin', code: 'WI', date: null, location: null, photos: null, reflection: null, status: 'pending' },
  { name: 'Wyoming', code: 'WY', date: null, location: null, photos: null, reflection: null, status: 'pending' },
];
