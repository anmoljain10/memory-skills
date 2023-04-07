import { useEffect, useState } from "react";
import Block from "./block";

const Board = ({
  gameLevel,
  blocks,
  gameStarted,
  startLookTimer,
  updateBlocks,
  peekTimeStarted,
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
        class="board-container"
        style={{
          maxWidth: `${100 * gameLevel?.rows + 60}px`,
          maxHeight: `${100 * gameLevel?.rows + 60}px`,
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
              peekTimeStarted={peekTimeStarted}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Board;
