const gameLevels = [
  {
    level: "easy",
    rows: 4,
    columns: 4,
    name: "4x4",
    peekTime: 10,
    gameOverTime: 30,
  },
  {
    level: "medium",
    rows: 6,
    columns: 6,
    name: "6x6",
    peekTime: 15,
    gameOverTime: 60,
  },
];

const birds = [
  { name: "sparrow", url: "birds/sparrow.png" },
  { name: "baby-bird", url: "birds/babybird.png" },
  { name: "pelican", url: "birds/pelican.png" },
  { name: "crow", url: "birds/crow.jpeg" },
  { name: "cute-bird", url: "birds/cute-bird.png" },
  { name: "eagle", url: "birds/eagle.png" },
  { name: "hummingbird", url: "birds/hummingbird.jpeg" },
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
];

const blockTypeData = {
  animals: animals,
  birds: birds,
  cars: cars,
};

export { gameLevels, birds, animals, cars, blockTypeData };
