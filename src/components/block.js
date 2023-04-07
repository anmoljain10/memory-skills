import { useEffect } from "react";

const Block = ({
  value,
  title,
  id,
  gameStarted = false,
  found,
  onBlockSelected,
}) => {
  return (
    <div
      className={`flip-container`}
      id={id}
      onClick={(e) => {
        if (gameStarted && !found) {
          document.getElementById(id).classList.add("hover");
          onBlockSelected({ value, id });
        }
      }}
      //   onMouseLeave={(e) => {
      //     document.getElementById(id).classList.remove("hover");
      //   }}
    >
      {!gameStarted || found ? (
        <img
          src={`${value?.url}`}
          style={{ height: "100px", width: "100px" }}
        />
      ) : (
        <div className="flipper">
          <div className={`front  ${gameStarted ? "started" : ""}`}>
            <img
              src="block-cover.png"
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
