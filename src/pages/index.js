import Head from "next/head";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { gameLevels, birds } from "@/config";
import Block from "@/components/block";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [gameLevel, setGameLevel] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [gameStarted, startGame] = useState(false);
  useEffect(() => {
    let gameCards = [];
    const totalCount = 2;
    let blockSetCount = 0;
    let assetIndex = 0;
    if (gameLevel !== null) {
      for (let cell = 0; cell < gameLevel.rows * gameLevel.columns; cell++) {
        gameCards.push({
          id: `${cell + 1}`,
          value: birds[assetIndex],
          title: `${cell + 1}`,
        });
        if (blockSetCount < totalCount) {
          blockSetCount = blockSetCount + 1;
        }
        if (blockSetCount === totalCount) {
          blockSetCount = 0;
          assetIndex = assetIndex + 1;
          if (assetIndex === birds.length) {
            assetIndex = 0;
          }
        }
      }
      const shuffledArray = shuffle(gameCards);
      setBlocks(shuffledArray);
    }
  }, [gameLevel]);

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  return (
    <>
      <div class="container mx-auto  h-screen">
        <h1 class="text-3xl font-bold mx-auto">Memory skills!</h1>
        <h2>{gameLevel?.name}</h2>
        {gameLevel === null && (
          <>
            <h1>Select Level</h1>
            {gameLevels.map((item, index) => {
              return (
                <li>
                  <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setGameLevel(item)}
                  >
                    {item.level}
                  </button>
                </li>
              );
            })}
          </>
        )}

        {gameLevel !== null && (
          <>
            <div
              style={{
                display: "flex",
                maxWidth: `${100 * gameLevel?.rows}px`,
                maxHeight: `${100 * gameLevel?.rows}px`,
                flexWrap: "wrap",
              }}
            >
              {blocks.map((item, index) => {
                const { value, title, id } = item;
                return (
                  <Block
                    title={title}
                    value={value}
                    id={id}
                    gameStarted={gameStarted}
                  />
                );
              })}
            </div>
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => startGame(true)}
            >
              {gameStarted ? "Stop" : "Start"}
            </button>
          </>
        )}
      </div>
    </>
  );
}
