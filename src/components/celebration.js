const Celebration = () => {
  const confettiPieces = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  return (
    <>
      {confettiPieces.map((item, index) => {
        return <div className="confetti-piece" key={index}></div>;
      })}
    </>
  );
};

export default Celebration;
