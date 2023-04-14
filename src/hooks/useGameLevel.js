import { useState, useEffect } from "react";
import { gameLevels, blockTypeData, allBlockTypes } from "@/config";

function useGameLevel() {
  const [gameLevel, setGameLevel] = useState(null);
  const [blocksType, setBlocksType] = useState("");
  const [blocks, setBlocks] = useState([]);
  const [gameStatus, setGameStatus] = useState(null); // null, STARTED, PAUSED, ENDED

  function generateBlockType() {
    const randomIndex = Math.round(Math.random() * 4);
    setBlocksType(allBlockTypes[randomIndex]);
  }

  useEffect(() => {
    generateBlockType();
  }, []);
  return {
    gameLevel,
    setGameLevel,
    blocksType,
    blocks,
    setBlocks,
    gameStatus,
    setGameStatus,
  };
}

export { useGameLevel };
