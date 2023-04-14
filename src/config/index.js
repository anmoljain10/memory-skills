const gameLevels = [
  {
    level: "easy",
    rows: 4,
    columns: 4,
    name: "4x4",
    peekTime: 15,
    gameOverTime: 40,
  },
  {
    level: "hard",
    rows: 6,
    columns: 6,
    name: "6x6",
    peekTime: 20,
    gameOverTime: 90,
  },
];

const birds = [
  { name: "sparrow", url: "birds/sparrow.png" },
  { name: "baby-bird", url: "birds/babybird.png" },
  { name: "pelican", url: "birds/pelican.png" },
  { name: "crow", url: "birds/crow.jpeg" },
  { name: "cute-bird", url: "birds/cute-bird.png" },
  { name: "eagle", url: "birds/eagle.png" },
  { name: "hummingbird", url: "birds/hummingbird.png" },
  { name: "angrybird", url: "birds/angrybird.jpeg" },
  { name: "kingfisher", url: "birds/kingfisher.png" },
  { name: "nabird", url: "birds/nabird.webp" },
  { name: "parrot", url: "birds/parrot.png" },
  { name: "hawk", url: "birds/hawk.png" },
];

const animals = [
  { name: "tiger", url: "animals/tiger.png" },
  { name: "camel", url: "animals/camel.png" },
  { name: "dog", url: "animals/dog.png" },
  { name: "gorilla", url: "animals/gorilla.png" },
  { name: "koala", url: "animals/koala.png" },
  { name: "lamb", url: "animals/lamb.png" },
  { name: "lion", url: "animals/lion.png" },
  { name: "pig", url: "animals/pig.png" },
  { name: "raqoon", url: "animals/raqoon.png" },
  { name: "squirrel", url: "animals/squirrel.png" },
  { name: "leopard", url: "animals/leopard.png" },
];

const cars = [
  { name: "audi-3", url: "cars/audi-3.png" },
  { name: "bentley", url: "cars/bentley.png" },
  { name: "black", url: "cars/black.png" },
  { name: "fake", url: "cars/fake.png" },
  { name: "lambo", url: "cars/lambo.png" },
  { name: "mercedes", url: "cars/mercedes.png" },
  { name: "mustang", url: "cars/mustang.png" },
  { name: "nissan", url: "cars/nissan.png" },
  { name: "red", url: "cars/red.png" },
  { name: "suv", url: "cars/suv.png" },
  { name: "taxi", url: "cars/taxi.png" },
  { name: "red-supercar", url: "cars/red-supercar.png" },
  { name: "white-supercar", url: "cars/white-supercar.png" },
  { name: "yellow-lambo", url: "cars/yellow-lambo.png" },
  { name: "green-mercedes", url: "cars/green-mercedes.png" },
];

const random = [
  { name: "earth", url: "random/earth.png" },
  { name: "family", url: "random/family.png" },
  { name: "gift", url: "random/gift.png" },
  { name: "japan", url: "random/japan.png" },
  { name: "pacman", url: "random/pacman.png" },
  { name: "leaf", url: "random/leaf.png" },
  { name: "mustang", url: "cars/mustang.png" },
  { name: "santa", url: "random/santa.png" },
  { name: "scene", url: "random/scene.png" },
  { name: "thumb", url: "random/thumb.png" },
  { name: "work", url: "random/work.png" },
];

const food = [
  { name: "food-1", url: "food/food-1.png" },
  { name: "food-2", url: "food/food-2.png" },
  { name: "food-3", url: "food/food-3.png" },
  { name: "food-4", url: "food/food-4.png" },
  { name: "food-5", url: "food/food-5.png" },
  { name: "food-6", url: "food/food-6.png" },
  { name: "food-7", url: "food/food-7.png" },
  { name: "food-8", url: "food/food-8.png" },
  { name: "food-9", url: "food/food-9.png" },
  { name: "food-10", url: "food/food-10.png" },
  { name: "food-11", url: "food/food-11.png" },
  { name: "food-12", url: "food/food-12.png" },
  { name: "food-13", url: "food/food-13.png" },
  { name: "food-14", url: "food/food-14.png" },
];

const blockTypeData = {
  animals: animals,
  birds: birds,
  cars: cars,
  random: random,
  food: food,
};

const allBlockTypes = ["animals", "birds", "cars", "random", "food"];

export { gameLevels, birds, animals, cars, food, blockTypeData, allBlockTypes };
