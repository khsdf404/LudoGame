class Player {
   teams = [];
   constructor(colors) {
      for(let i = 0; i < colors.length; i++) {
         this.teams.push(new Team(colors[i]))
      }
   }
   AllowAppend() {

   };
}