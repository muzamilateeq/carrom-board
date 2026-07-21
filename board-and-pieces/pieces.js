const player = Matter.Bodies.circle(300, 492, GAME_CONFIG.striker.radius, {
    id: 'striker',
    label: 'striker',
    inertia: GAME_CONFIG.striker.inertia,
    frictionAir: GAME_CONFIG.striker.frictionAir,
    restitution: GAME_CONFIG.striker.restitution,
    slop: GAME_CONFIG.striker.slop,
    friction: GAME_CONFIG.striker.friction,
    frictionStatic: GAME_CONFIG.striker.frictionStatic,
    density: GAME_CONFIG.striker.density,
    plugin: { ccd: { toggled: true } },
    render: { visible: false }
});

const target = Matter.Bodies.circle(300, 300, GAME_CONFIG.queen.radius, {
    id: 'queen',
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

const coinLayout = [
    { x: 331, y: 300, type: 'white' },
    { x: 316, y: 327, type: 'black' },
    { x: 285, y: 327, type: 'white' },
    { x: 269, y: 300, type: 'black' },
    { x: 285, y: 273, type: 'white' },
    { x: 316, y: 273, type: 'black' },
    { x: 362, y: 300, type: 'black' },
    { x: 347, y: 327, type: 'white' },
    { x: 331, y: 354, type: 'black' },
    { x: 300, y: 354, type: 'white' },
    { x: 269, y: 354, type: 'black' },
    { x: 254, y: 327, type: 'white' },
    { x: 238, y: 300, type: 'black' },
    { x: 254, y: 273, type: 'white' },
    { x: 269, y: 246, type: 'black' },
    { x: 300, y: 246, type: 'white' },
    { x: 331, y: 246, type: 'black' },
    { x: 347, y: 273, type: 'white' }
];

const coins = coinLayout.map((coin, index) => {
    return Matter.Bodies.circle(coin.x, coin.y, GAME_CONFIG.coin.radius, {
        id: `${coin.type}_${index + 1}`,
        label: coin.type,
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
});
