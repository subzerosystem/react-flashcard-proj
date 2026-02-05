/**
 * MOCK API DATA
 */

export const initialFlashcards = [
  {
    id: 1,
    front: "What is the capital of France?",
    back: "Paris",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    front: "Who wrote 'Romeo and Juliet'?",
    back: "William Shakespeare",
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    front: "What is the chemical symbol for water?",
    back: "H2O",
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    front: "How many continents are there?",
    back: "7 continents: Africa, Antarctica, Asia, Australia, Europe, North America, and South America",
    createdAt: new Date().toISOString()
  },
  {
    id: 5,
    front: "What planet is known as the Red Planet?",
    back: "Mars",
    createdAt: new Date().toISOString()
  }
];

export const mockUsers = [
  { username: "admin", password: "admin123" },
  { username: "student", password: "student123" },
  { username: "demo", password: "demo123" }
];
