const $square = (() => {
   let allsquares = $js(`.cell`).extend(`.start-cell, .finish-cell`);
   let rightSequence = [];
   return allsquares;
})();
const yellowPath = [];


log($square)

class Team {
   constructor (name) {
      this.name = name;

   }
}