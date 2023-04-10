const GameRules = ({ gameLevel }) => {
  return (
    <ul className="list-none mt-4" style={{ color: "#391326" }}>
      <li>
        1. You will be give {gameLevel.peekTime} seconds to remember the image
        positions.
      </li>
      <li>2. Click on the image to reveal your selection.</li>
      <li>3. Click on another image to match your selection.</li>
      <li>
        4. For every correct pair, 2 seconds will be rewarded, for every wrong
        pair, 2 seconds will be deducted.
      </li>
    </ul>
  );
};

export default GameRules;
