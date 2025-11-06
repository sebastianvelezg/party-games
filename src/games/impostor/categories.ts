export interface Category {
  id: string;
  name: string;
  icon: string;
  words: string[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'animals',
    name: 'Animals',
    icon: 'paw',
    words: [
      'Dog', 'Cat', 'Elephant', 'Lion', 'Tiger', 'Bear',
      'Monkey', 'Giraffe', 'Zebra', 'Penguin', 'Dolphin', 'Shark',
      'Eagle', 'Owl', 'Parrot', 'Snake', 'Crocodile', 'Turtle',
      'Rabbit', 'Squirrel', 'Fox', 'Wolf', 'Deer', 'Kangaroo',
      'Koala', 'Panda', 'Gorilla', 'Cheetah', 'Leopard', 'Rhino',
    ],
  },
  {
    id: 'movies',
    name: 'Movies',
    icon: 'film',
    words: [
      'Titanic', 'Avatar', 'Inception', 'The Matrix', 'Jurassic Park', 'Star Wars',
      'Harry Potter', 'The Godfather', 'Frozen', 'Toy Story', 'Finding Nemo', 'Shrek',
      'The Lion King', 'Aladdin', 'The Avengers', 'Iron Man', 'Spider-Man', 'Batman',
      'Superman', 'Wonder Woman', 'Black Panther', 'Captain America', 'Thor', 'Hulk',
      'Gladiator', 'Rocky', 'Rambo', 'Terminator', 'Alien', 'Predator',
    ],
  },
  {
    id: 'food',
    name: 'Food & Drinks',
    icon: 'restaurant',
    words: [
      'Pizza', 'Burger', 'Pasta', 'Sushi', 'Tacos', 'Sandwich',
      'Ice Cream', 'Chocolate', 'Cake', 'Cookie', 'Donut', 'Pancake',
      'Coffee', 'Tea', 'Water', 'Juice', 'Soda', 'Wine',
      'Beer', 'Salad', 'Soup', 'Rice', 'Noodles', 'Bread',
      'Cheese', 'Chicken', 'Beef', 'Fish', 'Shrimp', 'Lobster',
    ],
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: 'football',
    words: [
      'Soccer', 'Basketball', 'Tennis', 'Baseball', 'Volleyball', 'Swimming',
      'Running', 'Cycling', 'Boxing', 'Wrestling', 'Golf', 'Hockey',
      'Rugby', 'Cricket', 'Badminton', 'Table Tennis', 'Skiing', 'Snowboarding',
      'Surfing', 'Skateboarding', 'Climbing', 'Gymnastics', 'Yoga', 'Karate',
      'Judo', 'Archery', 'Bowling', 'Darts', 'Pool', 'Chess',
    ],
  },
  {
    id: 'countries',
    name: 'Countries',
    icon: 'globe',
    words: [
      'USA', 'Canada', 'Mexico', 'Brazil', 'Argentina', 'Chile',
      'UK', 'France', 'Germany', 'Italy', 'Spain', 'Portugal',
      'Russia', 'China', 'Japan', 'Korea', 'India', 'Thailand',
      'Australia', 'New Zealand', 'Egypt', 'South Africa', 'Kenya', 'Morocco',
      'Turkey', 'Greece', 'Poland', 'Netherlands', 'Belgium', 'Switzerland',
    ],
  },
  {
    id: 'professions',
    name: 'Professions',
    icon: 'briefcase',
    words: [
      'Doctor', 'Nurse', 'Teacher', 'Engineer', 'Lawyer', 'Architect',
      'Chef', 'Artist', 'Musician', 'Actor', 'Writer', 'Journalist',
      'Police Officer', 'Firefighter', 'Pilot', 'Scientist', 'Programmer', 'Designer',
      'Photographer', 'Veterinarian', 'Dentist', 'Accountant', 'Mechanic', 'Electrician',
      'Plumber', 'Builder', 'Farmer', 'Fisherman', 'Barber', 'Tailor',
    ],
  },
  {
    id: 'objects',
    name: 'Everyday Objects',
    icon: 'cube',
    words: [
      'Phone', 'Computer', 'TV', 'Camera', 'Watch', 'Glasses',
      'Book', 'Pen', 'Paper', 'Backpack', 'Wallet', 'Keys',
      'Chair', 'Table', 'Bed', 'Lamp', 'Mirror', 'Clock',
      'Umbrella', 'Bottle', 'Cup', 'Plate', 'Fork', 'Knife',
      'Shoes', 'Hat', 'Shirt', 'Pants', 'Jacket', 'Bag',
    ],
  },
  {
    id: 'places',
    name: 'Places',
    icon: 'location',
    words: [
      'Beach', 'Mountain', 'Forest', 'Desert', 'Ocean', 'Lake',
      'Park', 'Zoo', 'Museum', 'Library', 'School', 'Hospital',
      'Restaurant', 'Cafe', 'Store', 'Mall', 'Airport', 'Train Station',
      'Hotel', 'Cinema', 'Theater', 'Stadium', 'Gym', 'Pool',
      'Church', 'Temple', 'Mosque', 'Castle', 'Bridge', 'Tower',
    ],
  },
];

export const getCategoryById = (id: string): Category | undefined => {
  return CATEGORIES.find((cat) => cat.id === id);
};

export const getRandomWord = (categoryId: string): string | null => {
  const category = getCategoryById(categoryId);
  if (!category || category.words.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * category.words.length);
  return category.words[randomIndex];
};
