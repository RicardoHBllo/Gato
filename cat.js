//Se declaran variables
const canvasSize = 600;
const urlParams = new URLSearchParams(window.location.search);
const canvas = document.getElementById('canvas');
const mih1 = document.getElementById("miH1");
const ctx = canvas.getContext('2d');
const name1 = urlParams.get('name1');
const name2 = urlParams.get('name2');
const sizeCat = urlParams.get('size');
const size = parseInt(sizeCat, 10);
const GX = "Turno     " + name1;
const GO = "Turno     " + name2;
const X = "Gana " + name1;
const O = "Gana " + name2;
const N = "Nadie gana";
const color = "#228B22";
const cuadro = parseInt(canvasSize / size, 10);
const aux = (canvasSize / (size * 4));
var matriz = [];
var matriz2 = [];
let score1 = 0;
let score2 = 0;
let empates = 0;
const greenLine = canvas.getContext('2d');

//para testear
console.log(name1, name2, size);
mih1.innerHTML = GX;

for (var i = 0; i < size; i++) {
    matriz[i] = new Array(size).fill(0); // Crea una matriz de ceros
}
for (var i = 0; i < size; i++) {
    matriz2[i] = new Array(size).fill({ x: 0, y: 0 }); // Crea una matriz de ceros
}

n = 0;

//definir el turno para dibujar
function iswhat(x, y, index) {
    if (n % 2 == 0) {
        n++;
        ctx.strokeStyle = "#f36d59";
        ctx.lineWidth = 10;
        drawx(x, y);
        mih1.style.backgroundColor = "#DEB887";
        matriz[Math.floor(index / size)][index % size] = 1;

    } else {
        n++;
        ctx.strokeStyle = "#59f38f";
        ctx.lineWidth = 10;
        drawcircle(x, y);
        mih1.style.backgroundColor = "#DEB887";
        matriz[Math.floor(index / size)][index % size] = 2;
    }
    console.log(n);
}

// Dibujar el tablero

console.log(cuadro);

function createCat() {
    ctx.beginPath();
    ctx.strokeStyle = "#6b6b30";
    ctx.lineWidth = 5;
    for (i = 0; i < size - 1; i++) {
        ctx.moveTo(cuadro * (i + 1), 0);
        ctx.lineTo(cuadro * (i + 1), cuadro * size);
    }
    for (i = 0; i < size - 1; i++) {
        ctx.moveTo(0, cuadro * (i + 1));
        ctx.lineTo(cuadro * size, cuadro * (i + 1));
    }
    ctx.stroke();
}
createCat();

function clearMat() {
    for (var i = 0; i < size; i++) {
        matriz[i].fill(0);
    }
}

// Dibujar una equis en la celda 
function drawx(z, w) {

    ctx.beginPath();
    ctx.moveTo(z - aux, w - aux);
    ctx.lineTo(z + aux, w + aux);
    ctx.moveTo(z - aux, w + aux);
    ctx.lineTo(z + aux, w - aux);
    ctx.stroke();
}

// Dibujar un círculo en la celda 
function drawcircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, (canvasSize / sizeCat) / 4, 0, 2 * Math.PI);
    ctx.stroke();
}

//posicion para saber donde dibujar
function position(x, y) {
    var newX;
    var newY;
    var width = size;
    var height = size;
    var index = Math.floor(y / (canvasSize / height)) * width + Math.floor(x / (canvasSize / width));

    if (matriz[Math.floor(index / width)][index % width] == 0) {
        var centerX = (Math.floor(x / (canvasSize / width)) * (canvasSize / width)) + (canvasSize / width / 2);
        var centerY = (Math.floor(y / (canvasSize / height)) * (canvasSize / height)) + (canvasSize / height / 2);
        newX = matriz2[Math.floor(index / width)][index % width].x = centerX;
        newY = matriz2[Math.floor(index / width)][index % width].y = centerY;
        iswhat(centerX, centerY, index);
        areWinner(index, newX, newY);
    }
    else {
        alert("Tire de nuevo");
    }
}

function drawLine(x1, y1, x2, y2, color) {
    greenLine.beginPath();
    greenLine.strokeStyle = color;
    greenLine.lineWidth = 10;
    greenLine.moveTo(x1, y1);
    greenLine.lineTo(x2, y2);
    greenLine.stroke();
}

