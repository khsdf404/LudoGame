const colors = ['red', 'green', 'blue', 'yellow']
const $wrap = $js(`main`);
const size = {width: 8, height: 14};


const isColor = (i, j) => {
   green = [[0, 2], [0, 3], [1, 3], [1, 4], [1, 5], [1, 6]];
   blue = [[8, 0], [7, 0], [7, 1], [6, 1], [5, 1], [4, 1]];
   red = [[13, 5], [13, 4], [12, 4], [12, 3], [12, 2], [12, 1]];
   yellow = [[5, 7], [6, 7], [6, 6], [7, 6], [8, 6], [9,6]];

   for(let k = 0; k < 6; k++) {
      if (i == green[k][0] && j == green[k][1])
         return k == 0 && 'greenbg start-cell' || 'greenbg finish-cell';
      if (i == blue[k][0] && j == blue[k][1])
         return k == 0 && 'bluebg start-cell' || 'bluebg finish-cell';
      if (i == red[k][0] && j == red[k][1])
         return k == 0 && 'redbg start-cell' || 'redbg finish-cell';
      if (i == yellow[k][0] && j == yellow[k][1])
         return k == 0 && 'yellowbg start-cell' ||  'yellowbg finish-cell';
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

log($js(`span`).not('.invisible'))