const colors = ['blue', 'green', 'yellow', 'red']
const colorsCoord = [
   [[0, 3], [0, 4], [1, 3], [1, 4], [1, 5], [1, 6]],
   [[6, 7], [7, 7], [6, 6], [7, 6], [8, 6], [9,6]],
   [[13, 4], [13, 3], [12, 4], [12, 3], [12, 2], [12, 1]],
   [[7, 0], [6, 0], [7, 1], [6, 1], [5, 1], [4, 1]]
]
const colorRequires = (index, i, j) => {
   if (index == 0) return i == 0;
   if (index == 1) return j == 7;
   if (index == 2) return i == 13;
   if (index == 3) return j == 0;
}
const $wrap = $js(`main`);
const size = {width: 8, height: 14};



const isColor = (i, j) => {
   for (let z = 0; z < 4; z++) { // 4 teams
      for(let k = 0; k < 6; k++) { // 6 colored squares
         if (i == colorsCoord[z][k][0] && j == colorsCoord[z][k][1])
            return (k == 0 && `team-${colors[z]} ${colors[z]}bg finish-cell` 
               || colorRequires(z, i, j) && `team-${colors[z]} ${colors[z]}bg start-cell` 
               || `team-${colors[z]} ${colors[z]}bg finish-path`);
      }
   }
   
   return null;
}
function setTable () {
   let html = ``;
   for (let i = 0; i < size.height; i++) {
      for (let j = 0; j < size.width; j++) {
         let colorClass = isColor(i, j)
         if (j != 0 && j != size.width - 1) {
            if (i != 0 && i != size.height - 1) {
               if (colorClass)
                  html += `<span class="${colorClass}"></span>\n`;
               else 
                  html += '<span class="invisible"></span>\n';
               continue;
            }
         }
         if (colorClass) {
            html += `<span class="${colorClass}">${(() => {
               if (colorClass.indexOf('start') > -1)
                  return `<svg xmlns="http://www.w3.org/2000/svg" height="34" width="34" viewBox="0 96 960 960"><path d="M450 856V606H200v-60h250V296h60v250h250v60H510v250h-60Z"/></svg>`
               return ``
            })()}</span>\n`;
         }
         else 
            html += '<span class="cell"></span>\n';
      }
   }
   $wrap.ihtml(html);
}

setTable();
const $cells = $wrap.find('span');