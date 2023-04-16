const Block = ({
  value,
  title,
  id,
  gameStatus,
  found,
  onBlockSelected,
  peekTimeStarted,
  blocksType,
  flipSound,
  soundOn,
}) => {
  return (
    <div
      className={`flip-container ${gameStatus ? "cursor-pointer" : ""}`}
      id={id}
      onClick={(e) => {
        if (gameStatus && !found) {
          try {
            document.getElementById(id).classList.add("hover");
            if (soundOn) {
              flipSound.play();
            }
            onBlockSelected({ value, id });
          } catch (e) {
            console.log(e);
          }
        }
      }}
    >
      {!gameStatus || found || peekTimeStarted ? (
        <img
          src={
            peekTimeStarted || found
              ? `${value?.url}`
              : `${blocksType}/block-cover.png`
          }
        />
      ) : (
        <div className="flipper">
          <div className={`front ${gameStatus ? "started" : ""}`}>
            <img src={`${blocksType}/block-cover.png`} />
          </div>
          <div className={`back ${gameStatus ? "started" : ""}`}>
            <img src={`${value?.url}`} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Block;
