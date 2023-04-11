const GameRules = ({
  gameLevel,
  onGamePaused,
  onChooseLevel,
  onPeekTimeStart,
  gamePaused,
  gameStarted,
  timerStarted,
}) => {
  return (
    <div class="mt-5">
      <h3
        class="text-2xl sm:text-4xl text-center sm:text-start font-bold font-bungee"
        style={{ color: "#862d59" }}
      >
        Rules
      </h3>
      <ul className="list-none mt-4" style={{ color: "#391326" }}>
        <li>
          1. You will be give {gameLevel.peekTime} seconds to remember the image
          positions.
        </li>
        <li>2. Click on the image to reveal your selection.</li>
        <li>3. Click on another image to match your selection.</li>
        <li>
          4. For every matched pair, 2 seconds will be rewarded, for every wrong
          pair, 2 seconds will be deducted.
        </li>
        <li>5. Player matching all the blocks before time wins the game!</li>
      </ul>
      {!timerStarted && !gameStarted && (
        <div className="controls mt-5">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => onPeekTimeStart()}
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
            onClick={() => onGamePaused()}
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
  );
};

export default GameRules;
