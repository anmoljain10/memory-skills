const GameRules = ({ gameLevel }) => {
  return (
    <ul className="list-none">
      <li>
        - You will be give {gameLevel.peekTime} seconds to remember the image
        positions.
      </li>
      <li>- Click on the image to reveal your selection.</li>
      <li>- Click on another image to match your selection.</li>
      <li>
        - For every correct pair, 1 point will be rewarded, for every wrong
        pair, 1 point will be deducted.
      </li>
    </ul>
  );
};

export default GameRules;