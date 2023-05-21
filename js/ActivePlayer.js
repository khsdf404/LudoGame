class ActivePlayer {
   static #ActivePlayer = 0;
   static set(num) {
      this.#ActivePlayer = num;
   }
   static get() {
      return Players[this.#ActivePlayer];
   }
   static swap() {
      this.#ActivePlayer = Math.abs(this.#ActivePlayer - 1);
   }
   static getIndex() {
      return this.#ActivePlayer;
   }
}