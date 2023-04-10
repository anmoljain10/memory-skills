import { useEffect, useState, useRef } from "react";
import { gameLevels, blockTypeData } from "@/config";
import { shuffle, find } from "lodash";
import Board from "@/components/board";
import GameRules from "@/components/gameRules";
import GameLevels from "@/components/gameLevels";
import { initializeBlocks } from "@/utils/initBlocks";
import Modal from "@/components/modal";
import { faVolumeMute, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const allBlockTypes = ["animals", "birds", "cars", "random"];

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
  const [soundOn, setSoundOn] = useState(true);
  const [gamePaused, setGamePaused] = useState(false);

  const clockSound = useRef(
    typeof Audio !== "undefined" ? new Audio("./ticking-clock.mp3") : undefined
  );

  const loseSound = useRef(
    typeof Audio !== "undefined" ? new Audio("./wrong.mp3") : undefined
  );

  const winSound = useRef(
    typeof Audio !== "undefined" ? new Audio("./good.mp3") : undefined
  );

  const startSound = useRef(
    typeof Audio !== "undefined" ? new Audio("./game-start.mp3") : undefined
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
      if (soundOn) {
        startSound.current?.play();
      }
      setTimeout(() => {
        if (soundOn) {
          clockSound.current?.play();
        }
      }, 50);
    }
  }, [peekTime]);

  useEffect(() => {
    if (clockSound.current.isPaused && soundOn && gameStarted) {
      clockSound.current?.play();
    } else if (!clockSound.current.isPaused && !soundOn) {
      clockSound.current?.pause();
    }
  }, [soundOn]);

  useEffect(() => {
    const anyUnmatchedBlocks = find(blocks, { found: false });
    if (gameOverTime === 0 && gameStarted) {
      if (anyUnmatchedBlocks) {
        setResult("LOSE");
        clearInterval(gameOverTimer.current);
        if (soundOn) {
          clockSound?.current?.pause();
          loseSound.current.play();
        }
        setResModalVisible(true);
      }
    } else if (!anyUnmatchedBlocks && gameStarted) {
      // if player wins
      setResult("WIN");
      clearInterval(gameOverTimer.current);
      if (soundOn) {
        clockSound?.current?.pause();
        winSound.current?.play();
      }
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
    const randomIndex = Math.round(Math.random() * 3);
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

      clockSound?.current?.pause();

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
        gameOverTime - 2 <= 0 ? 0 : gameOverTime - 2
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

  useEffect(() => {
    if (gamePaused) {
      clearInterval(gameOverTimer.current);
      clockSound.current.pause();
    } else {
      gameOverTimer.current = setInterval(() => {
        if (gameOverTime > 0) {
          setGameOverTime((gameOverTime) => gameOverTime - 1);
        }
      }, 1000);
    }
  }, [gamePaused]);

  return (
    <div>
      <div className="container mx-auto" style={{ minHeight: "100vh" }}>
        <h1 className="mx-auto text-center text-purple text-8xl pt-10 font-bold text-white">
          Memory skills
        </h1>
        {gameLevel === null && (
          <div class="sm:w-1/4 mx-auto" style={{ marginTop: "10%" }}>
            <h2
              className="text-center text-3xl mb-4 font-bungee"
              style={{ color: "#602040" }}
            >
              Level
            </h2>
            <div class="p-5 rounded">
              <GameLevels
                gameLevels={gameLevels}
                onLevelSelect={(level) => setGameLevel(level)}
              />
            </div>
          </div>
        )}
        {gameLevel !== null && blocks.length && (
          <div class="flex flex-wrap gap-5 mt-10">
            <Board
              gameStarted={gameStarted}
              gameLevel={gameLevel}
              blocks={blocks}
              blocksType={blocksType}
              peekTimeStarted={timerStarted}
              updateBlocks={(selectedBlocks) => checkBlocks(selectedBlocks)}
              gameOverTime={gameOverTime}
              soundOn={soundOn}
              timerStarted={timerStarted}
              peekTime={peekTime}
            />

            <div className="flex items-end">
              <div class="mt-5">
                <h3
                  class="text-4xl font-bold font-bungee"
                  style={{ color: "#862d59" }}
                >
                  Rules
                </h3>
                <GameRules gameLevel={gameLevel} />
                {!timerStarted && !gameStarted && (
                  <div className="controls mt-5">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                      onClick={() => startPeekTimer(true)}
                    >
                      Start
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => onChooseLevel()}
                    >
                      New Game
                    </button>
                  </div>
                )}
                {gameStarted && (
                  <div className="controls mt-5">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                      onClick={() => setGamePaused((gamePaused) => !gamePaused)}
                    >
                      {gamePaused ? "Resume" : "Pause"}
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => onChooseLevel()}
                    >
                      New Game
                    </button>
                  </div>
                )}
              </div>
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
                src="prize.gif"
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
                  New Game
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
                  New Game
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
      <div class="absolute right-10 bottom-10">
        <FontAwesomeIcon
          icon={soundOn ? faVolumeUp : faVolumeMute}
          fontSize={40}
          color={"white"}
          className="cursor-pointer"
          onClick={() => setSoundOn((soundOn) => !soundOn)}
        />
      </div>
    </div>
  );
}
