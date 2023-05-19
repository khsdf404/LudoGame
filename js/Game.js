const DiceAmount = 2;
const Player1 = new Player(['red', 'green']);
const Player2 = new Player(['yellow', 'blue']);
const $playbtn = $js(`#dicefield`);

const ActivePlayer = (() => {
   let cnt = 0;
   return function() {
      return (cnt++)%2 == 0 ? Player1 : Player2;
   }
})();
 

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
   constructor() {

   } 
   MakeMove() {
      let steps = DiceThrow();
      log(`${steps}, Allow: ${SixAmount(steps) > 0}`)
      if (SixAmount(steps) > 0) {
         ActivePlayer().AllowAppend();
      }
   }
}


const NewGame = new Game();
log(Player1.teams)



$js(`#dicefield`).onClick(() => {
   NewGame.MakeMove();
})