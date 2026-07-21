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
        width: 600,
        height: 600,
        wireframes: false,
        background: 'transparent'
    }
});

let aimAnimation = 0;
let shinePos = -80;

const bgCanvas = document.createElement("canvas");
bgCanvas.width = 600;
bgCanvas.height = 600;

bgCanvas.style.position = "absolute";
bgCanvas.style.left = render.canvas.offsetLeft + "px";
bgCanvas.style.top = render.canvas.offsetTop + "px";
bgCanvas.style.zIndex = "0";

render.canvas.style.position = "absolute";
render.canvas.style.zIndex = "1";

render.canvas.parentNode.insertBefore(bgCanvas, render.canvas);

const bgCtx = bgCanvas.getContext("2d");

const boardImg = new Image();
boardImg.src = './Assets/structure/Board_.png';
const whiteTokenImg = new Image();
whiteTokenImg.src = './Assets/structure/White-Token.png';
const blackTokenImg = new Image();
blackTokenImg.src = './Assets/structure/Black-Token.png';
const redTokenImg = new Image();
redTokenImg.src = './Assets/structure/Red-Toekn.png';
const strikerImg = new Image();
strikerImg.src = './Assets/structure/Stagger.png';

let pageMouseX = 100;
let pageMouseY = 100;
window.addEventListener("mousemove", (e) => {
    const rect = render.canvas.getBoundingClientRect();
    const scaleX = 600 / rect.width;
    const scaleY = 600 / rect.height;
    pageMouseX = (e.clientX - rect.left) * scaleX;
    pageMouseY = (e.clientY - rect.top) * scaleY;
});


function getEventCoords(e) {
    const rect = render.canvas.getBoundingClientRect();
    const scaleX = 600 / rect.width;
    const scaleY = 600 / rect.height;
    if (e.touches && e.touches.length > 0) {
        return {
            x: (e.touches[0].clientX - rect.left) * scaleX,
            y: (e.touches[0].clientY - rect.top) * scaleY
        };
    } else if (e.changedTouches && e.changedTouches.length > 0) {
        return {
            x: (e.changedTouches[0].clientX - rect.left) * scaleX,
            y: (e.changedTouches[0].clientY - rect.top) * scaleY
        };
    }
    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
    };
}



