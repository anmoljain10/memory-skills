import { useEffect, useState, useRef } from "react";
import { gameLevels, blockTypeData, allBlockTypes } from "@/config";
import { shuffle, find } from "lodash";
import Board from "@/components/board";
import GameRules from "@/components/gameRules";
import GameLevels from "@/components/gameLevels";
import { initializeBlocks } from "@/utils/initBlocks";
import Celebration from "@/components/celebration";
import Modal from "@/components/modal";
import SoundControl from "@/components/soundControl";
import { useGameSounds } from "@/hooks/useGameSounds";
import Head from "next/head";
import { useGameLevel } from "@/hooks/useGameLevel";

export default function Home() {
  const {
    gameLevel,
    setGameLevel,
    blocksType,
    blocks,
    setBlocks,
    gameStatus,
    setGameStatus,
  } = useGameLevel();

  const [peekTimerStarted, startPeekTimer] = useState(false);
  const [peekTime, setPeekTime] = useState(10);
  const [score, setScore] = useState(0);
  const [gameOverTime, setGameOverTime] = useState(0);
  const timer = useRef(null);
  const gameOverTimer = useRef(null);
  const [result, setResult] = useState(null);
  const [showResModal, setResModalVisible] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  const { startSound, winSound, loseSound, clockSound } = useGameSounds();

  useEffect(() => {
    if (peekTimerStarted) {
      timer.current = setInterval(() => {
        setPeekTime((peekTime) => peekTime - 1);
      }, 1000);
    }
  }, [peekTimerStarted]);

  function startCounter() {
    gameOverTimer.current = setInterval(() => {
      if (gameOverTime > 0) {
        setGameOverTime((gameOverTime) => gameOverTime - 1);
      }
    }, 1000);
  }

  useEffect(() => {
    if (gameStatus === "STARTED") {
      startCounter();
    } else if (gameStatus === "PAUSED") {
      clearInterval(gameOverTimer.current);
      clockSound.current.pause();
    }
    () => clearInterval(gameOverTimer.current);
  }, [gameStatus]);

  useEffect(() => {
    if (peekTime === 0) {
      clearInterval(timer.current);
      startPeekTimer(false);
      setGameStatus("STARTED");
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
    if (clockSound.current.isPaused && soundOn && gameStatus === "STARTED") {
      clockSound.current?.play();
    } else if (!clockSound.current.isPaused && !soundOn) {
      clockSound.current?.pause();
    }
  }, [soundOn]);

  useEffect(() => {
    const anyUnmatchedBlocks = find(blocks, { found: false });
    if (gameOverTime === 0 && gameStatus === "STARTED") {
      if (anyUnmatchedBlocks) {
        setResult("LOSE");
        clearInterval(gameOverTimer.current);
        if (soundOn) {
          clockSound?.current?.pause();
          loseSound.current.play();
        }
        setResModalVisible(true);
      }
    } else if (!anyUnmatchedBlocks && gameStatus === "STARTED") {
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
    const anyUnmatchedBlocks = find(blocks, { found: false });
    if (!anyUnmatchedBlocks && gameStatus === "STARTED") {
      setResult("WIN");
      clearInterval(gameOverTimer.current);
      if (soundOn) {
        clockSound?.current?.pause();
        winSound.current?.play();
      }
      setResModalVisible(true);
    }
  }, [blocks]);

  useEffect(() => {
    resetGame();
  }, [gameLevel]);

  function resetGame() {
    try {
      let gameCards = [];
      const blocksTypeArray = blockTypeData[blocksType];
      gameCards = initializeBlocks({ blocksTypeArray, gameLevel });
      const shuffledArray = shuffle(gameCards);
      setGameStatus(null);
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
          item.id === selectedBlocks.block1.id ||
          item.id === selectedBlocks.block2.id
        ) {
          return { ...item, found: true };
        }
        return { ...item };
      });
      setBlocks(updatedBlocks);
    }
  }

  return (
    <div className="px-5 pb-5">
      <Head>
        <title>Memory Skills</title>
        <meta
          name="description"
          content="A cool game to test your memory skills."
        />
      </Head>
      <div className="container mx-auto" style={{ minHeight: "100vh" }}>
        <h1 className="mx-auto text-center text-purple text-4xl sm:text-6xl md:text-7xl lg:text-8xl pt-10 font-bold text-white font-bungee">
          Memory skills
        </h1>
        {gameLevel === null && (
          <GameLevels
            gameLevels={gameLevels}
            onLevelSelect={(level) => setGameLevel(level)}
          />
        )}
        {gameLevel !== null && blocks.length && (
          <div className="flex flex-wrap gap-5 mt-10">
            <Board
              gameStatus={gameStatus}
              gameLevel={gameLevel}
              blocks={blocks}
              blocksType={blocksType}
              peekTimeStarted={peekTimerStarted}
              updateBlocks={(selectedBlocks) => checkBlocks(selectedBlocks)}
              gameOverTime={gameOverTime}
              soundOn={soundOn}
              peekTimerStarted={peekTimerStarted}
              peekTime={peekTime}
            />

            <div className="flex items-end">
              <GameRules
                gameLevel={gameLevel}
                onChooseLevel={onChooseLevel}
                onGameStatusChange={(gameStatus) => setGameStatus(gameStatus)}
                peekTimerStarted={peekTimerStarted}
                gameStatus={gameStatus}
                onPeekTimeStart={() => startPeekTimer(true)}
              />
            </div>
          </div>
        )}
        <Modal isVisible={showResModal}>
          <div className="p-10 text-center">
            {result === "WIN" ? (
              <div className="win-body">
                <h1 className="font-bungee text-3xl text-my-purple">
                  You Win!
                </h1>
                <img
                  src="prize.gif"
                  className="mx-auto"
                  style={{ height: "auto", width: "100px" }}
                />
                <div className="controls mt-5">
                  <button
                    className="bg-pink-800 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded mr-2"
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
                <h1 className="font-bungee text-3xl text-my-purple">
                  Game Over!
                </h1>
                <img
                  src="ghost.png"
                  className="mx-auto"
                  style={{ height: "auto", width: "100px" }}
                />
                <div className="controls mt-5">
                  <button
                    className="bg-pink-800 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded mr-2"
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
        <SoundControl
          soundOn={soundOn}
          onSoundToggle={(soundOn) => setSoundOn(soundOn)}
        />
      </div>
      {result === "WIN" && <Celebration />}
    </div>
  );
}