function checkWin() {
    var winner = 0;

    //Verificar filas
    for (var i = 0; i < size; i++) {
        var rowSum = matriz[i].reduce((a, b) => a + b);
        if (rowSum == size || rowSum == size * 2) {
            winner = rowSum / size;
            drawLine(matriz2[i][0].x, matriz2[i][0].y, matriz2[i][size - 1].x, matriz2[i][size - 1].y, "#00ff00");
            break;
        }
    }

    //Verificar columnas
    for (var i = 0; i < size; i++) {
        var colSum = matriz.map(row => row[i]).reduce((a, b) => a + b);
        if (colSum == size || colSum == size * 2) {
            winner = colSum / size;
            drawLine(matriz2[0][i].x, matriz2[0][i].y, matriz2[size - 1][i].x, matriz2[size - 1][i].y, "#00ff00");
            break;
        }
    }

    //Verificar diagonales
    var diagonalSum1 = matriz.map((row, i) => row[i]).reduce((a, b) => a + b);
    if (diagonalSum1 == size || diagonalSum1 == size * 2) {
        winner = diagonalSum1 / size;
        drawLine(matriz2[0][0].x, matriz2[0][0].y, matriz2[size - 1][size - 1].x, matriz2[size - 1][size - 1].y, "#00ff00");
    }

    var diagonalSum2 = matriz.map((row, i) => row[size - 1 - i]).reduce((a, b) => a + b);
    if (diagonalSum2 == size || diagonalSum2 == size * 2) {
        winner = diagonalSum2 / size;
        drawLine(matriz2[0][size - 1].x, matriz2[0][size - 1].y, matriz2[size - 1][0].x, matriz2[size - 1][0].y, "#00ff00");
    }
}


//para saber quien gana
function areWinner(index, x, y) {

    const mih1 = document.getElementById("miH1");
    if (matriz[Math.floor(index / size)][index % size] == 2) mih1.innerHTML = GX;
    else mih1.innerHTML = GO;

    // Verificar si hay un ganador en cada una de las filas
    for (var i = 0; i < matriz.length; i++) {
        var fila = matriz[i];
        if (fila.every(val => val === 1)) {
            mih1.style.backgroundColor = color;
            mih1.innerHTML = X;
            score1++;
            document.getElementById("score1").innerHTML = name1 + ": " + score1;
            clearMat();
            return true;
        } else if (fila.every(val => val === 2)) {
            mih1.style.backgroundColor = color;
            mih1.innerHTML = O;
            score2++;
            document.getElementById("score2").innerHTML = name2 + ": " + score2;
            clearMat();
            return true;
        }
    }

    // Verificar si hay un ganador en cada una de las columnas
    for (var j = 0; j < matriz.length; j++) {
        var columna = matriz.map(fila => fila[j]);
        if (columna.every(val => val === 1)) {
            mih1.style.backgroundColor = color;
            mih1.innerHTML = X;
            score1++;
            document.getElementById("score1").innerHTML = name1 + ": " + score1;
            clearMat();
            return true;
        } else if (columna.every(val => val === 2)) {
            mih1.style.backgroundColor = color;
            mih1.innerHTML = O;
            score2++;
            document.getElementById("score2").innerHTML = name2 + ": " + score2;
            clearMat();
            return true;
        }
    }

    // Verificar si hay un ganador en la diagonal principal
    var diagonal1 = matriz.map((fila, i) => fila[i]);
    if (diagonal1.every(val => val === 1)) {
        mih1.style.backgroundColor = color;
        mih1.innerHTML = X;
        score1++;
        document.getElementById("score1").innerHTML = name1 + ": " + score1;
        clearMat();
        return true;
    } else if (diagonal1.every(val => val === 2)) {
        mih1.style.backgroundColor = color;
        mih1.innerHTML = O;
        score2++;
        document.getElementById("score2").innerHTML = name2 + ": " + score2;
        clearMat();
        return true;
    }

    // Verificar si hay un ganador en la diagonal secundaria
    var diagonal2 = matriz.map((fila, i) => fila[matriz.length - i - 1]);
    if (diagonal2.every(val => val === 1)) {
        mih1.style.backgroundColor = color;
        mih1.innerHTML = X;
        score1++;
        document.getElementById("score1").innerHTML = name1 + ": " + score1;
        clearMat();
        return true;
    } else if (diagonal2.every(val => val === 2)) {
        mih1.style.backgroundColor = color;
        mih1.innerHTML = O;
        score2++;
        document.getElementById("score2").innerHTML = name2 + ": " + score2;
        clearMat();
        return true;
    }

    // Si no hay ganador y no quedan espacios vacíos, es un empate
    if (matriz.flat().indexOf(0) == -1) {
        change = N;
        empates++;
        document.getElementById("empate").innerHTML = "Empates: " + empates;
        clearMat();
        return true;
    }

    return false;

}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    console.log(evt.clientX - rect.left, evt.clientY - rect.top);
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

canvas.addEventListener('click', function (evt) {
    const { x, y } = getMousePos(canvas, evt);
    position(x, y);
}, false);

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // borra todo el contenido del canvas
    clearMat(); // reinicia la matriz
    createCat();
    mih1.innerHTML = GX; // restablece el turno
    mih1.style.backgroundColor = "#DEB887"; // restablece el color de fondo del encabezado
    n = 0; // reinicia el contador de turnos
    document.getElementById("score1").innerHTML = name1 + ": " + score1; // actualiza la puntuación del jugador 1 en la página
    document.getElementById("score2").innerHTML = name2 + ": " + score2; // actualiza la puntuación del jugador 2 en la página
    document.getElementById("empates").innerHTML = "Empates: " + empates; // actualiza la puntuación de empates en la página
}