Composite.add(engine.world, [
    circle1, circle2, circle3, circle4, circle5, circle6, circle7, circle8,
    rectangle1, rectangle2, rectangle3, rectangle4,
    topWall, bottomWall, leftWall, rightWall, player, target,
    ...coins
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

                const minBounce = 0.1;
                const currentBounceSpeed = Math.hypot(newVelX, newVelY);
                if (currentBounceSpeed < minBounce && currentBounceSpeed > 0.01) {
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

const dragThreshold = 10;
const maxDragDistance = 100;
const maxSpeed = 38;

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
    if (boardImg.complete) {
        context.clearRect(0, 0, 600, 600);
        context.drawImage(boardImg, 38, 75, 1004, 1004, 0, 0, 600, 600);
    } else {
        boardImg.onload = () => {
            context.clearRect(0, 0, 600, 600);
            context.drawImage(boardImg, 38, 75, 1004, 1004, 0, 0, 600, 600);
        };
    }
}

function drawCustomBody(context, body) {
    let pos = body.position;
    let radius = 7;
    if (body.label === "striker") {
        radius = 10;
    }

    let r = body.circleRadius || radius;
    if (body.label === "striker") {
        r *= GAME_CONFIG.striker.visualScale;
    } else if (body.label === "queen") {
        r *= GAME_CONFIG.queen.visualScale;
    } else {
        r *= GAME_CONFIG.coin.visualScale;
    }
    let img = null;

    if (body.label === "white") img = whiteTokenImg;
    else if (body.label === "black") img = blackTokenImg;
    else if (body.label === "queen") img = redTokenImg;
    else if (body.label === "striker") img = strikerImg;

    if (img && img.complete) {
        context.save();
        context.globalAlpha = body.render.opacity !== undefined ? body.render.opacity : 1.0;

        context.shadowColor = "rgba(0, 0, 0, 0.4)";
        context.shadowBlur = 4;
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;

        context.translate(pos.x, pos.y);
        context.rotate(body.angle);

        // Draw the image centered
        context.drawImage(img, -r, -r, r * 2, r * 2);

        context.restore();
    }
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

        if (dirX > 0) t = Math.min(t, (565 - player.position.x) / dirX);
        if (dirX < 0) t = Math.min(t, (35 - player.position.x) / dirX);
        if (dirY > 0) t = Math.min(t, (565 - player.position.y) / dirY);
        if (dirY < 0) t = Math.min(t, (35 - player.position.y) / dirY);

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

            const safeDistance = 35;
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

        const startWidth = 4 + (power * 1.5); // Thinner base
        const endWidth = 4;                 // Sleeker tip transition

        const dx = solidEndX - player.position.x;
        const dy = solidEndY - player.position.y;
        const len = Math.hypot(dx, dy);

        let nx = 0;
        let ny = 0;
        if (len > 0) {
            nx = -dy / len;
            ny = dx / len;
        }

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

        // Arrow Tip dimensions (sleeker, matching user request)
        const arrowLength = 11 + (power * 4);
        const arrowWidth = 7 + (power * 2.5);

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

        const gradient = context.createLinearGradient(
            player.position.x, player.position.y,
            tip.x, tip.y
        );
        gradient.addColorStop(0.0, "#ffffff");
        gradient.addColorStop(0.3, "#ffea00");
        gradient.addColorStop(0.7, "#ff6d00");
        gradient.addColorStop(1.0, "#e52b00");

        // Unified Arrow Path (Shaft + Tip combined to prevent dividing line)
        context.beginPath();
        context.moveTo(p1.x, p1.y);
        context.lineTo(p2.x, p2.y);
        context.lineTo(left.x, left.y);
        context.lineTo(tip.x, tip.y);
        context.lineTo(right.x, right.y);
        context.lineTo(p3.x, p3.y);
        context.lineTo(p4.x, p4.y);
        context.closePath();

        context.fillStyle = gradient;
        context.shadowColor = "rgba(255, 109, 0, 0.4)";
        context.shadowBlur = 6;
        context.fill();

        context.lineWidth = 1.5;
        context.strokeStyle = "#ffffff";
        context.shadowBlur = 0;
        context.stroke();

        // Animated Chevrons inside the shaft
        context.save();
        context.beginPath();
        context.moveTo(p1.x, p1.y);
        context.lineTo(p2.x, p2.y);
        context.lineTo(p3.x, p3.y);
        context.lineTo(p4.x, p4.y);
        context.closePath();
        context.clip();

        context.translate(player.position.x, player.position.y);
        if (len > 0) {
            context.rotate(Math.atan2(dy, dx));
        }

        const time = Date.now();
        const speed = 0.05 + (power * 0.2); // Faster if more power
        const offset = (time * speed) % 20;

        context.strokeStyle = "rgba(255, 255, 255, 0.6)";
        context.lineWidth = 1.2;
        context.lineCap = "round";
        context.lineJoin = "round";

        for (let x = offset; x < len; x += 20) {
            context.beginPath();
            context.moveTo(x - 6, -startWidth);
            context.lineTo(x, 0);
            context.lineTo(x - 6, startWidth);
            context.stroke();
        }
        context.restore();

        // Thin, clean white dashed line projecting forward
        context.beginPath();
        context.moveTo(solidEndX, solidEndY);

        if (firstCoin) {
            context.lineTo(firstCoin.x, firstCoin.y);
        } else {
            context.lineTo(hitX, hitY);
        }

        context.setLineDash([6, 6]);
        context.strokeStyle = "rgba(255, 255, 255, 0.85)";
        context.lineWidth = 2;
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
let startX = 130;
let startY = 492;
let queenStatus = "board";
let queenPocketedBy = null;
let pocketedInCurrentShot = [];

Matter.Events.on(engine, 'afterUpdate', () => {
    const pockets = [
        { x: 56, y: 56 }, { x: 56, y: 544 },
        { x: 544, y: 56 }, { x: 544, y: 544 }
    ];
    const coinPocketRadius = 20;    // Coins fall in at 20px from pocket center
    const strikerPocketRadius = 6; // Striker needs to go EXTREMELY deep to fall in (almost dead center)
    const allBodies = Composite.allBodies(engine.world);

    allBodies.forEach(body => {
        if (body.label === 'striker' || body.label === 'queen' || body.label === 'white' || body.label === 'black') {
            for (let pocket of pockets) {
                const dx = body.position.x - pocket.x;
                const dy = body.position.y - pocket.y;
                const distSq = dx * dx + dy * dy;
                const effectiveRadius = (body.label === 'striker') ? strikerPocketRadius : coinPocketRadius;
                const radiusSq = effectiveRadius * effectiveRadius;
                if (distSq < radiusSq) {
                    if (body.isPocketed) {
                        break;
                    }

                    body.isPocketed = true;
                    body.pocketStartFrame = 0;
                    body.targetPocket = { x: pocket.x, y: pocket.y };
                    body.collisionFilter.mask = 0;
                    body.render.opacity = 1.0;

                    if (body.label === 'striker') {
                        foul = true;
                        if (!pocketedInCurrentShot.includes("striker")) {
                            pocketedInCurrentShot.push("striker");
                        }
                    } else {
                        pocketedInCurrentShot.push(body.label);
                    }
                    spawnPocketParticles(pocket.x, pocket.y, body.label);
                    break;
                }
            }
        }
    });

    allBodies.forEach(body => {
        if (body.isPocketed) {
            body.pocketStartFrame = (body.pocketStartFrame || 0) + 1;

            let target = body.targetPocket;
            if (target) {
                let dx = target.x - body.position.x;
                let dy = target.y - body.position.y;
                Matter.Body.setVelocity(body, { x: dx * 0.15, y: dy * 0.15 });
            }

            if (body.pocketStartFrame > 10) {
                body.render.opacity = Math.max(0, body.render.opacity - 0.05);
            }

            if (body.render.opacity <= 0 || body.pocketStartFrame >= 70) {
                if (body.label === 'striker') {
                    // Reset the striker after animation finishes!
                    body.isPocketed = false;
                    body.render.opacity = 1.0;
                    body.collisionFilter.mask = 1;
                    Matter.Body.setVelocity(body, { x: 0, y: 0 });
                    Matter.Body.setAngularVelocity(body, 0);
                    Matter.Body.setPosition(body, { x: startX, y: startY });
                } else {
                    Composite.remove(engine.world, body);
                }
            }
        }
    });

    const allStopped = allBodies.every(
        body => body.isPocketed || body.speed < 0.009
    );

    const anyAnimating = allBodies.some(
        body => body.isPocketed && body.render.opacity > 0
    );

    if (isInMotion && allStopped && !anyAnimating && !isAiming) {
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
                startY = 108;
            } else {
                currentPlayer = 1;
                startY = 492;
            }
        }

        earnedExtraTurn = false;
        isInMotion = false;

        syncObjectOnX(85);
        updateTurnIndicator();

        const triggerWin = window.showWinScreen || (typeof showWinScreen !== 'undefined' ? showWinScreen : null);
        if (player1Score >= 9) {
            if (triggerWin) {
                triggerWin(true, window.currentOpponentName || "Opponent");
            }
        } else if (player2Score >= 9) {
            if (triggerWin) {
                triggerWin(false, window.currentOpponentName || "Opponent");
            }
        }
    }

    function returnCoinToBoard(label) {
        let basePosition = { x: 300, y: 300 };

        let newX = basePosition.x;
        let newY = basePosition.y;
        let radius = 15;
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
        // Reuse an existing pocketed coin if available
        let coinToReturn = coins.find(c => c.label === label && c.isPocketed);
        if (!coinToReturn && label === 'queen' && target && target.isPocketed) {
            coinToReturn = target;
        }

        if (coinToReturn) {
            coinToReturn.isPocketed = false;
            coinToReturn.render.opacity = 1.0;
            coinToReturn.collisionFilter.mask = 0xFFFFFFFF;
            coinToReturn.collisionFilter.category = 1;
            Matter.Body.setPosition(coinToReturn, { x: newX, y: newY });
            Matter.Body.setVelocity(coinToReturn, { x: 0, y: 0 });
            Matter.Body.setAngularVelocity(coinToReturn, 0);
            if (!Composite.allBodies(engine.world).includes(coinToReturn)) {
                Composite.add(engine.world, coinToReturn);
            }
        } else {
            let newCoin;
            if (label === "white" || label === "black") {
                newCoin = Bodies.circle(newX, newY, GAME_CONFIG.coin.radius, {
                    label: label,
                    inertia: GAME_CONFIG.coin.inertia,
                    restitution: GAME_CONFIG.coin.restitution,
                    friction: GAME_CONFIG.coin.friction,
                    frictionAir: GAME_CONFIG.coin.frictionAir,
                    frictionStatic: GAME_CONFIG.coin.frictionStatic,
                    density: GAME_CONFIG.coin.density,
                    slop: GAME_CONFIG.coin.slop,
                    plugin: { ccd: { toggled: true } },
                    render: { visible: false }
                });
            } else if (label === "queen") {
                newCoin = Bodies.circle(newX, newY, GAME_CONFIG.queen.radius, {
                    label: 'queen',
                    inertia: GAME_CONFIG.queen.inertia,
                    frictionAir: GAME_CONFIG.queen.frictionAir,
                    friction: GAME_CONFIG.queen.friction,
                    frictionStatic: GAME_CONFIG.queen.frictionStatic,
                    restitution: GAME_CONFIG.queen.restitution,
                    density: GAME_CONFIG.queen.density,
                    slop: GAME_CONFIG.queen.slop,
                    plugin: { ccd: { toggled: true } },
                    render: { visible: false }
                });
            }
            if (newCoin) {
                Composite.add(engine.world, newCoin);
            }
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

    startX = 152 + (newX / 170) * 296;

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

                if (dx * dx + dy * dy < 1200) {
                    blocked = true;
                    if (Math.abs(body.position.x - 152) < 10) {
                        tempX = body.position.x + 33;
                    } else {
                        let prevX = tempX;
                        tempX = body.position.x + 33;
                        if (Math.abs(tempX - prevX) < 10) {
                            tempX += 20;
                        }
                    }
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
    const scaleX = 190 / sliderRect.width;
    const mouseX = (event.clientX - sliderRect.left) * scaleX;
    syncObjectOnX(mouseX);
});

if (knobElement) {
    knobElement.addEventListener('touchstart', (e) => {
        isDragging = true;
        if (e.cancelable) e.preventDefault();
    }, { passive: false });
}

window.addEventListener('touchmove', (event) => {
    if (!isDragging || !knobElement) return;
    const sliderRect = knobElement.parentElement.getBoundingClientRect();
    const scaleX = 190 / sliderRect.width;
    const touchX = (event.touches[0].clientX - sliderRect.left) * scaleX;
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
    body.render.visible = false;
});

updateTurnIndicator();
syncObjectOnX(85);

window.resetGameBoard = function () {
    // Purge any dynamic extra bodies created during fouls/penalties
    const currentWorldBodies = Composite.allBodies(engine.world);
    currentWorldBodies.forEach(b => {
        if (b !== player && b !== target && (!coins || !coins.includes(b))) {
            if (b.label === 'white' || b.label === 'black' || b.label === 'queen' || b.label === 'striker') {
                Composite.remove(engine.world, b);
            }
        }
    });

    if (typeof player1Score !== 'undefined') player1Score = 0;
    if (typeof player2Score !== 'undefined') player2Score = 0;
    if (typeof currentPlayer !== 'undefined') currentPlayer = 1;
    if (typeof startY !== 'undefined') startY = 492;
    if (typeof queenStatus !== 'undefined') queenStatus = "uncovered";
    if (typeof queenCoveredBy !== 'undefined') queenCoveredBy = null;
    if (typeof foul !== 'undefined') foul = false;
    if (typeof earnedExtraTurn !== 'undefined') earnedExtraTurn = false;
    if (typeof isInMotion !== 'undefined') isInMotion = false;
    if (typeof pocketedInCurrentShot !== 'undefined') pocketedInCurrentShot = [];

    const p1ScoreEl = document.getElementById("p1score");
    const p2ScoreEl = document.getElementById("p2score");
    if (p1ScoreEl) p1ScoreEl.textContent = "0";
    if (p2ScoreEl) p2ScoreEl.textContent = "0";

    if (typeof player !== 'undefined' && player) {
        player.isPocketed = false;
        player.render.opacity = 1;
        player.collisionFilter.mask = 0xFFFFFFFF;
        player.collisionFilter.category = 1;
        Matter.Body.setPosition(player, { x: 130, y: 492 });
        Matter.Body.setVelocity(player, { x: 0, y: 0 });
        Matter.Body.setAngularVelocity(player, 0);
        if (!Composite.allBodies(engine.world).includes(player)) {
            Composite.add(engine.world, player);
        }
    }

    if (typeof target !== 'undefined' && target) {
        target.isPocketed = false;
        target.render.opacity = 1;
        target.collisionFilter.mask = 0xFFFFFFFF;
        target.collisionFilter.category = 1;
        Matter.Body.setPosition(target, { x: 300, y: 300 });
        Matter.Body.setVelocity(target, { x: 0, y: 0 });
        Matter.Body.setAngularVelocity(target, 0);
        if (!Composite.allBodies(engine.world).includes(target)) {
            Composite.add(engine.world, target);
        }
    }

    if (typeof coins !== 'undefined' && Array.isArray(coins)) {
        coins.forEach((c, idx) => {
            const layoutPos = coinLayout[idx];
            if (layoutPos) {
                c.isPocketed = false;
                c.render.opacity = 1;
                c.collisionFilter.mask = 0xFFFFFFFF;
                c.collisionFilter.category = 1;
                Matter.Body.setPosition(c, { x: layoutPos.x, y: layoutPos.y });
                Matter.Body.setVelocity(c, { x: 0, y: 0 });
                Matter.Body.setAngularVelocity(c, 0);
                if (!Composite.allBodies(engine.world).includes(c)) {
                    Composite.add(engine.world, c);
                }
            }
        });
    }

    syncObjectOnX(85);
    updateTurnIndicator();
};

Runner.run(runner, engine);