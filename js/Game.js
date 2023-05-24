const DiceAmount = 2;
const team1 = ['red', 'green'];
const team2 = ['yellow', 'blue'];
const Player1 = new Player(team1, 'First');
const Player2 = new Player(team2, 'Second');
const Players = [Player1, Player2]
const StartPlayer = 0;
const $playBtn = $js(`.play-buttons-wrap button`);
const $startCells = $js(`.start-cell`);


function setButton(state, text) {
   let classToAdd = state ? 'enabled' : 'disabled'
   let classToRemove = !state ? 'enabled' : 'disabled'
   $playBtn
      .addClass(classToAdd)
      .removeClass(classToRemove)
      .text(text);
}
const setTitle = (() => {
   $Title = $js(`.title-text`);
   
   return function(text, state) {
      $Title.text(text)
      if (state)
         $Title.addClass(`hasMove`)
      else 
         $Title.removeClass('hasMove')
   }
})()
 

class Game { 
   constructor() {
      Player1.setParent(this);
      Player2.setParent(this);
      ActivePlayer.set(StartPlayer); // 0 is an index of player 1
      setButton(true, `Ход { ${ActivePlayer.get().getName()} }`);

      $playBtn.onClick(($el) => {
         if ($el.hasClass(`enabled`))
            this.Move();
      });
   } 
   Move() {
      setButton(false, `Ожидание завершения хода`);
      ActivePlayer.get().DiceThrow(DiceAmount);
      setTitle(`Dices: ${ActivePlayer.get().getDices()} [${ActivePlayer.get().getName()}]`, ActivePlayer.get().hasMove());
      if (!ActivePlayer.get().hasMove()) {
         ActivePlayer.swap();
         setButton(true, `Ход { ${ActivePlayer.get().getName()} }`);
         return;
      }
      ActivePlayer.get().Move(); 
   }
   EndMove() {
      setTitle(`[${ActivePlayer.get().getName()}] append a piece`, 0);
      ActivePlayer.swap(); 
      setButton(true, `Ход { ${ActivePlayer.get().getName()} }`);
   }
}

const NewGame = new Game();