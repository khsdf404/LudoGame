class Player {
   Name;
   Colors;
   Dices;
   #teams = [];
   constructor(colors, name) {
      this.Name = name;
      this.Colors = colors;
      for(let i = 0; i < colors.length; i++) {
         this.#teams.push(new Team(colors[i], this))
      }
   }


   DiceThrow(DiceAmount) {
      const random = (min, max) => Math.round(Math.random() * (max - min)) + min;
      let arr = [];
      for (let i = 0; i < DiceAmount; i++) {
         arr.push(random(1, 6));
      } 
      this.Dices = arr;
   }
   
   SixAmount() {
      let cnt = 0;
      let sum = 0;
      this.Dices.forEach(el => {
         if (el == 6) cnt++;
         sum += el;
      });
      return cnt || sum == 6 && 1 || 0;
   }
   hasMove() {
      return this.HasPans() && true || this.SixAmount() > 0;
   }
   HasPans() {
      for (let i = 0; i < this.#teams.length; i++) {
         if (this.#teams[i].HasPans() == true)
            return true
      }
      return false;
   }


   Move() {
      if (this.SixAmount() > 0) this.#AllowAppend();
      if (this.HasPans()) this.#MovablePans(this.Dices[0] + this.Dices[1]);
   }
   EndMove() {
      this.#CancelAppend();
      this.#UnmovablePans();
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