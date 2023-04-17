import Image from "next/image";

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
        <Image
          src={
            peekTimeStarted || found
              ? `/${value?.url}`
              : `/${blocksType}/block-cover.png`
          }
          height={100}
          width={100}
          layout={"responsive"}
          className={`${found ? "grayscale" : ""}`}
        />
      ) : (
        <div className="flipper">
          <div className={`front`}>
            <Image
              src={`/${blocksType}/block-cover.png`}
              height={100}
              width={100}
              layout={"responsive"}
            />
          </div>
          <div className={`back border-5`}>
            <Image
              src={`/${value?.url}`}
              height={100}
              width={100}
              layout={"responsive"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Block;
