var KEY_ENTER = 13,
KEY_LEFT = 37,
KEY_UP = 38,
KEY_RIGHT = 39,
KEY_DOWN = 40,
canvas = null,
ctx = null,
lastPress = null,
pause = true,
dir = 0,
score = 0,
player = null,
food = null;

window.requestAnimationFrame = (function () {
return window.requestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame ||
function (callback) {
window.setTimeout(callback, 17);
};
}());
document.addEventListener('keydown', function (evt) {
lastPress = evt.which;
}, false);

function Rectangle(x, y, width, height) {
this.x = (x == null) ? 0 : x;
this.y = (y == null) ? 0 : y;
this.width = (width == null) ? 0 : width;
this.height = (height == null) ? this.width : height;
this.intersects = function (rect) {
if (rect == null) {
window.console.warn('Faltan parámetros en las intersecciones de funciones');
} else {
return (this.x < rect.x + rect.width &&
this.x + this.width > rect.x &&
this.y < rect.y + rect.height &&
this.y + this.height > rect.y);
}
};
this.fill = function (ctx) {
if (ctx == null) {
window.console.warn('Faltan parámetros en función de relleno');
} else {
ctx.fillRect(this.x, this.y, this.width, this.height);
}
};
}

function random(max) {
    return Math.floor(Math.random() * max);
}

function paint(ctx) {
    // Limpiar canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Dibujar jugador
    ctx.fillStyle = 'rgba(0, 255, 0, 0.877)';
    player.fill(ctx);
    // Dibujar alimento
    ctx.fillStyle = 'rgba(245, 63, 63, 0.877)';
    food.fill(ctx);
    // Depuración de la última tecla presionada
    ctx.fillStyle = 'rgb(85, 215, 255)';
    //ctx.fillText('Last Press: '+lastPress,0,20);
    // Dibujar puntaje
    ctx.fillText('Puntaje: ' + score, 0, 10);
    // Dibujar pausa
    if (pause) {
    ctx.textAlign = 'center';
    ctx.fillText('PAUSA', 150, 75);
    ctx.textAlign = 'left';
    }
}

function act() {
    if (!pause) {
    // Cambiar direccion
    if (lastPress == KEY_UP) {
    dir = 0;
    }
    if (lastPress == KEY_RIGHT) {
    dir = 1;
    }
    if (lastPress == KEY_DOWN) {
    dir = 2;
    }
    if (lastPress == KEY_LEFT) {
    dir = 3;
    }
    // Mover rectangulo
    if (dir == 0) {
    player.y -= 10;
    }
    if (dir == 1) {
    player.x += 10;
    }
    if (dir == 2) {
    player.y += 10;
    }
    if (dir == 3) {
    player.x -= 10;
    }
    // Fuera de la pantalla
    if (player.x > canvas.width) {
    player.x = 0;
    }
    if (player.y > canvas.height) {
    player.y = 0;
    }
    if (player.x < 0) {
    player.x = canvas.width;
    }
    if (player.y < 0) {
    player.y = canvas.height;
    }
    // Intersecciones de alimentos
    if (player.intersects(food)) {
    score += 1;
    food.x = random(canvas.width / 10 - 1) * 10;
    food.y = random(canvas.height / 10 - 1) * 10;
    }
    }
    // Pausa / Sin pausa
    if (lastPress == KEY_ENTER) {
    pause = !pause;
    lastPress = null;
    }
    }

    function repaint() {
        window.requestAnimationFrame(repaint);
        paint(ctx);
    }

    function run() {
        setTimeout(run, 50);
        act();
    }

    function init() {
        // Obtener canvas y contexto
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        // Creacion del jugador y el alimento
        player = new Rectangle(40, 40, 10, 10);
        food = new Rectangle(80, 80, 10, 10);
        // Comenzar el juego
        run();
        repaint();
        }

        window.addEventListener('load', init, false);