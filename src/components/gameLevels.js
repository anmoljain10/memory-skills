import Modal from "./modal";
import { useState } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GameLevels = ({ gameLevels, onLevelSelect }) => {
  const [tutorialModalVisible, setTutorialModalVisible] = useState(false);
  return (
    <div className="lg:w-1/3 xl:w-1/4 mx-auto" style={{ marginTop: "10%" }}>
      <h2
        className="text-center text-3xl mb-4 font-bungee"
        style={{ color: "#602040" }}
      >
        Level
      </h2>
      <Modal isVisible={tutorialModalVisible}>
        <div className="p-4">
          <FontAwesomeIcon
            icon={faClose}
            fontSize={50}
            color={"black"}
            className="cursor-pointer absolute"
            style={{ top: "3%", right: "3%" }}
            onClick={() => setTutorialModalVisible(false)}
          />
          <video width="600px" autoplay controls>
            <source src="game-tutorial.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button
            className="bg-pink-800 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded  w-full mt-4"
            onClick={() => setTutorialModalVisible(false)}
          >
            Go Back
          </button>
        </div>
      </Modal>
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
          <li
            className={`cursor-pointer border rounded mb-3 hover:bg-white hover:text-my-purple`}
          >
            <div
              className="font-bold py-2 px-4 rounded capitalize text-3xl text-center"
              onClick={() => setTutorialModalVisible(true)}
            >
              Tutorial
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GameLevels;
