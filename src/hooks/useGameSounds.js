import { useRef } from "react";

const useGameSounds = () => {
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

  return { clockSound, loseSound, winSound, startSound };
};

export { useGameSounds };
