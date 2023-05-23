function SixAmount(arr) {
   let cnt = 0;
   let sum = 0;
   arr.forEach(el => {
      if (el == 6) cnt++;
      sum += el;
   });
   return cnt || sum == 6 && 1 || 0;
}


class Player {
   Name;
   Colors;
   Dices;
   #teams = [];
   #teamsAmount;
   constructor(colors, name) {
      this.Name = name;
      this.Colors = colors;
      for(let i = 0; i < colors.length; i++) {
         this.#teams.push(new Team(colors[i], this))
      }
      this.#teamsAmount = colors.length;
   }
   DiceThrow(DiceAmount) {
      const random = (min, max) => Math.round(Math.random() * (max - min)) + min;
      let arr = [];
      for (let i = 0; i < DiceAmount; i++) {
         arr.push(random(1, 6));
      } 
      this.Dices = arr;
      if (SixAmount(arr) > 0) {
         this.AllowAppend();
      } 
   }
   hasMove() {
      // swap true on DicesHaveMove() in future
      return this.Dices.length > 0 && true || SixAmount(this.Dices) > 0;
   }


   AllowAppend() {
      for (let i = 0; i < this.#teamsAmount; i++) {
         this.#teams[i].AllowAppend(this);
      }
   };
   CancelAppend() {
      for (let i = 0; i < this.#teamsAmount; i++) {
         this.#teams[i].CancelAppend();
      }
   }; 
}