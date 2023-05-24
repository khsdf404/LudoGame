class Team {
   #color = '';
   #parent = null;
   #path = [];
   #pans = [];
   #startCell = null;
   #finishCell = null;
   #finishWay = null;
   constructor (color, parent) {
      this.#color = color;
      this.#parent = parent;
      this.#path = this.#getPath();
      this.#pans = [];
      this.#startCell = $js(`.start-cell`).filter(($el) => { return $el.hasClass(`team-${color}`) });
      this.#finishCell = $js(`.finish-cell`).filter(($el) => { return $el.hasClass(`team-${color}`) });
      this.#finishWay = $js(`.finish-way`).filter(($el) => { return $el.hasClass(`team-${color}`) });

      this.AppendPan = this.AppendPan.bind(this);
   }

   



   AllowAppend() {
      // `allowed` class for styles only
      if (this.#pans.length < 4) {
         this.#startCell
            .addClass(`allowed`)
            .get()
            .addEventListener('click', this.AppendPan)
      }
   }
   CancelAppend() {
      this.#startCell
         .removeClass(`allowed`)
         .removeEvent('click', this.AppendPan)
   }
   AppendPan() {
      this.#pans.push(new Pan(this.#path, this.#color, this));
      this.EndMove();
   };



   hasPans() {
      return this.#pans.length > 0
   }
   

   MovablePans(diceSum) {
      this.#EachPan((pan) => {
         pan.setMovable(diceSum);
      })
   }
   UnmovablePans() {
      this.#EachPan((pan) => {
         pan.setUnmovable();
      })
   }



   EndMove() {
      this.#parent.EndMove();
   }


   #getPath () {
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

      if (this.#color == 'blue') 
         return path('blue', 4);
      if (this.#color == 'green') 
         return path('green', 14);
      if (this.#color == 'yellow') 
         return path('yellow', 24);
      if (this.#color == 'red') 
         return path('red', 34);
   }

   #EachPan(f) {
      for (let i = 0; i < this.#pans.length; i++) {
         f(this.#pans[i])
      }
   }
}
 
 