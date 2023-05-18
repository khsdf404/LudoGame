const DiceAmount = 2;
const Player1 = new Player;
const Player2 = new Player;
const $playbtn = $js(`#dicefield`);


function DiceThrow() {
   const random = (min, max) => Math.round(Math.random() * (max - min)) + min;
   let arr = [];
   for (let i = 0; i < DiceAmount; i++) {
      arr.push(random(1, 6));
   }
   return arr;
}
function SixAmount(arr) {
   cnt = 0;
   sum = 0;
   arr.forEach(el => {
      if (el == 6) cnt++;
      sum += el;
   });
   return cnt || sum == 6 && 1 || 0;
}

class Game {
   MakeMove() {
      let steps = DiceThrow();
      log(`${steps}, Allow: ${SixAmount(steps) > 0}`)
      if (SixAmount(steps) > 0) {
         // allow to add Pan:
            // Player1.Allow()

         // show possible moves when click on squares with pans
            // Player1.RefreshPanWays
      }
   }
}


const game = new Game;

$js(`#dicefield`).onClick(() => {
   game.MakeMove();
})