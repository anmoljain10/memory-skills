const Modal = ({ isVisible, children, onModalClose }) => {
  return (
    <div
      className={`absolute top-0 bottom-0 left-0 right-0 bg-gray-500/25 z-40 w-screen ${
        isVisible ? "" : "invisible"
      }`}
      style={{ minHeight: "100vh" }}
    >
      <div className="flex items-center h-screen  w-screen">
        <div className="modal-body bg-white w-80 md:w-1/3 mx-auto my-auto rounded">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
