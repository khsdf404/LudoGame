class Pan {
   #path = [];
   #cell;
   #color;
   #diceSum = -1;
   #parent
   constructor(path, color, parent) {
      this.#parent = parent;
      this.#color = color;
      this.#path = path;
      this.setCell();
      this.DrawPan();

      // feature that allows to access `this` in transmitted
      // functions as EventLisneter's agrument
      this.Highlight = this.Highlight.bind(this);
      this.MovePan = this.MovePan.bind(this);
   }


   setCell() {
      this.#cell = $cells.find(this.#path[0]);
   }
   DrawPan() {
      this.#cell.addClass('pan').addClass(`pan-${this.#color}`);
   }
   ErasePan() {
      this.#cell.removeClass('pan').removeClass(`pan-${this.#color}`);
   }



   setMovable(diceSum) {
      // if (this.#path.length < diceSum) return;
      this.#cell.addClass('movable');
      this.#diceSum = diceSum;
      this.#cell.get().addEventListener('click', this.Highlight)
   }
   setUnmovable() {
      this.#cell.removeClass('movable');
      this.#cell.removeEvent('click', this.Highlight)
   }


   // show pan's way
   Highlight() {
      if (this.#cell.hasClass(`highlighted`)) 
         return this.Unhighlight();
      this.#cell.addClass(`highlighted`);
      // highlight pan's way
      for (let i = 1; i < this.#diceSum; i++) {
         $cells.find(this.#path[i]).addClass('pan-to-move');
      }
      // highlight final spot
      $cells
         .find(this.#path[this.#diceSum])
         .addClass('pan-to-move')
         .addClass('pan-to-put')
         .get()
         .addEventListener('click', this.MovePan)
   }
   Unhighlight() {
      this.#cell.removeClass(`highlighted`);
      // highlight pan's way
      for (let i = 1; i < this.#diceSum; i++) {
         $cells.find(this.#path[i]).removeClass('pan-to-move');
      }
      // highlight final spot
      $cells
         .find(this.#path[this.#diceSum])
         .removeClass('pan-to-move')
         .removeClass('pan-to-put')
         .removeEvent('click', this.MovePan)
   }


   MovePan() {
      // erase old pan
      this.setUnmovable();
      this.Unhighlight();
      this.ErasePan();
      // draw new pan
      this.#path = this.#path.slice(this.#diceSum);
      this.setCell();
      this.DrawPan();
      // up to the parent's game to end move
      this.#EndMove();
   }
   

   #EndMove() {
      this.#parent.EndMove();
   };
}