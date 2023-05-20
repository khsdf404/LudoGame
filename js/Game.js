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

 

class Game { 
   constructor() {
      ActivePlayer.set(StartPlayer); // 0 is an index of player 1
      SetButton(ActivePlayer.getIndex(), 1);
   } 
   MakeMove() {
      SetButton(ActivePlayer.getIndex(), 0);
      ActivePlayer.get().DiceThrow(DiceAmount);
      
      
      if (!ActivePlayer.get().hasMove()) {
         ActivePlayer.swap();
         SetButton(ActivePlayer.getIndex(), 1);
      }    
   }
   ResetMove() {
      ActivePlayer.get().CancelAppend();
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