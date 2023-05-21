const DiceAmount = 2;
const team1 = ['red', 'green'];
const team2 = ['yellow', 'blue'];
const Player1 = new Player(team1, 'Danil');
const Player2 = new Player(team2, 'Nastya');
const Players = [Player1, Player2]
const StartPlayer = 0;
const $playbtns = $js(`.play-buttons-wrap button`);

 

function SetButton(index, state) {
   let added = state ? 'enabled' : 'disabled'
   let removed = !state ? 'enabled' : 'disabled'
   $playbtns
      .clone()
      .filter(($el, i) => { return i == index })
      .addClass(added)
      .removeClass(removed);
}
const setTitle = (() => {
   $text = $js(`.title-text`);
   
   return function(text, state) {
      $text.text(text)
      if (state)
         $text.addClass(`hasMove`)
      else 
         $text.removeClass('hasMove')
   }
})()
 

class Game { 
   constructor() {
      ActivePlayer.set(StartPlayer); // 0 is an index of player 1
      SetButton(ActivePlayer.getIndex(), 1);
   } 
   MakeMove() {
      SetButton(0, 0);
      SetButton(1, 0);
      ActivePlayer.get().DiceThrow(DiceAmount);
      setTitle(`Dices: ${ActivePlayer.get().Dices} [${ActivePlayer.get().Name}]`, ActivePlayer.get().hasMove());
      

      if (!ActivePlayer.get().hasMove()) {
         ActivePlayer.swap();
         SetButton(ActivePlayer.getIndex(), 1);
      }    
   }
   ResetMove() {
      ActivePlayer.get().CancelAppend();
      setTitle(`[${ActivePlayer.get().Name}] append a piece`, 0);
      ActivePlayer.swap(); 
      SetButton(ActivePlayer.getIndex(), 1);
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