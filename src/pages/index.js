import { useEffect, useState, useRef } from "react";
import { gameLevels, blockTypeData } from "@/config";
import { shuffle, find } from "lodash";
import Board from "@/components/board";
import GameRules from "@/components/gameRules";
import GameLevels from "@/components/gameLevels";
import { initializeBlocks } from "@/utils/initBlocks";
import Modal from "@/components/modal";

const allBlockTypes = ["animals", "birds", "cars"];

export default function Home() {
  const [gameLevel, setGameLevel] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [gameStarted, startGame] = useState(false);
  const [timerStarted, startPeekTimer] = useState(false);
  const [peekTime, setPeekTime] = useState(10);
  const [score, setScore] = useState(0);
  const [blocksType, setBlocksType] = useState("");
  const [gameOverTime, setGameOverTime] = useState(0);
  const timer = useRef(null);
  const gameOverTimer = useRef(null);
  const [result, setResult] = useState(null);
  const [showResModal, setResModalVisible] = useState(false);

  const clockSound = useRef(
    typeof Audio !== "undefined" ? new Audio("./ticking-clock.mp3") : undefined
  );

  const loseSound = useRef(
    typeof Audio !== "undefined" ? new Audio("./wrong.mp3") : undefined
  );

  const winSound = useRef(
    typeof Audio !== "undefined" ? new Audio("./good.mp3") : undefined
  );

  useEffect(() => {
    if (timerStarted) {
      timer.current = setInterval(() => {
        setPeekTime((peekTime) => peekTime - 1);
      }, 1000);
    }
  }, [timerStarted]);

  useEffect(() => {
    gameOverTimer.current = setInterval(() => {
      if (gameOverTime > 0) {
        setGameOverTime((gameOverTime) => gameOverTime - 1);
      }
    }, 1000);
    () => clearInterval(gameOverTime.current);
  }, [gameStarted]);

  useEffect(() => {
    if (peekTime === 0) {
      clearInterval(timer.current);
      startPeekTimer(false);
      startGame(true);
      clockSound.current?.play();
    }
  }, [peekTime]);

  useEffect(() => {
    const anyUnmatchedBlocks = find(blocks, { found: false });
    if (gameOverTime === 0 && gameStarted) {
      if (anyUnmatchedBlocks) {
        setResult("LOSE");
        clearInterval(gameOverTimer.current);
        clockSound?.current?.pause();
        loseSound.current.play();
        setResModalVisible(true);
      }
    } else if (!anyUnmatchedBlocks && gameStarted) {
      // if player wins
      setResult("WIN");
      clearInterval(gameOverTimer.current);
      clockSound?.current?.pause();
      winSound.current?.play();
      setResModalVisible(true);
    }
  }, [gameOverTime]);

  useEffect(() => {
    resetGame();
  }, [gameLevel]);

  useEffect(() => {
    generateBlockType();
  }, []);

  function generateBlockType() {
    const randomIndex = Math.round(Math.random() * 2);
    setBlocksType(allBlockTypes[randomIndex]);
  }

  function resetGame() {
    try {
      let gameCards = [];
      const blocksTypeArray = blockTypeData[blocksType];
      gameCards = initializeBlocks({ blocksTypeArray, gameLevel });
      const shuffledArray = shuffle(gameCards);
      startGame(false);
      startPeekTimer(false);
      setPeekTime(gameLevel.peekTime);
      setBlocks(shuffledArray);
      setGameOverTime(gameLevel.gameOverTime);
      setResult(null);
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
      if (gameOverTimer.current) {
        clearInterval(gameOverTimer.current);
        gameOverTimer.current = null;
      }
    } catch (e) {
      console.log("error resetting game!");
    }
  }

  function onChooseLevel() {
    setGameLevel(null);
    resetGame();
  }

  function checkBlocks(selectedBlocks) {
    console.log(blocks);
    if (selectedBlocks.result === "FAIL") {
      // setScore((score) => score - 1);
      setGameOverTime((gameOverTime) =>
        gameOverTime - 3 <= 0 ? 0 : gameOverTime - 3
      );
    } else {
      setGameOverTime((gameOverTime) => gameOverTime + 2);
      // setScore((score) => score + 1);
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
    <div>
      <div className="container mx-auto" style={{ minHeight: "100vh" }}>
        <h1 className="mx-auto text-center text-purple text-8xl pt-4 font-bold">
          Memory skills
        </h1>
        {gameLevel === null && (
          <div class="sm:w-1/4 mx-auto" style={{ marginTop: "10%" }}>
            <h2 className="text-center text-3xl mb-4">Level</h2>
            <div class="p-5 rounded">
              <GameLevels
                gameLevels={gameLevels}
                onLevelSelect={(level) => setGameLevel(level)}
              />
            </div>
          </div>
        )}
        {gameLevel !== null && blocks.length && (
          <div class="grid lg:grid-cols-2 mt-10">
            <Board
              gameStarted={gameStarted}
              gameLevel={gameLevel}
              blocks={blocks}
              blocksType={blocksType}
              peekTimeStarted={timerStarted}
              updateBlocks={(selectedBlocks) => checkBlocks(selectedBlocks)}
            />
            <div>
              {gameStarted && (
                <div
                  class="text-4xl font-bold text-center"
                  style={{ marginTop: "30%" }}
                >
                  <div
                    class={`text-5xl ${
                      gameOverTime < 5 ? "text-red-500 time-left" : ""
                    }`}
                  >
                    Time left
                  </div>
                  <div
                    class={`text-7xl text-transition ${
                      gameOverTime < 5 ? "text-red-500" : ""
                    }`}
                  >
                    {gameOverTime}
                  </div>
                </div>
              )}
              {timerStarted && (
                <div class="font-bold">
                  <div class="text-white text-4xl text-center">Starting in</div>
                  <div class="text-white text-6xl text-center">{peekTime}</div>
                </div>
              )}
              {!gameStarted && !timerStarted && (
                <div class="mt-5" style={{ marginTop: "30%" }}>
                  <h3 class="text-4xl font-bold">Rules:</h3>
                  <GameRules gameLevel={gameLevel} />
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
      <Modal isVisible={showResModal}>
        <div className="p-10 text-center">
          {result === "WIN" ? (
            <div className="win-body">
              <h1>You Win!</h1>
              <img
                src="win.png"
                className="mx-auto"
                style={{ height: "auto", width: "100px" }}
              />
              <div className="controls mt-5">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => {
                    onChooseLevel();
                    setResModalVisible(false);
                  }}
                >
                  Choose Level
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    resetGame();
                    setResModalVisible(false);
                  }}
                >
                  Replay
                </button>
              </div>
            </div>
          ) : (
            <div className="lose-body">
              <h1>Game Over!</h1>
              <img
                src="ghost.png"
                className="mx-auto"
                style={{ height: "auto", width: "100px" }}
              />
              <div className="controls mt-5">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => {
                    onChooseLevel();
                    setResModalVisible(false);
                  }}
                >
                  Choose Level
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    resetGame();
                    setResModalVisible(false);
                  }}
                >
                  Replay
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
