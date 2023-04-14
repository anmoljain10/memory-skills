import { useEffect, useState } from "react";
import Block from "./block";

const Board = ({
  gameLevel,
  blocks,
  gameStatus,
  startLookTimer,
  updateBlocks,
  peekTimeStarted,
  blocksType,
  gameOverTime,
  soundOn,
  peekTimerStarted,
  peekTime,
}) => {
  const [selectedItem1, setSelectedItem1] = useState(null);
  const [selectedItem2, setSelectedItem2] = useState(null);
  const flipSound = new Audio("/click-button.mp3");
  const successSound = new Audio("/success.mp3");

  useEffect(() => {
    if (selectedItem1 && selectedItem2) {
      if (selectedItem2?.value?.name === selectedItem1?.value?.name) {
        if (soundOn) {
          successSound.play();
        }
        setTimeout(() => {
          updateBlocks({
            block1: selectedItem1,
            block2: selectedItem2,
            result: "PASS",
          });
        }, 500);
      } else {
        setTimeout(() => {
          document.getElementById(selectedItem2.id).classList.remove("hover");
          document.getElementById(selectedItem1.id).classList.remove("hover");
          updateBlocks({ result: "FAIL" });
        }, 500);
      }
      setSelectedItem1(null);
      setSelectedItem2(null);
    }
  }, [selectedItem1, selectedItem2]);

  function onBlockSelected(block) {
    if (selectedItem1 === null) {
      setSelectedItem1(block);
    } else {
      setSelectedItem2(block);
    }
  }

  return (
    <div className="sm:mx-auto relative shadow-xl">
      <div
        className="absolute bg-white top-2 rounded p-3 z-2 shadow-lg"
        style={{ right: gameLevel.level === "easy" ? "-20%" : "-15%" }}
      >
        <div className="font-bold text-center">
          <div
            className={`sm:text-xl ${
              gameOverTime < 10 ? "text-red-500 time-left" : "text-green-500"
            }`}
          >
            Time left
          </div>
          <div
            className={`sm:text-4xl text-transition ${
              gameOverTime < 10 ? "text-red-600" : "text-green-600"
            }`}
          >
            {gameOverTime}s
          </div>
        </div>
      </div>
      {peekTimerStarted && (
        <div className="absolute left-0 -top-7 rounded bg-white px-5">
          <div className="font-bold">
            <div className=" text-xl text-center text-my-purple">
              Starting in : {peekTime}s
            </div>
          </div>
        </div>
      )}

      <div
        className="board-container"
        style={{
          maxWidth: `${100 * gameLevel?.rows + 60}px`,
          maxHeight: `${100 * gameLevel?.rows + 60}px`,
        }}
      >
        {blocks.map((item, index) => {
          const { value, title, id, found } = item;
          return (
            <Block
              key={id}
              title={title}
              value={value}
              id={id}
              found={found}
              gameStatus={gameStatus}
              onBlockSelected={onBlockSelected}
              peekTimeStarted={peekTimeStarted}
              blocksType={blocksType}
              flipSound={flipSound}
              soundOn={soundOn}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Board;
