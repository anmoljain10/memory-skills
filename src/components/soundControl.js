import { faVolumeMute, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SoundControl = ({ soundOn, onSoundToggle }) => {
  return (
    <div className="absolute right-10 bottom-10">
      <FontAwesomeIcon
        icon={soundOn ? faVolumeUp : faVolumeMute}
        fontSize={40}
        color={"white"}
        className="cursor-pointer"
        onClick={() => onSoundToggle(!soundOn)}
      />
    </div>
  );
};

export default SoundControl;
