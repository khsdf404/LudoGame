class Pan {
   #coord = -1;
   #path = [];
   #cell;
   #color;
   constructor(path, color) {
      this.#color = color;
      this.#path = path;
      this.#coord = 0;
      this.setCell();
      this.DrawPan();
      // log(this.#path)
      // log(this.#path[0]);
      // log($cells.get(this.#path[0]))
   }
   setCell() {
      this.#cell = $cells.find(this.#path[this.#coord]);
   }
   DrawPan() {
      this.#cell.addClass('pan').addClass(`pan-${this.#color}`);
      
   }
}