// Bare pizza price
export const BARE_PIZZA_PRICE = 200;

// Size
export const pizzaSizes = [
  { slug: "size30", name: "30 см", price: 0 },
  { slug: "size35", name: "35 см", price: 50 },
];

// Dough
export const doughTypes = [
  { slug: "thin", name: "Тонкое" },
  { slug: "puffy", name: "Пышное" },
];

// Sauce
export const sauceTypes = [
  { slug: "tomato", name: "Томатный", text: "под томатным соусом" },
  { slug: "white", name: "Белый", text: "под белым соусом" },
  { slug: "mayo", name: "Майонез", text: "под майонезом" },
  { slug: "spicy", name: "Острый", text: "с острыми ощущениями" },
  { slug: "mushroom", name: "Грибной", text: "под грибной заливкой" },
  { slug: "garlic", name: "Чесночный", text: "под чесночным соусом" },
  { slug: "sour", name: "Кисло-сладкий", text: "под кисло-сладким соусом" },
  { slug: "mustard", name: "Горчичный", text: "с горчичной заправкой" },
];

// Cheese
export const cheeseTypes = [
  { slug: "mozarella", name: "Моцарелла", price: 29 },
  { slug: "cheddar", name: "Чеддер", price: 29 },
  { slug: "dor_blue", name: "Дор блю", price: 29 },
];

// Vegetables
export const vegetableTypes = [
  { slug: "tomato", name: "Помидоры", price: 29 },
  { slug: "mushroom", name: "Грибы", price: 29 },
  { slug: "bell_pepper", name: "Перец", price: 29 },
];

// Meat
export const meatTypes = [
  { slug: "bacon", name: "Бекон", price: 29 },
  { slug: "pepperoni", name: "Пепперони", price: 29 },
  { slug: "ham", name: "Ветчина", price: 29 },
];

export const defaultPizzaValues = {
  pizzaSize: pizzaSizes[0].slug,
  doughType: doughTypes[0].slug,
  sauceType: sauceTypes[0].slug,
  // store IDs here
  cheeseType: [], // ["mozarella", "cheddar"]
  vegetableType: [], // ["tomato"]
  meatType: [], // ["ham", "bacon", "pepperoni"]
};
