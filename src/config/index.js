const gameLevels = [
  { level: "easy", rows: 4, columns: 4, name: "4x4", peekTime: 5 },
  { level: "medium", rows: 6, columns: 6, name: "6x6", peekTime: 10 },
  { level: "hard", rows: 8, columns: 8, name: "8x8", peekTime: 15 },
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

export { gameLevels, birds };
