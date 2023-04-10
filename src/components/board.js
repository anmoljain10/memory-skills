import { useEffect, useState } from "react";
import Block from "./block";

const Board = ({
  gameLevel,
  blocks,
  gameStarted,
  startLookTimer,
  updateBlocks,
  peekTimeStarted,
  blocksType,
  gameOverTime,
  soundOn,
}) => {
  const [selectedItem1, setSelectedItem1] = useState(null);
  const [selectedItem2, setSelectedItem2] = useState(null);
  const flipSound = new Audio("/click-button.mp3");
  const successSound = new Audio("/success.mp3");

  useEffect(() => {
    if (selectedItem1 && selectedItem2) {
      if (selectedItem2?.value?.name === selectedItem1?.value?.name) {
        console.log("Its a match");
        if (soundOn) {
          successSound.play();
        }
        updateBlocks({
          block1: selectedItem1,
          block2: selectedItem2,
          result: "PASS",
        });
      } else {
        setTimeout(() => {
          document.getElementById(selectedItem2.id).classList.remove("hover");
          document.getElementById(selectedItem1.id).classList.remove("hover");
          updateBlocks({ result: "FAIL" });
        }, 1000);
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
    <div className="mx-auto relative">
      <div
        className="absolute bg-white top-2 rounded p-3"
        style={{ right: gameLevel.level === "easy" ? "-20%" : "-15%" }}
      >
        <div class="font-bold text-center">
          <div
            class={`text-xl ${
              gameOverTime < 5 ? "text-red-500 time-left" : "text-green-500"
            }`}
          >
            Time left
          </div>
          <div
            class={`text-4xl text-transition ${
              gameOverTime < 5 ? "text-red-600" : "text-green-600"
            }`}
          >
            {gameOverTime}
          </div>
        </div>
      </div>

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
              gameStarted={gameStarted}
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
