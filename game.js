const { Engine, Render, Runner, Bodies, Composite, Mouse } = Matter;
Matter.Resolver._restingThresh = 0.001;

const engine = Engine.create();
engine.gravity.y = 0;

engine.positionIterations = 8;
engine.velocityIterations = 6;
engine.constraintIterations = 2;
const container = document.getElementById('game-container');
const render = Render.create({
    element: container,
    engine: engine,
    options: {
        width: 300,
        height: 300,
        wireframes: false,
        background: 'transparent'
    }
});

let aimAnimation = 0;
let shinePos = -80;

const bgCanvas = document.createElement("canvas");
bgCanvas.width = 300;
bgCanvas.height = 300;

bgCanvas.style.position = "absolute";
bgCanvas.style.left = render.canvas.offsetLeft + "px";
bgCanvas.style.top = render.canvas.offsetTop + "px";
bgCanvas.style.zIndex = "0";

render.canvas.style.position = "absolute";
render.canvas.style.zIndex = "1";

render.canvas.parentNode.insertBefore(bgCanvas, render.canvas);

const bgCtx = bgCanvas.getContext("2d");
let pageMouseX = 100;
let pageMouseY = 100;
window.addEventListener("mousemove", (e) => {
    const rect = render.canvas.getBoundingClientRect();
    pageMouseX = e.clientX - rect.left;
    pageMouseY = e.clientY - rect.top;
});


