
export const sample_foods: any[]=[
  {
    id:'1',
    nom: 'Pizza Pepperoni',
    tempsCuisson: '10-20',
    prix: 10,
    favori: false,
    origins: ['italy'],
    stars: 4.5,
    imageUrl: 'assets/food-1.jpg',
    tags: ['FastFood', 'Pizza', 'Lunch'],
  },
  {
    id:'2',
    nom: 'Meatball',
    prix: 20,
    tempsCuisson: '20-30',
    favori: true,
    origins: ['persia', 'middle east', 'china'],
    stars: 4.7,
    imageUrl: 'assets/food-2.jpg',
    tags: ['SlowFood', 'Lunch'],
  },
  {
    id:'3',
    nom: 'Hamburger',
    prix: 5,
    tempsCuisson: '10-15',
    favori: false,
    origins: ['germany', 'us'],
    stars: 3.5,
    imageUrl: 'assets/food-3.jpg',
    tags: ['FastFood', 'Hamburger'],
  },
  {
    id:'4',
    nom: 'Fried Potatoes',
    prix: 2,
    tempsCuisson: '15-20',
    favori: true,
    origins: ['belgium', 'france'],
    stars: 3.3,
    imageUrl: 'assets/food-4.jpg',
    tags: ['FastFood', 'Fry'],
  },
  {
    id:'5',
    nom: 'Chicken Soup',
    prix: 11,
    tempsCuisson: '40-50',
    favori: false,
    origins: ['india', 'asia'],
    stars: 3.0,
    imageUrl: 'assets/food-5.jpg',
    tags: ['SlowFood', 'Soup'],
  },
  {
    id:'6',
    nom: 'Vegetables Pizza',
    prix: 9,
    tempsCuisson: '40-50',
    favori: false,
    origins: ['italy'],
    stars: 4.0,
    imageUrl: 'assets/food-6.jpg',
    tags: ['FastFood', 'Pizza', 'Lunch'],
  },
]


export const sample_tags:any[] = [
  { nom: 'All', count: 6 },
  { nom: 'FastFood', count: 4 },
  { nom: 'Pizza', count: 2 },
  { nom: 'Lunch', count: 3 },
  { nom: 'SlowFood', count: 2 },
  { nom: 'Hamburger', count: 1 },
  { nom: 'Fry', count: 1 },
  { nom: 'Soup', count: 1 },
]


export const sample_users: any[] = [
  {
    nom: "John Doe",
    email: "john@gmail.com",
    password: "12345",
    address: "Toronto On",
    isAdmin: true,
  },
  {
    nom: "Jane Doe",
    email: "Jane@gmail.com",
    password: "12345",
    address: "Shanghai",
    isAdmin: false,
  },
];