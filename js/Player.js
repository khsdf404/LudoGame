class Player {
   #name = '';
   #colors = [];
   #dices = [];
   #teams = [];
   #parent = null;
   constructor(colors, name) {
      this.#name = name;
      this.#colors = colors;
      for(let i = 0; i < colors.length; i++) 
         this.#teams.push( new Team(colors[i], this) )
   }
   setParent(parent) {
      this.#parent = parent;
   }
   getName() {
      return this.#name;
   }
   getDices() { 
      return this.#dices 
   };


   
   DiceThrow(DiceAmount) {
      const random = (min, max) => Math.round(Math.random() * (max - min)) + min;
      let arr = [];
      for (let i = 0; i < DiceAmount; i++) {
         arr.push(random(1, 6));
      } 
      this.#dices = arr;
   }
   
   

   SixAmount() {
      let cnt = 0;
      let sum = 0;
      this.#dices.forEach(el => {
         if (el == 6) cnt++;
         sum += el;
      });
      return cnt || sum == 6 && 1 || 0;
   }
   hasPans() {
      for (let i = 0; i < this.#teams.length; i++) {
         if (this.#teams[i].hasPans() == true)
            return true
      }
      return false;
   }
   hasMove() {
      return this.hasPans() && true || this.SixAmount() > 0;
   }
   


   Move() {
      if (this.SixAmount() > 0) this.#AllowAppend();
      if (this.hasPans()) this.#MovablePans(this.#dices[0] + this.#dices[1]);
   }
   EndMove() {
      this.#CancelAppend();
      this.#UnmovablePans();
      this.#parent.EndMove();
   }




   #AllowAppend() {
      this.#EachTeam((team) => {
         team.AllowAppend(this);
      })
   };
   #CancelAppend() {
      this.#EachTeam((team) => {
         team.CancelAppend();
      })
   };
   #MovablePans(diceSum) {
      this.#EachTeam((team) => {
         team.MovablePans(diceSum);
      })
   }
   #UnmovablePans() {
      this.#EachTeam((team) => {
         team.UnmovablePans();
      })
   }



   #EachTeam(f) {
      for (let i = 0; i < this.#teams.length; i++) {
         f(this.#teams[i])
      }
   }
}