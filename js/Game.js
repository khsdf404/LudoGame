const DiceAmount = 2;
const Player1 = new Player(['red', 'green']);
const Player2 = new Player(['yellow', 'blue']);
const StartPlayer = 0;
const $playbtns = $js(`.play-buttons-wrap button`);


class ActivePlayer {
   static #ActivePlayer = 0;
   static #Players = [Player1, Player2];
   static set(num) {
      this.#ActivePlayer = num;
   }
   static get() {
      log()
      return this.#Players[this.#ActivePlayer];
   }
   static swap() {
      this.#ActivePlayer = Math.abs(this.#ActivePlayer - 1);
      $playbtns.each(($el, i) => {
         if (i == this.#ActivePlayer)
            $el.addClass(`enabled`).removeClass(`disabled`)
         else 
            $el.addClass(`disabled`).removeClass(`enabled`)
      })
   }
}


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
      ActivePlayer.set(StartPlayer); // 0 is an index of player 1
      $playbtns.each(($el, i) => {
         if (i == StartPlayer)
            $el.addClass(`enabled`)
         else 
            $el.addClass(`disabled`)
      })
   } 
   MakeMove() {
      this.ResetMove();
      ActivePlayer.swap();
      let steps = DiceThrow();
      log(`${ActivePlayer.get().colors}, Allow: ${SixAmount(steps) > 0}`)
      if (SixAmount(steps) > 0) {
         ActivePlayer.get().AllowAppend();
         
      }
   }
   ResetMove() {
      ActivePlayer.get().CancelAppend();
   }
}


const NewGame = new Game();  
$playbtns.onClick(($el) => {
   if ($el.hasClass(`enabled`))
      NewGame.MakeMove();
});
$js(`.start-cell`).onClick(($elem) => {
   if ($elem.hasClass(`allowed`))
      NewGame.ResetMove();
})