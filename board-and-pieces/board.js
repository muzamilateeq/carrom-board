const topWall = Matter.Bodies.rectangle(300, -62.3, 800, 200, {
    restitution: 0.85,
    friction: 0,
    frictionStatic: 0,
    slop: 0,
    isStatic: true, render: { visible: false }
});
const bottomWall = Matter.Bodies.rectangle(300, 662.3, 800, 200, {
    restitution: 0.85,
    friction: 0,
    frictionStatic: 0,
    slop: 0,
    isStatic: true, render: { visible: false }
});
const leftWall = Matter.Bodies.rectangle(-62.3, 300, 200, 800, {
    restitution: 0.85,
    friction: 0,
    frictionStatic: 0,
    slop: 0,
    isStatic: true, render: { visible: false }
});
const rightWall = Matter.Bodies.rectangle(662.3, 300, 200, 800, {
    restitution: 0.85,
    friction: 0,
    frictionStatic: 0,
    slop: 0,
    isStatic: true, render: { visible: false }
});

const rectangle1 = Matter.Bodies.rectangle(300, 108, 380, 40, {
    isSensor: true, isStatic: true, chamfer: { radius: 10 }, render: { visible: false }
});
const rectangle2 = Matter.Bodies.rectangle(300, 492, 380, 40, {
    isSensor: true, isStatic: true, chamfer: { radius: 10 }, render: { visible: false }
});
const rectangle3 = Matter.Bodies.rectangle(108, 300, 40, 380, {
    isSensor: true, isStatic: true, chamfer: { radius: 10 }, render: { visible: false }
});
const rectangle4 = Matter.Bodies.rectangle(492, 300, 40, 380, {
    isSensor: true, isStatic: true, chamfer: { radius: 10 }, render: { visible: false }
});

const circle1 = Matter.Bodies.circle(492, 134, 16, {
    isStatic: true,
    isSensor: true,
    render: { visible: false }
});
const circle2 = Matter.Bodies.circle(492, 466, 16, {
    isStatic: true,
    isSensor: true,
    render: { visible: false }
});
const circle3 = Matter.Bodies.circle(108, 134, 16, {
    isStatic: true,
    isSensor: true,
    render: { visible: false }
});
const circle4 = Matter.Bodies.circle(108, 466, 16, {
    isStatic: true,
    isSensor: true,
    render: { visible: false }
});
const circle5 = Matter.Bodies.circle(134, 492, 16, {
    isStatic: true,
    isSensor: true,
    render: { visible: false }
});

const circle6 = Matter.Bodies.circle(466, 492, 16, {
    isStatic: true,
    isSensor: true,
    render: { visible: false }
});
const circle7 = Matter.Bodies.circle(134, 108, 16, {
    isStatic: true,
    isSensor: true,
    render: { visible: false }
});

const circle8 = Matter.Bodies.circle(466, 108, 16, {
    isStatic: true,
    isSensor: true,
    render: { visible: false }
});
