function DiceThrow() {
   const random = (min, max) => Math.round(Math.random() * (max - min)) + min;
   log(random(1, 6));
}

$js(`#dicefield`).onClick(() => {
   DiceThrow();
})