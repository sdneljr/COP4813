
/* R6'os Blue Motion - Assignment 9 */

const canvas = document.getElementById("animationCanvas");
const ctx = canvas.getContext("2d");

// Our animated poker chip
const chip = {
    x: 140,
    y: 120,
    radius: 48,
    vx: 210,
    vy: 155,
    rotation: 0,
    flash: 0
};

let particles = [];
let lastTime = 0;

// Draw the background grid
function drawBackground() {
    ctx.strokeStyle = "rgba(100, 180, 255, 0.08)";
    ctx.lineWidth = 1;

    for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

// Draw the custom blue poker chip
function drawChip() {
    ctx.save();

    ctx.translate(chip.x, chip.y);
    ctx.rotate(chip.rotation);

    // Electric blue glow
    ctx.shadowColor = chip.flash > 0
        ? "#ffffff"
        : "#008cff";

    ctx.shadowBlur = chip.flash > 0 ? 45 : 22;

    // Chip color gradient
    const gradient = ctx.createRadialGradient(
        0, 0, 5, 0, 0, chip.radius
    );

    gradient.addColorStop(0, "#66c8ff");
    gradient.addColorStop(0.65, "#1665c1");
    gradient.addColorStop(1, "#072c70");

    ctx.beginPath();
    ctx.arc(0, 0, chip.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.shadowBlur = 0;

    // Outer silver-blue border
    ctx.strokeStyle = "#b9e7ff";
    ctx.lineWidth = 4;
    ctx.stroke();

    // Decorative chip ring
    ctx.beginPath();
    ctx.arc(0, 0, 37, 0, Math.PI * 2);
    ctx.strokeStyle = "#d6f2ff";
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 7]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Dark center
    ctx.beginPath();
    ctx.arc(0, 0, 29, 0, Math.PI * 2);
    ctx.fillStyle = "#092c61";
    ctx.fill();

    // Custom lettering
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("R6'os", 0, 0);

    ctx.restore();
}

// Create particles when the chip gets clicked
function createExplosion() {
    for (let i = 0; i < 24; i++) {
        const angle = (Math.PI * 2 * i) / 24;
        const speed = 100 + Math.random() * 170;

        particles.push({
            x: chip.x,
            y: chip.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 0.7,
            size: 2 + Math.random() * 4
        });
    }
}

// Draw and update the particles
function updateParticles(dt) {
    particles = particles.filter(p => p.life > 0);

    for (const p of particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 200, 255, ${Math.max(0, p.life)})`;
        ctx.fill();
    }
}

// Main animation loop
function animate(time) {
    const dt = lastTime
        ? Math.min((time - lastTime) / 1000, 0.05)
        : 0;

    lastTime = time;

    // Move diagonally
    chip.x += chip.vx * dt;
    chip.y += chip.vy * dt;

    // Bounce off left and right walls
    if (chip.x + chip.radius >= canvas.width) {
        chip.x = canvas.width - chip.radius;
        chip.vx = -Math.abs(chip.vx);
    }

    if (chip.x - chip.radius <= 0) {
        chip.x = chip.radius;
        chip.vx = Math.abs(chip.vx);
    }

    // Bounce off top and bottom walls
    if (chip.y + chip.radius >= canvas.height) {
        chip.y = canvas.height - chip.radius;
        chip.vy = -Math.abs(chip.vy);
    }

    if (chip.y - chip.radius <= 0) {
        chip.y = chip.radius;
        chip.vy = Math.abs(chip.vy);
    }

    // Rotate the chip
    chip.rotation += dt * (chip.flash > 0 ? 8 : 0.5);

    chip.flash = Math.max(0, chip.flash - dt);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground();
    updateParticles(dt);
    drawChip();

    requestAnimationFrame(animate);
}

// Respond to mouse clicks
canvas.addEventListener("click", function(event) {
    const rect = canvas.getBoundingClientRect();

    const mouseX =
        (event.clientX - rect.left) * canvas.width / rect.width;

    const mouseY =
        (event.clientY - rect.top) * canvas.height / rect.height;

    const distance = Math.hypot(
        mouseX - chip.x,
        mouseY - chip.y
    );

    // Only activate effects when the chip is clicked
    if (distance <= chip.radius) {
        chip.vx *= -1;
        chip.vy *= -1;

        chip.flash = 0.6;

        createExplosion();
    }
});

// Start the animation
requestAnimationFrame(animate);
