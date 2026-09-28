const canvas = document.getElementById("spirographCanvas");
const ctx = canvas.getContext("2d");

const drawButton = document.getElementById("drawButton");
const valuesDisplay = document.getElementById("valuesDisplay");
const statusMessage = document.getElementById("statusMessage");
let animationId = null;

// Colors that match the Midnight Lab theme
const colors = [
    "#48d9ff",
    "#38f2c3",
    "#7c83ff",
    "#b56cff",
    "#00e5ff",
    "#4cff88"
];

// Finds the greatest common divisor
function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }

    return a;
}

// Returns a random whole number
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Starts a new Spirograph
function drawSpirograph() {

    // Stop the previous drawing if the button is clicked again
    if (animationId) {
        cancelAnimationFrame(animationId);
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Random valid values
    const R = randomNumber(90, 170);
    const r = randomNumber(25, Math.min(80, R));
    const O = randomNumber(20, 90);

    // Pick a random line color
    const color = colors[randomNumber(0, colors.length - 1)];

    // Display the values used
    valuesDisplay.innerHTML =
        `R: ${R} &nbsp; | &nbsp; r: ${r} &nbsp; | &nbsp; O: ${O}`;
        
statusMessage.textContent = "Pattern Generated";
    // Center of canvas
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Scale the drawing so it stays inside the canvas
    const maxRadius = R + (2 * r) + O;
    const scale = 270 / maxRadius;

    // Starting value for t
    let t = 0;

    // Small increment creates a smooth curve
    const increment = 0.02;

    // Calculate when the pattern closes
    const turns = r / gcd(R, r);
    const maxT = Math.PI * 2 * turns;

    // Set drawing style
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.shadowColor = color;
    ctx.shadowBlur = 5;

    // Find the first point
    let previousX =
        (R + r) * Math.cos(t) -
        (r + O) * Math.cos(((R + r) / r) * t);

    let previousY =
        (R + r) * Math.sin(t) -
        (r + O) * Math.sin(((R + r) / r) * t);

    function animate() {

        // Draw several small pieces each frame
        for (let i = 0; i < 20; i++) {

            if (t >= maxT) {
                cancelAnimationFrame(animationId);
                animationId = null;
                return;
            }

            t += increment;

            // Spirograph equations from the assignment
            const x =
                (R + r) * Math.cos(t) -
                (r + O) * Math.cos(((R + r) / r) * t);

            const y =
                (R + r) * Math.sin(t) -
                (r + O) * Math.sin(((R + r) / r) * t);

            ctx.beginPath();

            ctx.moveTo(
                centerX + previousX * scale,
                centerY + previousY * scale
            );

            ctx.lineTo(
                centerX + x * scale,
                centerY + y * scale
            );

            ctx.stroke();

            previousX = x;
            previousY = y;
        }

        animationId = requestAnimationFrame(animate);
    }

    animate();

    drawButton.textContent = "Generate Another";
}

// Run when the button is clicked
drawButton.addEventListener("click", drawSpirograph);