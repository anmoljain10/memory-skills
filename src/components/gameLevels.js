const GameLevels = ({ gameLevels, onLevelSelect }) => {
  return (
    <div className="lg:w-1/3 xl:w-1/4 mx-auto" style={{ marginTop: "10%" }}>
      <h2
        className="text-center text-3xl mb-4 font-bungee"
        style={{ color: "#602040" }}
      >
        Level
      </h2>
      <div className="p-5 rounded">
        <ul className="list-none text-white">
          {gameLevels.map((item, index) => {
            return (
              <li
                className={`cursor-pointer border rounded mb-3 hover:bg-white hover:text-my-purple`}
                key={item.level}
              >
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
      </div>
    </div>
  );
};

export default GameLevels;
