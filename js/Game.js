const DiceAmount = 2;
const team1 = ['red', 'green'];
const team2 = ['yellow', 'blue'];
const Player1 = new Player(team1, 'First');
const Player2 = new Player(team2, 'Second');
const Players = [Player1, Player2]
const StartPlayer = 0;
const $playBtns = $js(`.play-buttons-wrap button`);
const $startCells = $js(`.start-cell`);


function SetButton(index, state) {
   let added = state ? 'enabled' : 'disabled'
   let removed = !state ? 'enabled' : 'disabled'
   $playBtns
      .clone()
      .filter(($el, i) => { return i == index })
      .addClass(added)
      .removeClass(removed);
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
      SetButton(ActivePlayer.getIndex(), 1);

      $playBtns.onClick(($el) => {
         if ($el.hasClass(`enabled`))
            this.Move();
      });
   } 
   Move() {
      SetButton(0, 0);
      SetButton(1, 0);
      ActivePlayer.get().DiceThrow(DiceAmount);
      setTitle(`Dices: ${ActivePlayer.get().getDices()} [${ActivePlayer.get().getName()}]`, ActivePlayer.get().hasMove());
      if (!ActivePlayer.get().hasMove()) {
         ActivePlayer.swap();
         SetButton(ActivePlayer.getIndex(), 1);
         return;
      }
      ActivePlayer.get().Move(); 
   }
   EndMove() {
      // ActivePlayer.get().EndMove();
      setTitle(`[${ActivePlayer.get().getName()}] append a piece`, 0);
      ActivePlayer.swap(); 
      SetButton(ActivePlayer.getIndex(), 1);
   }
}

const NewGame = new Game();