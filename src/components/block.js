const Block = ({
  value,
  title,
  id,
  gameStarted = false,
  found,
  onBlockSelected,
  peekTimeStarted,
  blocksType,
}) => {
  return (
    <div
      className={`flip-container ${gameStarted ? "cursor-pointer" : ""}`}
      id={id}
      onClick={(e) => {
        if (gameStarted && !found) {
          document.getElementById(id).classList.add("hover");
          onBlockSelected({ value, id });
        }
      }}
    >
      {!gameStarted || found || peekTimeStarted ? (
        <img
          src={
            peekTimeStarted || found
              ? `${value?.url}`
              : `${blocksType}/block-cover.png`
          }
          style={{ height: "100px", width: "100px" }}
        />
      ) : (
        <div className="flipper">
          <div className={`front  ${gameStarted ? "started" : ""}`}>
            <img
              src={`${blocksType}/block-cover.png`}
              style={{ height: "100px", width: "100px", padding: "2px" }}
            />
          </div>
          <div className={`back  ${gameStarted ? "started" : ""}`}>
            <img
              src={`${value?.url}`}
              style={{ height: "100px", width: "100px" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Block;
