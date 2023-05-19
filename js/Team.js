const $square = (() => {
   let allSquares = $js(`.cell`).extend(`.start-cell, .finish-cell`);
   let topSquares = allSquares.get([0, 1, 2, 36, 32, 3, 4, 5]);
   let rightSquares = allSquares.get([7, 9, 11, 13, 15, 37, 34, 17, 19, 21, 23, 25]);
   let bottomSquares = allSquares.get([31, 30, 29, 39, 35, 28, 27, 26]);
   let leftSquares = allSquares.get([24, 22, 20, 18, 16, 38, 33, 14, 12, 10, 8, 6]);
   // clockwise
   let rightSequence = $js()
      .extend($js(topSquares))
      .extend($js(rightSquares))
      .extend($js(bottomSquares)
      .extend($js(leftSquares)));
   return rightSequence;
})();
const yellowPath = [];


log($square)

class Team {
   constructor (name) {
      this.name = name;

   }
}