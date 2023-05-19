const colors = ['red', 'green', 'blue', 'yellow']
const $wrap = $js(`main`);
const size = {width: 8, height: 14};


const isColor = (i, j) => {
   green = [[0, 3], [0, 4], [1, 3], [1, 4], [1, 5], [1, 6]];
   blue = [[7, 0], [6, 0], [7, 1], [6, 1], [5, 1], [4, 1]];
   red = [[13, 4], [13, 3], [12, 4], [12, 3], [12, 2], [12, 1]];
   yellow = [[6, 7], [7, 7], [6, 6], [7, 6], [8, 6], [9,6]];

   for(let k = 0; k < 6; k++) {
      if (i == green[k][0] && j == green[k][1])
         return k == 0 && 'team-green greenbg finish-cell' || i == 0 && 'team-green greenbg start-cell' || 'team-green greenbg finish-path';
      if (i == blue[k][0] && j == blue[k][1])
         return k == 0 && 'team-blue bluebg finish-cell' || j == 0 && 'team-blue bluebg start-cell' || 'team-blue bluebg finish-path';
      if (i == red[k][0] && j == red[k][1])
         return k == 0 && 'team-red redbg finish-cell' || i == 13 && 'team-red redbg start-cell' || 'team-red redbg finish-path';
      if (i == yellow[k][0] && j == yellow[k][1])
         return k == 0 && 'team-yellow yellowbg finish-cell' || j == 7 && 'team-yellow yellowbg start-cell' || 'team-yellow yellowbg finish-path';
   }
   return null;
}
function setTable () {
   let html = ``;
   for (let i = 0; i < size.height; i++) {
      for (let j = 0; j < size.width; j++) {
         if (j != 0 && j != size.width - 1) {
            if (i != 0 && i != size.height - 1) {
               if (isColor(i, j))
                  html += `<span class="${isColor(i, j)}"></span>\n`;
               else 
                  html += '<span class="invisible"></span>\n';
               continue;
            }
         }
         if (isColor(i, j))
            html += `<span class="${isColor(i, j)}"></span>\n`;
         else 
            html += '<span class="cell"></span>\n';
      }
   }
   $wrap.ihtml(html);



   
}

setTable();

