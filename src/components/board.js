import { useEffect, useState } from "react";
import Block from "./block";

const Board = ({
  gameLevel,
  blocks,
  gameStarted,
  startLookTimer,
  updateBlocks,
}) => {
  const [selectedItem1, setSelectedItem1] = useState(null);
  const [selectedItem2, setSelectedItem2] = useState(null);

  useEffect(() => {
    if (selectedItem1 && selectedItem2) {
      if (selectedItem2?.value?.name === selectedItem1?.value?.name) {
        console.log("Its a match");
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
    <div className="mx-auto">
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          maxWidth: `${100 * gameLevel?.rows + 60}px`,
          maxHeight: `${100 * gameLevel?.rows + 60}px`,
          flexWrap: "wrap",
          borderWidth: "30px",
          borderRadius: "10px",
          borderColor: "#8B4513",
        }}
      >
        {blocks.map((item, index) => {
          const { value, title, id, found } = item;
          return (
            <Block
              title={title}
              value={value}
              id={id}
              found={found}
              gameStarted={gameStarted}
              onBlockSelected={onBlockSelected}
            />
          );
        })}
      </div>
      {!gameStarted && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => startLookTimer(true)}
        >
          Start
        </button>
      )}
    </div>
  );
};

export default Board;
