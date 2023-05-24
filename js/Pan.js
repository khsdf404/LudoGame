class Pan {
   #path = [];
   #cell;
   #color;
   #diceSum = -1;
   constructor(path, color) {
      this.#color = color;
      this.#path = path;
      this.setCell();
      this.DrawPan();

      this.Highlight = this.Highlight.bind(this);
      this.MovePan = this.MovePan.bind(this);
   }
   setCell() {
      this.#cell = $cells.find(this.#path[0]);
   }
   DrawPan() {
      this.#cell.addClass('pan').addClass(`pan-${this.#color}`);
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
   Highlight() {
      if (this.#cell.hasClass(`highlighted`)) return;
      this.#cell.addClass(`highlighted`);
      for (let i = 1; i < this.#diceSum; i++) {
         $cells.find(this.#path[i]).addClass('pan-to-move');
      }
      $cells
         .find(this.#path[this.#diceSum])
         .addClass('pan-to-move')
         .addClass('pan-to-put')
         .get()
         .addEventListener('click', this.MovePan)
   }
   MovePan() {
      this.#path = this.#path.slice(this.#diceSum);
      this.setCell();
      this.DrawPan();
   }
}