const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Obtiene las dimensiones de la pantalla actual
const window_height = window.innerHeight;
const window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "#ff8";

// Variable para almacenar las coordenadas del mouse
let mouseX = 0;
let mouseY = 0;

// Variable para almacenar la posición del clic
let clickX = 0;
let clickY = 0;

// Variable para determinar si se hizo clic
let isMouseClicked = false;

class Circle {
    constructor(x, y, radius, color, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.speed = speed;

        this.dx = 1 * this.speed;
        this.dy = 1 * this.speed;
    }

    draw(context) {
        context.beginPath();

        context.strokeStyle = this.color;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.fillText(this.text, this.posX, this.posY);

        context.lineWidth = 2;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
    }

    update(context) {
        this.draw(context);

        if ((this.posX + this.radius) > window_width || (this.posX - this.radius) < 0) {
            this.dx = -this.dx;
        }

        if ((this.posY - this.radius) < 0 || (this.posY + this.radius) > window_height) {
            this.dy = -this.dy;
        }

        this.posX += this.dx;
        this.posY += this.dy;
    }
}

function getDistance(posX1, posY1, posX2, posY2) {
    return Math.sqrt(Math.pow((posX2 - posX1), 2) + Math.pow((posY2 - posY1), 2));
}

let circles = [
    new Circle(Math.random() * window_width, Math.random() * window_height, 50, "blue", "1", 8),
    new Circle(Math.random() * window_width, Math.random() * window_height, 20, "blue", "2", 4),
    new Circle(Math.random() * window_width, Math.random() * window_height, 70, "blue", "3", 5),
    new Circle(Math.random() * window_width, Math.random() * window_height, 90, "blue", "4", 7),
    new Circle(Math.random() * window_width, Math.random() * window_height, 40, "blue", "5", 9),
    new Circle(Math.random() * window_width, Math.random() * window_height, 50, "blue", "6", 11),
    new Circle(Math.random() * window_width, Math.random() * window_height, 70, "blue", "7", 13),
    new Circle(Math.random() * window_width, Math.random() * window_height, 100, "blue", "8", 15),
    new Circle(Math.random() * window_width, Math.random() * window_height, 64, "blue", "9", 17),
    new Circle(Math.random() * window_width, Math.random() * window_height, 87, "blue", "10", 19)
];

function updateCircles() {
    requestAnimationFrame(updateCircles);
    ctx.clearRect(0, 0, window_width, window_height);
    circles.forEach(circle => circle.update(ctx));
    checkCollisions();
}

function checkCollisions() {
    for (let i = 0; i < circles.length; i++) {
        circles[i].color = "blue"; // Restablecer todos los círculos a azul antes de verificar las colisiones
        
        for (let j = 0; j < circles.length; j++) {
            if (i !== j) {
                if (getDistance(circles[i].posX, circles[i].posY, circles[j].posX, circles[j].posY) < (circles[i].radius + circles[j].radius)) {
                    circles[i].color = "red";
                    circles[j].color = "red";

                    // Calcular la nueva dirección para el primer círculo
                    const dx = circles[i].posX - circles[j].posX;
                    const dy = circles[i].posY - circles[j].posY;
                    const angle = Math.atan2(dy, dx);

                    circles[i].dx = Math.cos(angle) * circles[i].speed;
                    circles[i].dy = Math.sin(angle) * circles[i].speed;

                    // Calcular la nueva dirección para el segundo círculo
                    circles[j].dx = -Math.cos(angle) * circles[j].speed;
                    circles[j].dy = -Math.sin(angle) * circles[j].speed;
                }
            }
        }
    }
}

// Función para obtener las coordenadas del mouse dentro del canvas
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    mouseX = evt.clientX - rect.left;
    mouseY = evt.clientY - rect.top;
}

// Manejador de eventos para detectar el movimiento del mouse
canvas.addEventListener('mousemove', function(evt) {
    getMousePos(canvas, evt);
});

// Manejador de eventos para detectar el clic del mouse
canvas.addEventListener('mousedown', function(evt) {
    clickX = evt.clientX - canvas.getBoundingClientRect().left;
    clickY = evt.clientY - canvas.getBoundingClientRect().top;
    isMouseClicked = true;
});

// Función para actualizar las coordenadas del mouse en el canvas
function updateMouseCoordinates(context) {
    context.font = "bold 15px cursive";
    context.fillStyle = "black";
    context.fillText(" X: " + mouseX, 25, 10); // Actualiza el texto con la coordenada X
    context.fillText(" Y: " + mouseY, 25, 25); // Actualiza el texto con la coordenada Y
    
    //if (isMouseClicked) {
        // Dibujar rectángulo desde la posición del clic hasta las coordenadas (1, 1)
        context.strokeStyle = "red";
        context.lineWidth = 2;
        context.strokeRect(clickX, clickY, 1 - clickX, 1 - clickY);

        isMouseClicked = false; // Reinicia la bandera de clic
    //}
}

// Llama a la función para actualizar las coordenadas del mouse en cada frame
function drawMouseCoordinates() {
    ctx.save(); // Guarda el estado del contexto
    updateMouseCoordinates(ctx); // Actualiza las coordenadas del mouse
    ctx.restore(); // Restaura el estado del contexto
    requestAnimationFrame(drawMouseCoordinates); // Llama recursivamente a la función
}

// Manejador de eventos para detectar el clic del mouse
canvas.addEventListener('mousedown', function(evt) {
    clickX = evt.clientX - canvas.getBoundingClientRect().left;
    clickY = evt.clientY - canvas.getBoundingClientRect().top;
    console.log("Coordenadas del clic: X:", clickX, "Y:", clickY);
    isMouseClicked = true;
});

// Manejador de eventos para detectar el clic del mouse
canvas.addEventListener('mousedown', function(evt) {
    clickX = evt.clientX - canvas.getBoundingClientRect().left;
    clickY = evt.clientY - canvas.getBoundingClientRect().top;
    checkCircleClick();
});

function checkCircleClick() {
    circles.forEach(circle => {
        const distance = getDistance(clickX, clickY, circle.posX, circle.posY);
        if (distance < circle.radius) {
            circle.color = "purple"; // Cambia el color del borde
            ctx.fillStyle = "purple"; // Cambia el color de relleno
            ctx.beginPath();
            ctx.arc(circle.posX, circle.posY, circle.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
            console.log("Se hizo clic dentro del círculo", circle.text); // Mensaje en la consola
        }
    });
}

function checkCircleClick() {
    circles.forEach((circle, index) => {
        const distance = getDistance(clickX, clickY, circle.posX, circle.posY);
        if (distance < circle.radius) {
            circle.color = "purple"; // Cambia el color del borde
            ctx.fillStyle = "purple"; // Cambia el color de relleno
            ctx.beginPath();
            ctx.arc(circle.posX, circle.posY, circle.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
            console.log("Se hizo clic dentro del círculo", circle.text); // Mensaje en la consola
            circles.splice(index, 1); // Elimina el círculo de la matriz de círculos
        }
    });
}

updateCircles(); // Llama a la función para actualizar los círculos
drawMouseCoordinates(); // Llama a la función para dibujar las coordenadas del mouse