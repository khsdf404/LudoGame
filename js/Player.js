class Player {
   colors;
   #teams = [];
   #teamsAmount;
   constructor(colors) {
      this.colors = colors;
      for(let i = 0; i < colors.length; i++) {
         this.#teams.push(new Team(colors[i]))
      }
      this.#teamsAmount = colors.length;
   }
   AllowAppend() {
      for (let i = 0; i < this.#teamsAmount; i++) {
         this.#teams[i].AllowAppend();
      }
   };
   CancelAppend() {
      for (let i = 0; i < this.#teamsAmount; i++) {
         this.#teams[i].CancelAppend();
      }
   };
}