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
        background: "linear-gradient(to bottom, #ffd700, #cda100, yellow)",
      }}
    >
      <div className="container mx-auto  h-screen">
        <h1 className="text-3xl font-bold mx-auto">Memory skills!</h1>
        <h2>{gameLevel?.name}</h2>
        {gameLevel === null && (
          <>
            <h1>Select Level</h1>
            {gameLevels.map((item, index) => {
              return (
                <li>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setGameLevel(item)}
                  >
                    {item.level}
                  </button>
                </li>
              );
            })}
          </>
        )}
        {gameLevel !== null && blocks.length && (
          <Board
            gameStarted={gameStarted}
            gameLevel={gameLevel}
            blocks={blocks}
            startLookTimer={() => startPeekTimer(true)}
            updateBlocks={(selectedBlocks) => checkBlocks(selectedBlocks)}
          />
        )}
        {peekTime && gameLevel && <p className="mx-auto">{peekTime}</p>}
        {gameStarted && <p>Score: {score}</p>}
      </div>
    </div>
  );
}
