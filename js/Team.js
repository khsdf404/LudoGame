const Square = ((() => {
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





class Team {
   Color;
   Owner;
   #path;
   #pans = [];
   #startCell;
   #finishCell;
   #finishWay;
   constructor (color, owner) {
      this.Owner = owner;
      this.Color = color;
      this.#setPath();
      this.#pans = [];
      this.#startCell = $js(`.start-cell`).filter(($el) => { return $el.hasClass(`team-${color}`) });
      this.#finishCell = $js(`.finish-cell`).filter(($el) => { return $el.hasClass(`team-${color}`) });
      this.#finishWay = $js(`.finish-way`).filter(($el) => { return $el.hasClass(`team-${color}`) });

      this.#startCell.onClick(($elem, e, i) => { 
         if ($elem.hasClass(`allowed`))
            this.AppendPan();
      })
   }
   getPath() {
      return this.#path;
   }
   #setPath () {
      function path(color, startIndex) {
         let indexArr = [];
         for (let i = 0; i < 40; i++) 
            indexArr.push(Square[(i+startIndex) % 40]);
         // .finish-path indexes
         if (color == 'yellow')
            indexArr.push(...[54, 62, 70, 78]);
         else if (color == 'blue')
            indexArr.push(...[57, 49, 41, 33]);
         else if (color == 'green')
            indexArr.push(...[11, 12, 13, 14]);
         else if (color == 'red')
            indexArr.push(100, 99, 98, 97);
         return indexArr;
      }
      if (this.Color == 'green') {
         this.#path = path('green', 14);
      }
      else if (this.Color == 'yellow') {
         this.#path = path('yellow', 24);
      }
      else if (this.Color == 'red') {
         this.#path = path('red', 34);
      }
      else {
         this.#path = path('blue', 4);
      }
   }

   AllowAppend() {
      if (this.#pans.length < 4)
         this.#startCell.addClass(`allowed`)
   }
   CancelAppend() {
      this.#startCell.removeClass(`allowed`)
   }

   AppendPan() {
      this.#pans.push(new Pan(this.#path, this.Color))
   };
}
 
 