import { useEffect } from "react";

const Block = ({ value, title, id, gameStarted = false }) => {
  console.log(value);

  return (
    <div
      class={`flip-container`}
      id={id}
      onClick={(e) => {
        if (gameStarted) {
          document.getElementById(id).classList.add("hover");
        }
      }}
      //   onMouseLeave={(e) => {
      //     document.getElementById(id).classList.remove("hover");
      //   }}
    >
      <div class="flipper">
        <div class={`front  ${gameStarted ? "started" : ""}`}>Front</div>
        <div class={`back  ${gameStarted ? "started" : ""}`}>
          <img
            src={`${value?.url}`}
            style={{ height: "100px", width: "100px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Block;
