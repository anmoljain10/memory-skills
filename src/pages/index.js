import { useEffect, useState, useRef } from "react";
import { gameLevels, birds } from "@/config";
import { shuffle } from "lodash";
import Board from "@/components/board";

export default function Home() {
  const [gameLevel, setGameLevel] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [gameStarted, startGame] = useState(false);
  const [timerStarted, startPeekTimer] = useState(false);
  const [peekTime, setPeekTime] = useState(10);
  const [score, setScore] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    if (timerStarted) {
      timer.current = setInterval(() => {
        setPeekTime((peekTime) => peekTime - 1);
      }, 1000);
    }
  }, [timerStarted]);

  useEffect(() => {
    if (peekTime === 0) {
      clearInterval(timer.current);
      startPeekTimer(false);
      startGame(true);
    }
  }, [peekTime]);

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
          found: false,
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
      setPeekTime(gameLevel.peekTime);
      setBlocks(shuffledArray);
    }
  }, [gameLevel]);

  function checkBlocks(selectedBlocks) {
    console.log(blocks);
    if (selectedBlocks.result === "FAIL") {
      setScore((score) => score - 1);
    } else {
      setScore((score) => score + 1);
      const updatedBlocks = blocks.map((item) => {
        if (
          item.value.id === selectedBlocks.block1.id ||
          item.value.id === selectedBlocks.block2.id
        ) {
          return { ...item, found: true };
        }
        return { ...item };
      });
      console.log(updatedBlocks, "updated");
      setBlocks(updatedBlocks);
    }
  }

  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom, #ffd700, #cda100, #ffcc00,  #cc9900)",
      }}
    >
      <div className="container mx-auto" style={{ minHeight: "100vh" }}>
        <h1
          className="mx-auto text-center text-purple text-8xl pt-4 font-bold"
          style={{ color: "#990099" }}
        >
          Memory skills
        </h1>
        {gameLevel === null && (
          <div class="w-1/3 mx-auto" style={{ marginTop: "10%" }}>
            <h2 className="text-center text-3xl mb-4">Select Level</h2>
            <div class="p-5 rounded" style={{ backgroundColor: "#4285F4" }}>
              <ul className="list-none text-white">
                {gameLevels.map((item, index) => {
                  return (
                    <li>
                      <div
                        className="font-bold py-2 px-4 rounded capitalize text-3xl text-center"
                        onClick={() => setGameLevel(item)}
                      >
                        {item.level} - {item.name}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
        {gameLevel !== null && blocks.length && (
          <div class="grid grid-cols-2 mt-10">
            <Board
              gameStarted={gameStarted}
              gameLevel={gameLevel}
              blocks={blocks}
              peekTimeStarted={timerStarted}
              updateBlocks={(selectedBlocks) => checkBlocks(selectedBlocks)}
            />
            <div>
              {gameStarted && (
                <div
                  class="text-4xl font-bold text-center"
                  style={{ marginTop: "30%" }}
                >
                  <div class="text-5xl">Score</div>
                  <div class="text-7xl">{score}</div>
                </div>
              )}
              {timerStarted && <div>{peekTime}</div>}
              {!gameStarted && !timerStarted && (
                <div class="mt-5" style={{ marginTop: "30%" }}>
                  <h3 class="text-4xl font-bold">Rules:</h3>
                  <ul class="list-none">
                    <li>
                      - You will be give {gameLevel.peekTime} seconds to
                      remember the image positions.
                    </li>
                    <li>- Click on the image to reveal your selection.</li>
                    <li>- Click on another image to match your selection.</li>
                    <li>
                      - For every correct pair, 1 point will be rewarded, for
                      every wrong pair, 1 point will be deducted.
                    </li>
                  </ul>
                  <div className="controls mt-5">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                      onClick={() => startPeekTimer(true)}
                    >
                      Start
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => setGameLevel(null)}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
