const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

arr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
n = 0;

function iswhat(x, y) {
    if (n % 2 == 0) {
        n++;
        drawx(x, y);
    } else {
        n++;
        drawcircle(x, y);
    }
    console.log(n);
}

// Dibujar el tablero
ctx.beginPath();
ctx.moveTo(200, 0);
ctx.lineTo(200, 600);
ctx.moveTo(400, 0);
ctx.lineTo(400, 600);
ctx.moveTo(0, 200);
ctx.lineTo(600, 200);
ctx.moveTo(0, 400);
ctx.lineTo(600, 400);
ctx.stroke();

// Dibujar una equis en la celda 
function drawx(z, w) {
    ctx.beginPath();
    ctx.moveTo(z - 50, w - 50);
    ctx.lineTo(z + 50, w + 50);
    ctx.moveTo(z - 50, w + 50);
    ctx.lineTo(z + 50, w - 50);
    ctx.stroke();
}

// Dibujar un círculo en la celda 
function drawcircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 70, 0, 2 * Math.PI);
    ctx.stroke();
}

function position(ID, i) {
    if (ID == "sq1" && arr[i] == 0) { iswhat(100, 100); arr[i] = 1; }                      // circle(100,100)
    else if (ID == "sq2" && arr[i] == 0) { iswhat(300, 100); arr[i] = 1; }                 // circle(300,100)
    else if (ID == "sq3" && arr[i] == 0) { iswhat(500, 100); arr[i] = 1; }                 // circle(500,100)
    else if (ID == "sq4" && arr[i] == 0) { iswhat(100, 300); arr[i] = 1; }                 // circle(100,300)
    else if (ID == "sq5" && arr[i] == 0) { iswhat(300, 300); arr[i] = 1; }                 // circle(300,300)
    else if (ID == "sq6" && arr[i] == 0) { iswhat(500, 300); arr[i] = 1; }                 // circle(500,300)
    else if (ID == "sq7" && arr[i] == 0) { iswhat(100, 500); arr[i] = 1; }                 // circle(100,500)
    else if (ID == "sq8" && arr[i] == 0) { iswhat(300, 500); arr[i] = 1; }                 // circle(300,500)
    else if (ID == "sq9" && arr[i] == 0) { iswhat(500, 500); arr[i] = 1; }                 // circle(500,500)

}

