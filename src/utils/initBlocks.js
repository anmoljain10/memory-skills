function initializeBlocks({ blocksTypeArray, gameLevel }) {
  const totalCount = 2;
  let blockSetCount = 0;
  let assetIndex = 0;
  let gameCards = [];
  try {
    for (let cell = 0; cell < gameLevel.rows * gameLevel.columns; cell++) {
      gameCards.push({
        id: `${cell + 1}`,
        value: blocksTypeArray[assetIndex],
        title: `${cell + 1}`,
        found: false,
      });
      if (blockSetCount < totalCount) {
        blockSetCount = blockSetCount + 1;
      }
      if (blockSetCount === totalCount) {
        blockSetCount = 0;
        assetIndex = assetIndex + 1;
        if (assetIndex === blocksTypeArray.length) {
          assetIndex = 0;
        }
      }
    }
    return gameCards;
  } catch (e) {
    return [];
  }
}

export { initializeBlocks };