function getEventCoords(e) {
    const rect = render.canvas.getBoundingClientRect();
    if (e.touches && e.touches.length > 0) {
        return {
            x: e.touches[0].clientX - rect.left,
            y: e.touches[0].clientY - rect.top
        };
    } else if (e.changedTouches && e.changedTouches.length > 0) {
        return {
            x: e.changedTouches[0].clientX - rect.left,
            y: e.changedTouches[0].clientY - rect.top
        };
    }
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

const player = Bodies.circle(65, 260, 10, {
    id: 'striker',
    label: 'striker',
    inertia: Infinity,
    frictionAir: 0.03,
    restitution: 0.6,
    slop: 0,
    friction: 0,
    frictionStatic: 0,
    density: 0.0025,
    plugin: { ccd: { toggled: true } },
    render: {
        fillStyle: '#d49b00d3',
    }
});

const target = Bodies.circle(150, 150, 7, {
    id: 'queen',
    label: 'queen',
    inertia: Infinity,
    frictionAir: 0.03,
    friction: 0,
    frictionStatic: 0,
    restitution: 0.7,
    density: 0.001,
    plugin: { ccd: { toggled: true } },
    render: {
        fillStyle: '#f30505ff'
    }
});

const target2 = Bodies.circle(150, 165, 7, {
    id: 'white_1',
    label: 'white',
    inertia: Infinity,
    restitution: 0.7,
    friction: 0,
    frictionAir: 0.02,
    frictionStatic: 0,
    slop: 0,
    density: 0.001,
    plugin: { ccd: { toggled: true } },
    render: {
        fillStyle: '#f8f8f8',
        strokeStyle: '#000000',
        lineWidth: 1
    }
});
const target3 = Bodies.circle(150, 180, 7, {
    id: 'white_2', label: 'white', inertia: Infinity, restitution: 0.7,
    friction: 0,
    frictionAir: 0.029,
    frictionStatic: 0,
    density: 0.001,
    slop: 0,
    plugin: { ccd: { toggled: true } },
    render: {
        fillStyle: '#f8f8f8',
        strokeStyle: '#000000ff',
        lineWidth: 1
    }
});

const target4 = Bodies.circle(150, 120, 7, {
    id: 'white_3', label: 'white', inertia: Infinity, restitution: 0.7,
    friction: 0,
    frictionAir: 0.029,
    frictionStatic: 0,
    density: 0.001,
    slop: 0,
    plugin: { ccd: { toggled: true } },
    render: {
        fillStyle: '#f8f8f8',
        strokeStyle: '#000000ff',
        lineWidth: 1
    }
});

const target5 = Bodies.circle(165, 140, 7, {
    id: 'white_4', label: 'white', inertia: Infinity, restitution: 0.7,
    friction: 0,
    frictionAir: 0.029,
    frictionStatic: 0,
    density: 0.001,
    slop: 0,
    plugin: { ccd: { toggled: true } },
    render: {
        fillStyle: '#f8f8f8',
        strokeStyle: '#000000ff',
        lineWidth: 1
    }
});

const target6 = Bodies.circle(180, 130, 7, {
    id: 'white_5', label: 'white', inertia: Infinity, restitution: 0.7,
    friction: 0,
    frictionAir: 0.029,
    density: 0.001,
    frictionStatic: 0,
    slop: 0,
    plugin: { ccd: { toggled: true } },
    render: {
        fillStyle: '#f8f8f8',
        strokeStyle: '#000000ff',
        lineWidth: 1
    }
});

const target7 = Bodies.circle(135, 140, 7, {
    id: 'white_6', label: 'white', inertia: Infinity, restitution: 0.7,
    friction: 0,
    frictionAir: 0.029,
    frictionStatic: 0,
    density: 0.001,
    slop: 0,
    plugin: { ccd: { toggled: true } },
    render: {
        fillStyle: '#f8f8f8',
        strokeStyle: '#000000ff',
        lineWidth: 1
    }
});

const target8 = Bodies.circle(120, 130, 7, {
    id: 'white_7', label: 'white', inertia: Infinity, restitution: 0.7,
    friction: 0,
    frictionAir: 0.029,
    frictionStatic: 0,
    density: 0.001,
    slop: 0,
    plugin: { ccd: { toggled: true } },
    render: {
        fillStyle: '#f8f8f8',
        strokeStyle: '#000000ff',
        lineWidth: 1
    }
});

const target9 = Bodies.circle(120, 170, 7, {
    id: 'white_8', label: 'white', inertia: Infinity, restitution: 0.7,
    friction: 0,
    frictionAir: 0.029,
    frictionStatic: 0,
    density: 0.001,
    slop: 0,
    plugin: { ccd: { toggled: true } },
    render: {
        fillStyle: '#f8f8f8',
        strokeStyle: '#000000ff',
        lineWidth: 1
    }
});

const target10 = Bodies.circle(180, 170, 7, {
    id: 'white_9', label: 'white', inertia: Infinity, restitution: 0.7,
    friction: 0,
    frictionAir: 0.029,
    frictionStatic: 0,
    density: 0.001,
    slop: 0,
    plugin: { ccd: { toggled: true } },
    render: {
        fillStyle: '#f8f8f8',
        strokeStyle: '#000000ff',
        lineWidth: 1
    }
});

// --- OUTER RING (9 BLACK PIECES) ---
const target11 = Bodies.circle(150, 135, 7, {
    id: 'black_1', label: 'black', inertia: Infinity, restitution: 0.7,
    friction: 0,
    frictionAir: 0.029,
    frictionStatic: 0,
    density: 0.001,
    slop: 0,
    plugin: { ccd: { toggled: true } },
    render: {
        fillStyle: '#222222',
        strokeStyle: '#ffffffff',
        lineWidth: 1
    }
});

const target12 = Bodies.circle(135, 125, 7, {
    id: 'black_2', label: 'black', inertia: Infinity, restitution: 0.7,
    friction: 0,
    frictionAir: 0.029,
    frictionStatic: 0,
    density: 0.001,
    slop: 0,
    plugin: { ccd: { toggled: true } },
    render: {
        fillStyle: '#222222',
        strokeStyle: '#ffffffff',
        lineWidth: 1
    }
});

const target13 = Bodies.circle(165, 125, 7, {
    id: 'black_3', label: 'black', inertia: Infinity, restitution: 0.7,
    friction: 0,
    frictionAir: 0.029,
    frictionStatic: 0,
    density: 0.001,
    slop: 0,
    plugin: { ccd: { toggled: true } },
    render: {
        fillStyle: '#222222',
        strokeStyle: '#ffffffff',
        lineWidth: 1
    }
});

const target14 = Bodies.circle(180, 150, 7, {
    id: 'black_4', label: 'black', inertia: Infinity, restitution: 0.7,
    friction: 0,
    frictionAir: 0.029,
    frictionStatic: 0,
    density: 0.001,
    slop: 0,
    plugin: { ccd: { toggled: true } },
    render: {
        fillStyle: '#222222',
        strokeStyle: '#ffffffff',
        lineWidth: 1
    }
});

const target15 = Bodies.circle(120, 150, 7, {
    id: 'black_5', label: 'black', inertia: Infinity, restitution: 0.7,
    friction: 0,
    frictionAir: 0.029,
    frictionStatic: 0,
    density: 0.001,
    slop: 0,
    plugin: { ccd: { toggled: true } },
    render: {
        fillStyle: '#222222',
        strokeStyle: '#ffffffff',
        lineWidth: 1
    }
});

const target16 = Bodies.circle(135, 160, 7, {
    id: 'black_6', label: 'black', inertia: Infinity, restitution: 0.7,
    friction: 0,
    frictionAir: 0.029,
    frictionStatic: 0,
    density: 0.001,
    slop: 0,
    plugin: { ccd: { toggled: true } },
    render: {
        fillStyle: '#222222',
        strokeStyle: '#ffffffff',
        lineWidth: 1
    }
});

const target17 = Bodies.circle(165, 160, 7, {
    id: 'black_7', label: 'black', inertia: Infinity, restitution: 0.7,
    friction: 0,
    frictionAir: 0.029,
    frictionStatic: 0,
    density: 0.001,
    slop: 0,
    plugin: { ccd: { toggled: true } },
    render: {
        fillStyle: '#222222',
        strokeStyle: '#ffffffff',
        lineWidth: 1
    }
});

const target18 = Bodies.circle(135, 175, 7, {
    id: 'black_8', label: 'black', inertia: Infinity, restitution: 0.7,
    friction: 0,
    frictionAir: 0.029,
    frictionStatic: 0,
    density: 0.001,
    slop: 0,
    plugin: { ccd: { toggled: true } },
    render: {
        fillStyle: '#222222',
        strokeStyle: '#ffffffff',
        lineWidth: 1
    }
});

const target19 = Bodies.circle(165, 175, 7, {
    id: 'black_9', label: 'black', inertia: Infinity, restitution: 0.7,
    friction: 0,
    frictionAir: 0.029,
    frictionStatic: 0,
    density: 0.001,
    slop: 0,
    plugin: { ccd: { toggled: true } },
    render: {
        fillStyle: '#222222',
        strokeStyle: '#ffffffff',
        lineWidth: 1
    }
});

const topWall = Bodies.rectangle(150, 2, 300, 25, {
    restitution: 0.5,
    friction: 0,
    frictionStatic: 0,
    slop: 0,
    isStatic: true, render: { fillStyle: '#4d2d18' }
});
const bottomWall = Bodies.rectangle(150, 298, 300, 25, {
    restitution: 0.5,
    friction: 0,
    frictionStatic: 0,
    slop: 0,
    isStatic: true, render: { fillStyle: '#4d2d18' }
});
const leftWall = Bodies.rectangle(2, 150, 25, 300, {
    restitution: 0.5,
    friction: 0,
    frictionStatic: 0,
    slop: 0,
    isStatic: true, render: { fillStyle: '#4d2d18' }
});
const rightWall = Bodies.rectangle(298, 150, 25, 300, {
    restitution: 0.5,
    friction: 0,
    frictionStatic: 0,
    slop: 0,
    isStatic: true, render: { fillStyle: '#4d2d18' }
});

const rectangle1 = Bodies.rectangle(150, 40, 190, 20, {
    isSensor: true, isStatic: true, chamfer: { radius: 10 }, render: {
        fillStyle: 'transparent',
        strokeStyle: '#4D2D18',
        lineWidth: 2
    }
});
const rectangle2 = Bodies.rectangle(150, 260, 190, 20, {
    isSensor: true, isStatic: true, chamfer: { radius: 10 }, render: {
        fillStyle: 'transparent',
        strokeStyle: '#4D2D18',
        lineWidth: 2
    }
});
const rectangle3 = Bodies.rectangle(40, 150, 20, 190, {
    isSensor: true, isStatic: true, chamfer: { radius: 10 }, render: {
        fillStyle: 'transparent',
        strokeStyle: '#4D2D18',
        lineWidth: 2
    }
});
const rectangle4 = Bodies.rectangle(260, 150, 20, 190, {
    isSensor: true, isStatic: true, chamfer: { radius: 10 }, render: {
        fillStyle: 'transparent',
        strokeStyle: '#4D2D18',
        lineWidth: 2
    }
});

const circle1 = Bodies.circle(260, 65, 8, {
    isStatic: true,
    isSensor: true,
    render: {
        fillStyle: "#4d2d18",
    }
});
const circle2 = Bodies.circle(260, 235, 8, {
    isStatic: true,
    isSensor: true,
    render: {
        fillStyle: "#4d2d18",
    }
});
const circle3 = Bodies.circle(40, 65, 8, {
    isStatic: true,
    isSensor: true,
    render: {
        fillStyle: "#4d2d18",
    }
});
const circle4 = Bodies.circle(40, 235, 8, {
    isStatic: true,
    isSensor: true,
    render: {
        fillStyle: "#4d2d18",
    }
});
const circle5 = Bodies.circle(65, 260, 8, {
    isStatic: true,
    isSensor: true,
    render: {
        fillStyle: "#4d2d18",
    }
});

const circle6 = Bodies.circle(235, 260, 8, {
    isStatic: true,
    isSensor: true,
    render: {
        fillStyle: "#4d2d18",
    }
});
const circle7 = Bodies.circle(65, 40, 8, {
    isStatic: true,
    isSensor: true,
    render: {
        fillStyle: "#4d2d18",
    }
});

const circle8 = Bodies.circle(235, 40, 8, {
    isStatic: true,
    isSensor: true,
    render: {
        fillStyle: "#4d2d18",
    }
});

Composite.add(engine.world, [
    circle1, circle2, circle3, circle4, circle5, circle6, circle7, circle8,
    rectangle1, rectangle2, rectangle3, rectangle4,
    topWall, bottomWall, leftWall, rightWall, player,
    target, target2, target3, target4, target5, target6, target7, target8, target9, target10,
    target11, target12, target13, target14, target15, target16, target17, target18, target19
]);
let activeParticles = [];

function spawnHitParticles(x, y) {
    activeParticles.push({
        type: "ripple",
        x: x,
        y: y,
        radius: 2,
        maxRadius: 15,
        alpha: 0.8,
        color: "#ffd700",
        speed: 1.2
    });

    for (let i = 0; i < 5; i++) {
        let angle = Math.random() * Math.PI * 2;
        let speed = Math.random() * 2 + 1;
        activeParticles.push({
            type: "spark",
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            radius: Math.random() * 1.5 + 1.0,
            alpha: 1.0,
            color: `hsla(${Math.random() * 40 + 20}, 100%, 60%, 1)`
        });
    }
}

function spawnPocketParticles(x, y, label) {
    let color = "#ffffff";
    if (label === "black") color = "#e0a96d";
    else if (label === "queen") color = "#f30505";
    else if (label === "striker") color = "#bebb07ff";

    for (let i = 0; i < 8; i++) {
        let angle = Math.random() * Math.PI * 2;
        let speed = Math.random() * 2.5 + 1.2;
        activeParticles.push({
            type: "pocket_spark",
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            radius: Math.random() * 2 + 1.5,
            alpha: 1.0,
            color: color
        });
    }

    activeParticles.push({
        type: "ripple",
        x: x,
        y: y,
        radius: 4,
        maxRadius: 24,
        alpha: 0.7,
        color: color,
        speed: 1.5
    });
}

function updateAndDrawParticles(context) {
    for (let i = activeParticles.length - 1; i >= 0; i--) {
        let p = activeParticles[i];
        if (p.type === "ripple") {
            p.radius += p.speed;
            p.alpha -= 0.05;
            if (p.alpha <= 0) {
                activeParticles.splice(i, 1);
                continue;
            }
            context.save();
            context.beginPath();
            context.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            context.strokeStyle = p.color;
            context.globalAlpha = p.alpha;
            context.lineWidth = 2.0;
            context.stroke();
            context.restore();
        } else if (p.type === "spark" || p.type === "pocket_spark") {
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.93;
            p.vy *= 0.93;
            p.alpha -= 0.055;
            if (p.alpha <= 0) {
                activeParticles.splice(i, 1);
                continue;
            }
            context.save();
            context.beginPath();
            context.arc(p.x, p.y, p.radius * p.alpha, 0, Math.PI * 2);
            context.fillStyle = p.color;
            context.globalAlpha = p.alpha;
            context.fill();
            context.restore();
        }
    }
}


Matter.Events.on(engine, "collisionStart", function (event) {
    event.pairs.forEach(pair => {

        let dynamicBody = null;
        let staticBody = null;

        if (pair.bodyA.isStatic && !pair.bodyA.isSensor) {
            staticBody = pair.bodyA;
            dynamicBody = pair.bodyB;
        } else if (pair.bodyB.isStatic && !pair.bodyB.isSensor) {
            staticBody = pair.bodyB;
            dynamicBody = pair.bodyA;
        }

        if (dynamicBody && ['striker', 'white', 'black', 'queen'].includes(dynamicBody.label)) {
            const normal = pair.collision.normal;
            const vel = dynamicBody.velocity;
            const speedAlongNormal = vel.x * normal.x + vel.y * normal.y;

            if (speedAlongNormal < 0) {
                const bounceCoefficient = dynamicBody.label === 'striker' ? 0.6 : 0.7;
                let newVelX = vel.x - (1 + bounceCoefficient) * speedAlongNormal * normal.x;
                let newVelY = vel.y - (1 + bounceCoefficient) * speedAlongNormal * normal.y;

                const minBounce = 0.3;
                const currentBounceSpeed = Math.hypot(newVelX, newVelY);
                if (currentBounceSpeed < minBounce && currentBounceSpeed > 0.02) {
                    const scale = minBounce / currentBounceSpeed;
                    newVelX *= scale;
                    newVelY *= scale;
                }
                Matter.Body.setVelocity(dynamicBody, { x: newVelX, y: newVelY });
            }
        }

        let isStrikerCollision = false;
        let otherBody = null;
        if (pair.bodyA.label === "striker") {
            isStrikerCollision = true;
            otherBody = pair.bodyB;
        } else if (pair.bodyB.label === "striker") {
            isStrikerCollision = true;
            otherBody = pair.bodyA;
        }

        if (isStrikerCollision && otherBody && (otherBody.label === "white" || otherBody.label === "black" || otherBody.label === "queen")) {
            let midpoint = {
                x: (pair.bodyA.position.x + pair.bodyB.position.x) / 2,
                y: (pair.bodyA.position.y + pair.bodyB.position.y) / 2
            };
            spawnHitParticles(midpoint.x, midpoint.y);
        }

        if (firstHitPiece) return;

        let other = null;
        if (pair.bodyA.label === "striker") other = pair.bodyB;
        if (pair.bodyB.label === "striker") other = pair.bodyA;

        if (!other) return;

        if (
            other.label !== "white" &&
            other.label !== "black" &&
            other.label !== "queen"
        ) return;

        firstHitPiece = other;
    });
});

const mouse = Mouse.create(render.canvas);

let isAiming = false;
let isInMotion = false;
let gameMessage = "";
let messageTimer = 0;
let mouseDown = false;
let dragStarted = false;
let startMouseX = 0;
let startMouseY = 0;

const dragThreshold = 5;
const maxDragDistance = 50;
const maxSpeed = 17;

function handleStart(e) {
    if (isInMotion || player1Score === 9 || player2Score === 9) return;

    if (e.cancelable) e.preventDefault();
    const coords = getEventCoords(e);

    let distance = Math.hypot(
        coords.x - player.position.x,
        coords.y - player.position.y
    );

    if (distance <= maxDragDistance) {
        mouseDown = true;
        dragStarted = false;
        startMouseX = coords.x;
        startMouseY = coords.y;
    }
}

function handleMove(e) {
    const coords = getEventCoords(e);
    pageMouseX = coords.x;
    pageMouseY = coords.y;

    if (!mouseDown) return;
    if (e.cancelable) e.preventDefault();

    if (dragStarted) return;

    const dx = coords.x - startMouseX;
    const dy = coords.y - startMouseY;
    const moved = Math.hypot(dx, dy);

    if (moved > dragThreshold) {
        dragStarted = true;
        isAiming = true;

        Matter.Body.setVelocity(player, {
            x: 0,
            y: 0
        });
    }
}

function handleEnd(e) {
    if (!mouseDown) return;
    mouseDown = false;

    if (isAiming) {
        if (e.cancelable) e.preventDefault();

        let dragX = pageMouseX - player.position.x;
        let dragY = pageMouseY - player.position.y;
        let currentDragDistance = Math.hypot(dragX, dragY);

        if (currentDragDistance < dragThreshold) {
            isAiming = false;
            return;
        }

        isAiming = false;
        isInMotion = true;

        if (currentDragDistance > 0) {
            let clampedDistance = Math.min(currentDragDistance, maxDragDistance);
            let calculatedSpeed = (clampedDistance / maxDragDistance) * maxSpeed;
            let angle = Math.atan2(dragY, dragX);
            firstHitPiece = null;
            foul = false;
            pocketedInCurrentShot = [];

            Matter.Body.setVelocity(player, {
                x: -Math.cos(angle) * calculatedSpeed,
                y: -Math.sin(angle) * calculatedSpeed
            });
        }
    }
}

render.canvas.addEventListener("mousedown", handleStart);
render.canvas.addEventListener("touchstart", handleStart, { passive: false });

render.canvas.addEventListener("mousemove", handleMove);
render.canvas.addEventListener("touchmove", handleMove, { passive: false });

window.addEventListener("mouseup", handleEnd);
window.addEventListener("touchend", handleEnd, { passive: false });


function showMessage(text) {
    gameMessage = text;
    messageTimer = 120;
}

function drawBoard() {
    const context = bgCtx;

    context.beginPath();
    context.arc(150, 150, 42, 0, 2 * Math.PI);
    context.strokeStyle = 'rgba(168, 0, 0, 1)';
    context.lineWidth = 3;
    context.stroke();

    context.beginPath();
    context.arc(150, 150, 38, 0, 2 * Math.PI);
    context.strokeStyle = 'rgba(180, 0, 0, 0.7)';
    context.lineWidth = 1;
    context.stroke();

    let cornerSetups = [
        { cx: 54, cy: 54, signX: 1, signY: 1, angle: Math.PI * 0.25 },
        { cx: 246, cy: 54, signX: -1, signY: 1, angle: Math.PI * 0.75 },
        { cx: 54, cy: 246, signX: 1, signY: -1, angle: Math.PI * -0.25 },
        { cx: 246, cy: 246, signX: -1, signY: -1, angle: Math.PI * -0.75 }
    ];

    cornerSetups.forEach(c => {
        let startX = c.cx - Math.cos(c.angle) * 18;
        let startY = c.cy - Math.sin(c.angle) * 18;
        let endX = c.cx + Math.cos(c.angle) * 32;
        let endY = c.cy + Math.sin(c.angle) * 32;

        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.strokeStyle = 'rgba(110, 69, 38, 0.65)';
        context.lineWidth = 1.2;
        context.stroke();

        context.beginPath();
        context.arc(endX, endY, 10, 0, 2 * Math.PI);
        context.stroke();
        context.beginPath();
        context.arc(endX, endY, 1, 0, 2 * Math.PI);
        context.fillStyle = 'rgba(110, 69, 38, 0.8)';
        context.fill();

        let fx = c.cx - Math.cos(c.angle) * 16;
        let fy = c.cy - Math.sin(c.angle) * 16;

        for (let i = 0; i < 8; i++) {
            let petAngle = (i * Math.PI) / 4;
            context.beginPath();
            context.arc(fx + Math.cos(petAngle) * 5, fy + Math.sin(petAngle) * 5, 3, 0, 2 * Math.PI);
            context.strokeStyle = 'rgba(110, 69, 38, 0.5)';
            context.lineWidth = 1;
            context.stroke();
        }
        context.beginPath();
        context.arc(fx, fy, 4, 0, 2 * Math.PI);
        context.stroke();
    });

    let pockets = [8, 292];
    pockets.forEach(x => {
        pockets.forEach(y => {
            context.beginPath();
            context.arc(x, y, 28, 0, 2 * Math.PI);
            context.fillStyle = '#111111';
            context.fill();

            context.beginPath();
            context.arc(x, y, 24, 0, 2 * Math.PI);
            context.strokeStyle = '#c5a059';
            context.lineWidth = 3;
            context.stroke();

            let pocketGrad = context.createRadialGradient(x, y, 10, x, y, 25);
            pocketGrad.addColorStop(0, '#000000');
            pocketGrad.addColorStop(1, '#222222');
            context.beginPath();
            context.arc(x, y, 22, 0, 2 * Math.PI);
            context.fillStyle = pocketGrad;
            context.fill();
        });
    });
};

function drawCustomBody(context, body) {
    let pos = body.position;
    let radius = 7;
    if (body.label === "striker") {
        radius = 10;
    }

    let r = body.circleRadius || radius;

    context.save();
    context.shadowColor = "rgba(0, 0, 0, 0.4)";
    context.shadowBlur = 4;
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;

    let opacity = body.render.opacity !== undefined ? body.render.opacity : 1.0;
    context.globalAlpha = opacity;

    if (body.label === "white") {
        let grad = context.createRadialGradient(pos.x - r * 0.3, pos.y - r * 0.3, r * 0.1, pos.x, pos.y, r);
        grad.addColorStop(0, "#ffffff");
        grad.addColorStop(0.3, "#f4eee1");
        grad.addColorStop(0.8, "#dfd5c2");
        grad.addColorStop(1, "#c0b198");

        context.beginPath();
        context.arc(pos.x, pos.y, r, 0, Math.PI * 2);
        context.fillStyle = grad;
        context.fill();

        context.shadowColor = "transparent";
        context.beginPath();
        context.arc(pos.x, pos.y, r * 0.55, 0, Math.PI * 2);
        context.strokeStyle = "rgba(139, 90, 43, 0.4)";
        context.lineWidth = 1.2;
        context.stroke();

        context.beginPath();
        context.arc(pos.x, pos.y, r * 0.25, 0, Math.PI * 2);
        context.fillStyle = "rgba(139, 90, 43, 0.65)";
        context.fill();

    } else if (body.label === "black") {
        let grad = context.createRadialGradient(pos.x - r * 0.3, pos.y - r * 0.3, r * 0.1, pos.x, pos.y, r);
        grad.addColorStop(0, "#4f4f4f");
        grad.addColorStop(0.4, "#2d2d2d");
        grad.addColorStop(1, "#121212");

        context.beginPath();
        context.arc(pos.x, pos.y, r, 0, Math.PI * 2);
        context.fillStyle = grad;
        context.fill();

        context.shadowColor = "transparent";
        context.beginPath();
        context.arc(pos.x, pos.y, r * 0.55, 0, Math.PI * 2);
        context.strokeStyle = "rgba(255, 255, 255, 0.25)";
        context.lineWidth = 1.0;
        context.stroke();

        context.beginPath();
        context.arc(pos.x, pos.y, r * 0.25, 0, Math.PI * 2);
        context.fillStyle = "rgba(255, 255, 255, 0.4)";
        context.fill();

    } else if (body.label === "queen") {
        let grad = context.createRadialGradient(pos.x - r * 0.3, pos.y - r * 0.3, r * 0.1, pos.x, pos.y, r);
        grad.addColorStop(0, "#ff4040");
        grad.addColorStop(0.4, "#bf0000");
        grad.addColorStop(1, "#730000");

        context.beginPath();
        context.arc(pos.x, pos.y, r, 0, Math.PI * 2);
        context.fillStyle = grad;
        context.fill();

        context.shadowColor = "transparent";
        context.beginPath();
        context.arc(pos.x, pos.y, r * 0.55, 0, Math.PI * 2);
        context.strokeStyle = "rgba(255, 215, 0, 0.6)";
        context.lineWidth = 1.2;
        context.stroke();

        context.beginPath();
        context.arc(pos.x, pos.y, r * 0.25, 0, Math.PI * 2);
        context.fillStyle = "#ffd700";
        context.fill();

    } else if (body.label === "striker") {
        let grad = context.createRadialGradient(pos.x - r * 0.3, pos.y - r * 0.3, r * 0.1, pos.x, pos.y, r);
        grad.addColorStop(0, "#ffd8a8");
        grad.addColorStop(0.35, "#ff922b");
        grad.addColorStop(0.85, "#e8590c");
        grad.addColorStop(1, "#7f2704");
        context.beginPath();
        context.arc(pos.x, pos.y, r, 0, Math.PI * 2);
        context.fillStyle = grad;
        context.fill();

        context.shadowColor = "transparent";
        context.beginPath();
        context.arc(pos.x, pos.y, r * 0.7, 0, Math.PI * 2);
        context.strokeStyle = "rgba(255, 215, 0, 0.5)";
        context.lineWidth = 1.3;
        context.stroke();

        context.beginPath();
        context.arc(pos.x, pos.y, r * 0.4, 0, Math.PI * 2);
        context.strokeStyle = "rgba(255, 255, 255, 0.35)";
        context.lineWidth = 1.0;
        context.stroke();

        context.beginPath();
        context.arc(pos.x, pos.y, r * 0.18, 0, Math.PI * 2);
        context.fillStyle = "#ffd700";
        context.fill();

        context.beginPath();
        context.ellipse(pos.x - r * 0.28, pos.y - r * 0.28, r * 0.38, r * 0.18, -Math.PI / 4, 0, Math.PI * 2);
        let glossGrad = context.createLinearGradient(pos.x - r * 0.5, pos.y - r * 0.5, pos.x, pos.y);
        glossGrad.addColorStop(0, "rgba(255, 255, 255, 0.55)");
        glossGrad.addColorStop(1, "rgba(255, 255, 255, 0.0)");
        context.fillStyle = glossGrad;
        context.fill();
    }
    context.restore();
}

Matter.Events.on(render, 'afterRender', () => {
    let context = render.context;
    const allBodies = Composite.allBodies(engine.world);
    aimAnimation += 0.001;
    shinePos += 6;

    if (shinePos > maxDragDistance + 80)
        shinePos = -80;

    context.save();
    context.globalCompositeOperation = 'source-over';

    if (isAiming) {
        let mousePos = {
            x: pageMouseX,
            y: pageMouseY
        };

        let dragX = mousePos.x - player.position.x;
        let dragY = mousePos.y - player.position.y;

        let currentDragDistance = Math.hypot(dragX, dragY);
        currentDragDistance = Math.min(currentDragDistance, maxDragDistance);
        const power = currentDragDistance / maxDragDistance;

        let angle = Math.atan2(dragY, dragX);
        let hitX = player.position.x;
        let hitY = player.position.y;

        let dirX = -Math.cos(angle);
        let dirY = -Math.sin(angle);

        const circleRadius = maxDragDistance;
        const solidEndX = player.position.x + dirX * currentDragDistance;
        const solidEndY = player.position.y + dirY * currentDragDistance;
        let t = Infinity;

        if (dirX > 0) t = Math.min(t, (290 - player.position.x) / dirX);
        if (dirX < 0) t = Math.min(t, (10 - player.position.x) / dirX);
        if (dirY > 0) t = Math.min(t, (290 - player.position.y) / dirY);
        if (dirY < 0) t = Math.min(t, (10 - player.position.y) / dirY);

        hitX += dirX * t;
        hitY += dirY * t;

        let firstCoin = null;
        let firstCoinDistance = Infinity;

        allBodies.forEach(body => {
            if (
                body.label !== "white" &&
                body.label !== "black" &&
                body.label !== "queen"
            ) return;

            const vx = body.position.x - player.position.x;
            const vy = body.position.y - player.position.y;
            const projection = vx * dirX + vy * dirY;

            if (projection <= 0) return;
            if (projection > t) return;

            const closestX = player.position.x + dirX * projection;
            const closestY = player.position.y + dirY * projection;

            const dx = body.position.x - closestX;
            const dy = body.position.y - closestY;
            const distSq = dx * dx + dy * dy;

            const safeDistance = 17;
            const safeDistanceSq = safeDistance * safeDistance;

            if (distSq <= safeDistanceSq && projection < firstCoinDistance) {
                firstCoinDistance = projection;
                const gap = 2;
                firstCoin = {
                    x: player.position.x + dirX * (projection - gap),
                    y: player.position.y + dirY * (projection - gap)
                };
            }
        });

        context.save();
        context.translate(player.position.x, player.position.y);
        context.rotate(aimAnimation);

        context.beginPath();
        context.arc(0, 0, currentDragDistance, 0, Math.PI * 2);

        context.setLineDash([12, 8]);
        context.lineDashOffset = -aimAnimation * 40;

        context.strokeStyle = "#dddbd1ff";
        context.lineWidth = 1;
        context.shadowColor = "#FFD700";
        context.shadowBlur = 12;
        context.stroke();
        context.restore();

        const startWidth = 3;
        const endWidth = 3;

        const dx = solidEndX - player.position.x;
        const dy = solidEndY - player.position.y;
        const len = Math.hypot(dx, dy);

        const nx = -dy / len;
        const ny = dx / len;

        const p1 = {
            x: player.position.x + nx * startWidth,
            y: player.position.y + ny * startWidth
        };
        const p2 = {
            x: solidEndX + nx * endWidth,
            y: solidEndY + ny * endWidth
        };
        const p3 = {
            x: solidEndX - nx * endWidth,
            y: solidEndY - ny * endWidth
        };
        const p4 = {
            x: player.position.x - nx * startWidth,
            y: player.position.y - ny * startWidth
        };

        const gradient = context.createLinearGradient(
            player.position.x,
            player.position.y,
            solidEndX,
            solidEndY
        );

        gradient.addColorStop(0, "#FFE600");
        gradient.addColorStop(0.6, "#FF9900");
        gradient.addColorStop(1, "#FF0000");

        context.beginPath();
        context.moveTo(p1.x, p1.y);
        context.lineTo(p2.x, p2.y);
        context.lineTo(p3.x, p3.y);
        context.lineTo(p4.x, p4.y);
        context.closePath();

        context.fillStyle = gradient;
        context.fill();

        context.save();
        context.beginPath();
        context.moveTo(p1.x, p1.y);
        context.lineTo(p2.x, p2.y);
        context.lineTo(p3.x, p3.y);
        context.lineTo(p4.x, p4.y);
        context.closePath();
        context.clip();

        context.translate(player.position.x, player.position.y);
        context.rotate(Math.atan2(dy, dx));

        const glow = context.createLinearGradient(
            shinePos - 40,
            0,
            shinePos + 40,
            0
        );

        glow.addColorStop(0.0, "rgba(255,255,255,0)");
        glow.addColorStop(0.4, "rgba(255,255,255,0.2)");
        glow.addColorStop(0.5, "rgba(255,255,255,1)");
        glow.addColorStop(0.6, "rgba(255,255,255,0.2)");
        glow.addColorStop(1.0, "rgba(255,255,255,0)");

        context.fillStyle = glow;
        context.fillRect(-50, -15, len + 100, 30);
        context.restore();

        const arrowLength = 3;
        const arrowWidth = 2;

        const tip = {
            x: solidEndX + (dx / len) * arrowLength,
            y: solidEndY + (dy / len) * arrowLength
        };
        const left = {
            x: solidEndX + nx * arrowWidth,
            y: solidEndY + ny * arrowWidth
        };
        const right = {
            x: solidEndX - nx * arrowWidth,
            y: solidEndY - ny * arrowWidth
        };

        context.beginPath();
        context.moveTo(tip.x, tip.y);
        context.lineTo(left.x, left.y);
        context.lineTo(right.x, right.y);
        context.closePath();

        context.fillStyle = "#FF0000";
        context.fill();

        if (power < 0.5) {
            gradient.addColorStop(0, "#FFFF00");
            gradient.addColorStop(1, "#FFFF00");
        } else if (power < 0.9) {
            gradient.addColorStop(0, "#FFFF00");
            gradient.addColorStop(1, "#FF8C00");
        } else {
            gradient.addColorStop(0.0, "#FFFF00");
            gradient.addColorStop(0.2, "#FF8C00");
            gradient.addColorStop(1.0, "#FF0000");
        }

        context.strokeStyle = gradient;
        context.lineWidth = 6;
        context.setLineDash([]);
        context.stroke();

        context.beginPath();
        context.moveTo(solidEndX, solidEndY);

        if (firstCoin) {
            context.lineTo(firstCoin.x, firstCoin.y);
        } else {
            context.lineTo(hitX, hitY);
        }

        context.setLineDash([8, 8]);
        context.strokeStyle = "#ffffffff";
        context.lineWidth = 3;
        context.stroke();
        context.setLineDash([]);

        if (!firstCoin) {
            let reflectX = dirX;
            let reflectY = dirY;
            const margin = 0.5;

            if (Math.abs(hitX - 10) < margin || Math.abs(hitX - 290) < margin) {
                reflectX = -reflectX;
            }
            if (Math.abs(hitY - 10) < margin || Math.abs(hitY - 290) < margin) {
                reflectY = -reflectY;
            }

            const bounceLength = 250;
            let stopX = hitX + reflectX * bounceLength;
            let stopY = hitY + reflectY * bounceLength;
            let nearestDistance = Infinity;

            allBodies.forEach(body => {
                if (
                    body.label !== "white" &&
                    body.label !== "black" &&
                    body.label !== "queen"
                ) return;

                const vx = body.position.x - hitX;
                const vy = body.position.y - hitY;
                const projection = vx * reflectX + vy * reflectY;

                if (projection <= 0) return;

                const closestX = hitX + reflectX * projection;
                const closestY = hitY + reflectY * projection;

                const dx = body.position.x - closestX;
                const dy = body.position.y - closestY;
                const perpSq = dx * dx + dy * dy;

                const safeDistance = 17;
                const safeDistanceSq = safeDistance * safeDistance;

                if (perpSq <= safeDistanceSq && projection < nearestDistance) {
                    nearestDistance = projection;
                    const gap = 2;
                    stopX = hitX + reflectX * (projection - gap);
                    stopY = hitY + reflectY * (projection - gap);
                }
            });
        }
    }
    const x = player.position.x;
    const y = player.position.y;

    context.beginPath();
    context.arc(x, y, 7, 0, Math.PI * 2);
    context.lineWidth = 1.5;
    context.strokeStyle = "#FFFFFF";
    context.stroke();

    context.beginPath();
    context.arc(x, y, 2, 0, Math.PI * 2);
    context.fillStyle = "#FFD700";
    context.fill();

    const r = 5;

    [
        [0, -r],
        [r, 0],
        [0, r],
        [-r, 0]
    ].forEach(([dx, dy]) => {
        context.beginPath();
        context.arc(x + dx, y + dy, 1.3, 0, Math.PI * 2);
        context.fillStyle = "#FFD700";
        context.fill();
    });

    allBodies.forEach(body => {
        if (
            body.label === "white" ||
            body.label === "black" ||
            body.label === "queen" ||
            body.label === "striker"
        ) {
            drawCustomBody(context, body);
        }
    });

    updateAndDrawParticles(context);

    if (messageTimer > 0) {
        const progress = 1 - (messageTimer / 120);
        const scale = Math.min(1, progress * 2);

        context.save();
        context.fillStyle = "rgba(0,0,0,0.35)";
        context.fillRect(0, 0, render.options.width, render.options.height);

        context.translate(render.options.width / 2, render.options.height / 2);
        context.scale(scale, scale);

        context.shadowColor = "#ff0000";
        context.shadowBlur = 20;

        context.fillStyle = "#1f1f1f";
        context.strokeStyle = "#ff3333";
        context.lineWidth = 4;

        context.beginPath();
        context.roundRect(-140, -60, 280, 90, 20);
        context.fill();
        context.stroke();

        context.fillStyle = "#ff4444";
        context.font = "bold 28px Arial";
        context.textAlign = "center";
        context.fillText(gameMessage.startsWith("FOUL") ? "⚠ FOUL!" : gameMessage, 0, -8);
        context.restore();

        if (gameMessage !== "YOU WIN!" && gameMessage !== "YOU LOSE!") {
            messageTimer--;
        } else {
            messageTimer = Math.max(1, messageTimer - 1);
        }
    }
    context.restore();
});

let currentPlayer = 1;
let firstHitPiece = null;
let foul = false;
let player1Score = 0;
let player2Score = 0;
let earnedExtraTurn = false;
let startX = 65;
let startY = 260;
let queenStatus = "board";
let queenPocketedBy = null;
let pocketedInCurrentShot = [];

Matter.Events.on(engine, 'afterUpdate', () => {
    const pockets = [
        { x: 18, y: 18 }, { x: 18, y: 282 },
        { x: 282, y: 18 }, { x: 282, y: 282 }
    ];
    const pocketRadius = 15;
    const allBodies = Composite.allBodies(engine.world);

    allBodies.forEach(body => {
        if (body.label === 'striker' || body.label === 'queen' || body.label === 'white' || body.label === 'black') {
            for (let pocket of pockets) {
                const dx = body.position.x - pocket.x;
                const dy = body.position.y - pocket.y;
                const distSq = dx * dx + dy * dy;
                const radiusSq = pocketRadius * pocketRadius;
                if (distSq < radiusSq) {
                    if (body.label === 'striker') {
                        foul = true;
                        if (!pocketedInCurrentShot.includes("striker")) {
                            pocketedInCurrentShot.push("striker");
                        }
                        spawnPocketParticles(pocket.x, pocket.y, body.label);
                        Matter.Body.setVelocity(body, { x: 0, y: 0 });
                        Matter.Body.setAngularVelocity(body, 0);
                        Matter.Body.setPosition(body, { x: startX, y: startY });
                    } else {
                        if (body.isPocketed) {
                            break;
                        }
                        body.isPocketed = true;
                        body.pocketStartFrame = 0;
                        body.targetPocket = { x: pocket.x, y: pocket.y };
                        body.collisionFilter.mask = 0;
                        body.render.opacity = 1.0;

                        pocketedInCurrentShot.push(body.label);
                        spawnPocketParticles(pocket.x, pocket.y, body.label);
                    }
                    break;
                }
            }
        }
    });

    allBodies.forEach(body => {
        if (body.isPocketed && body.label !== 'striker') {
            body.pocketStartFrame = (body.pocketStartFrame || 0) + 1;

            let target = body.targetPocket;
            if (target) {
                let dx = target.x - body.position.x;
                let dy = target.y - body.position.y;
                Matter.Body.setVelocity(body, { x: dx * 0.15, y: dy * 0.15 });
            }

            if (body.pocketStartFrame > 20) {
                Matter.Body.scale(body, 0.9, 0.9);
                body.render.opacity = Math.max(0, body.render.opacity - 0.04);
            }

            if (body.render.opacity <= 0 || body.pocketStartFrame >= 70) {
                Composite.remove(engine.world, body);
            }
        }
    });

    const allStopped = allBodies.every(
        body => body.isPocketed || body.speed < 0.009
    );

    if (isInMotion && allStopped && !isAiming) {
        Matter.Body.setVelocity(player, { x: 0, y: 0 });
        Matter.Body.setAngularVelocity(player, 0);

        let strikerPocketed = pocketedInCurrentShot.includes("striker");
        let queenPocketed = pocketedInCurrentShot.includes("queen");
        let ownCoinsCount = 0;
        let opponentCoinsCount = 0;

        if (currentPlayer === 1) {
            ownCoinsCount = pocketedInCurrentShot.filter(label => label === "white").length;
            opponentCoinsCount = pocketedInCurrentShot.filter(label => label === "black").length;
        } else {
            ownCoinsCount = pocketedInCurrentShot.filter(label => label === "black").length;
            opponentCoinsCount = pocketedInCurrentShot.filter(label => label === "white").length;
        }

        let isFoul = foul || strikerPocketed;

        if (currentPlayer === 1) {
            player1Score += ownCoinsCount;
            player2Score += opponentCoinsCount;
        } else {
            player2Score += ownCoinsCount;
            player1Score += opponentCoinsCount;
        }

        document.getElementById("p1score").textContent = player1Score;
        document.getElementById("p2score").textContent = player2Score;

        if (isFoul) {
            let penaltyReturned = false;
            if (currentPlayer === 1) {
                if (player1Score > 0) {
                    player1Score--;
                    document.getElementById("p1score").textContent = player1Score;
                    returnCoinToBoard("white");
                    penaltyReturned = true;
                }
            } else {
                if (player2Score > 0) {
                    player2Score--;
                    document.getElementById("p2score").textContent = player2Score;
                    returnCoinToBoard("black");
                    penaltyReturned = true;
                }
            }

            if (queenPocketed) {
                returnCoinToBoard("queen");
                queenStatus = "board";
                queenPocketedBy = null;
                document.getElementById("player1Queen");
                document.getElementById("player2Queen");
            } else if (queenStatus === "awaiting_cover" && queenPocketedBy === currentPlayer) {
                returnCoinToBoard("queen");
                queenStatus = "board";
                queenPocketedBy = null;
                document.getElementById("player1Queen").style.display = "none";
                document.getElementById("player2Queen").style.display = "none";
            }

            showMessage(penaltyReturned ? "FOUL! Penalty 1 Coin" : "FOUL!");
            earnedExtraTurn = false;
            foul = false;
        } else {
            if (queenStatus === "awaiting_cover" && queenPocketedBy === currentPlayer) {
                if (ownCoinsCount >= 1) {
                    queenStatus = "covered";
                    queenPocketedBy = null;
                    document.getElementById("player" + currentPlayer + "Queen").style.display = "block";
                    earnedExtraTurn = true;
                } else {
                    returnCoinToBoard("queen");
                    queenStatus = "board";
                    queenPocketedBy = null;
                    document.getElementById("player1Queen").style.display = "none";
                    document.getElementById("player2Queen").style.display = "none";
                    showMessage("Queen Returned!");
                    earnedExtraTurn = false;
                }
            } else if (queenPocketed) {
                if (ownCoinsCount > 0) {
                    queenStatus = "covered";
                    queenPocketedBy = currentPlayer;
                    document.getElementById("player" + currentPlayer + "Queen").style.display = "block";
                    earnedExtraTurn = true;
                } else {
                    queenStatus = "awaiting_cover";
                    queenPocketedBy = currentPlayer;
                    document.getElementById("player" + currentPlayer + "Queen").style.display = "block";
                    earnedExtraTurn = true;
                }
            } else {
                if (ownCoinsCount > 0) {
                    earnedExtraTurn = true;
                } else {
                    earnedExtraTurn = false;
                }
            }
        }

        foul = false;
        pocketedInCurrentShot = [];

        if (!earnedExtraTurn) {
            if (currentPlayer === 1) {
                currentPlayer = 2;
                startY = 40;
            } else {
                currentPlayer = 1;
                startY = 260;
            }
        }

        earnedExtraTurn = false;
        isInMotion = false;

        syncObjectOnX(85);
        updateTurnIndicator();

        if (queenStatus === "covered") {
            if (player1Score === 9) {
                showMessage("YOU WIN!");
            } else if (player2Score === 9) {
                showMessage("YOU LOSE!");
            }
        }
    }

    function returnCoinToBoard(label) {
        let basePosition = { x: 150, y: 150 };

        let newX = basePosition.x;
        let newY = basePosition.y;
        let radius = 7;
        let maxTries = 50;
        let angleStep = 0.5;
        let distStep = 2;
        let currentTry = 0;

        const allBodies = Composite.allBodies(engine.world);

        while (currentTry < maxTries) {
            let overlapping = false;
            allBodies.forEach(body => {
                if (body.label === "white" || body.label === "black" || body.label === "queen") {
                    let dx = body.position.x - newX;
                    let dy = body.position.y - newY;
                    if (dx * dx + dy * dy < 225) {
                        overlapping = true;
                    }
                }
            });

            if (!overlapping) {
                break;
            }

            let angle = currentTry * angleStep;
            let distance = Math.floor(currentTry / 8) * distStep + 10;
            newX = basePosition.x + Math.cos(angle) * distance;
            newY = basePosition.y + Math.sin(angle) * distance;
            currentTry++;
        }

        let newCoin;
        if (label === "white") {
            newCoin = Bodies.circle(newX, newY, 7, {
                label: 'white',
                inertia: Infinity,
                restitution: 0.5,
                friction: 0,
                frictionAir: 0.029,
                frictionStatic: 0,
                slop: 0,
                plugin: { ccd: { toggled: true } },
                render: {
                    visible: false
                }
            });
        } else if (label === "black") {
            newCoin = Bodies.circle(newX, newY, 7, {
                label: 'black',
                inertia: Infinity,
                restitution: 0.5,
                friction: 0,
                frictionAir: 0.029,
                frictionStatic: 0,
                slop: 0,
                plugin: { ccd: { toggled: true } },
                render: {
                    visible: false
                }
            });
        } else if (label === "queen") {
            newCoin = Bodies.circle(newX, newY, 7, {
                label: 'queen',
                inertia: Infinity,
                frictionAir: 0.03,
                friction: 0,
                frictionStatic: 0,
                restitution: 0.1,
                plugin: { ccd: { toggled: true } },
                render: {
                    visible: false
                }
            });
        }

        if (newCoin) {
            Composite.add(engine.world, newCoin);
        }
    }
});

function syncObjectOnX(newX) {
    if (isInMotion || player1Score === 9 || player2Score === 9) return;

    newX = Math.max(0, Math.min(newX, 170));

    const knob = document.getElementById("slider-knob");
    if (knob) {
        knob.style.left = `${newX}px`;
    }

    startX = newX + 65;

    let tempX = startX;
    const allBodies = Composite.allBodies(engine.world);

    while (true) {
        let blocked = false;
        allBodies.forEach(body => {
            if (
                body !== player &&
                (body.label === "white" ||
                    body.label === "black" ||
                    body.label === "queen")
            ) {
                const dx = body.position.x - tempX;
                const dy = body.position.y - startY;

                if (dx * dx + dy * dy < 324) {
                    blocked = true;
                }
            }
        });

        if (!blocked) break;
        tempX++;
    }

    Matter.Body.setPosition(player, {
        x: tempX,
        y: startY
    });

    Matter.Body.setVelocity(player, { x: 0, y: 0 });
}

let isDragging = false;
const knobElement = document.getElementById('slider-knob');

if (knobElement) {
    knobElement.addEventListener('mousedown', () => {
        isDragging = true;
    });
}
window.addEventListener('mousemove', (event) => {
    if (!isDragging || !knobElement) return;
    const sliderRect = knobElement.parentElement.getBoundingClientRect();
    const mouseX = event.clientX - sliderRect.left;
    syncObjectOnX(mouseX);
});

// Added Touch Slider event for phones
if (knobElement) {
    knobElement.addEventListener('touchstart', (e) => {
        isDragging = true;
        if (e.cancelable) e.preventDefault();
    }, { passive: false });
}

window.addEventListener('touchmove', (event) => {
    if (!isDragging || !knobElement) return;
    const sliderRect = knobElement.parentElement.getBoundingClientRect();
    const touchX = event.touches[0].clientX - sliderRect.left;
    syncObjectOnX(touchX);
    if (event.cancelable) event.preventDefault();
}, { passive: false });

window.addEventListener('mouseup', () => {
    isDragging = false;
});
window.addEventListener('touchend', () => {
    isDragging = false;
});

function updateTurnIndicator() {
    const p1Div = document.getElementById("playerone-image");
    const p2Div = document.getElementById("playertwo-image");
    if (p1Div && p2Div) {
        if (currentPlayer === 1) {
            p1Div.classList.add("active-player");
            p2Div.classList.remove("active-player");
        } else {
            p2Div.classList.add("active-player");
            p1Div.classList.remove("active-player");
        }
    }
}

const runner = Runner.create();
Render.run(render);

drawBoard();

Composite.allBodies(engine.world).forEach(body => {
    if (
        body.label === "white" ||
        body.label === "black" ||
        body.label === "queen" ||
        body.label === "striker"
    ) {
        body.render.visible = false;
    }
});

updateTurnIndicator();
syncObjectOnX(85);

Runner.run(runner, engine);