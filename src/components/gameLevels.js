const GameLevels = ({ gameLevels, onLevelSelect }) => {
  return (
    <ul className="list-none text-white">
      {gameLevels.map((item, index) => {
        return (
          <li className="cursor-pointer border rounded mb-3" key={item.level}>
            <div
              className="font-bold py-2 px-4 rounded capitalize text-3xl text-center"
              onClick={() => onLevelSelect(item)}
            >
              {item.level} - {item.name}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default GameLevels;
