const GameRules = ({
  gameLevel,
  onGameStatusChange,
  onChooseLevel,
  onPeekTimeStart,
  gameStatus,
  peekTimerStarted,
}) => {
  return (
    <div className="mt-5">
      <h3
        className="text-2xl sm:text-4xl text-center sm:text-start font-bold font-bungee"
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
      {!peekTimerStarted && !gameStatus && (
        <div className="controls mt-5">
          <button
            className="bg-pink-800 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => onPeekTimeStart()}
          >
            Start
          </button>
          <button
            className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => onChooseLevel()}
          >
            New Game
          </button>
        </div>
      )}
      {gameStatus && (
        <div className="controls mt-5">
          <button
            className="bg-pink-800 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() =>
              onGameStatusChange(gameStatus === "PAUSED" ? "STARTED" : "PAUSED")
            }
          >
            {gameStatus === "PAUSED" ? "Resume" : "Pause"}
          </button>
          <button
            className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
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
