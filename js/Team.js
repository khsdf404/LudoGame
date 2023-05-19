const $square = ((() => {
   return function() {
      let $allSquares = $js(`.cell`).extend(`.start-cell, .finish-cell`);
      let $topSquares = $allSquares.get([0, 1, 2, 36, 32, 3, 4, 5]);
      let $rightSquares = $allSquares.get([7, 9, 11, 13, 15, 37, 34, 17, 19, 21, 23, 25]);
      let $bottomSquares = $allSquares.get([31, 30, 29, 39, 35, 28, 27, 26]);
      let $leftSquares = $allSquares.get([24, 22, 20, 18, 16, 38, 33, 14, 12, 10, 8, 6]);
      // clockwise
      let $rightSequence = $js()
         .extend($js($topSquares))
         .extend($js($rightSquares))
         .extend($js($bottomSquares)
         .extend($js($leftSquares)));
      let indexArr = []
      $rightSequence.each(($el) => {
         indexArr.push($el.index())
      })
      return indexArr;
   }
})())();

function getPath(color, startIndex) {
   let indexArr = []; 
   for (let i = 0; i < 40; i++) indexArr.push($square[(i+startIndex) % 40]);
   // .finish-path indexes
   if (color == 'yellow') {
      indexArr.push(54); 
      indexArr.push(62);
      indexArr.push(70);
      indexArr.push(78)
   }
   else if (color == 'blue') {
      indexArr.push(33); 
      indexArr.push(41);
      indexArr.push(49);
      indexArr.push(57)
   }
   else if (color == 'green') {
      indexArr.push(11); 
      indexArr.push(12);
      indexArr.push(13);
      indexArr.push(14)
   }
   else {
      indexArr.push(97); 
      indexArr.push(98);
      indexArr.push(99);
      indexArr.push(100)
   }
   return indexArr;
}
const greenPath = (() => {
   return getPath('green', 4);
})();
const yellowPath = (() => {
   return getPath('yellow', 14);
})();
const redPath = (() => {
   return getPath('red', 24);
})();
const bluePath = (() => {
   return getPath('blue', 34);
})();



log($js(`main span`).get(greenPath))
log($js(`main span`).get(greenPath))



class Team {
   constructor (name) {
      this.name = name;

   }
}