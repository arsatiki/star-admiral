function add_beams(scene, ships) {
    var k;
    
    for (k = 0; k < ships.length; k++) {
        var aggressor = ships[k];
        var target = ships[(k - 2 + ships.length) % ships.length];
        var sources = [aggressor.local(14, 20), aggressor.local(26, 20)];
        
        var opts = {level: k, width: 2+k/2};
        
        scene.add(
            Beam.fire(sources, target.local(20, 25), opts),
            {z: 1, TTL: 5+2*k}
        );
    }
    
}

function create_ship(k, n) {
    var alpha = k * 2*Math.PI / n;

    var ship = Object.create(Ship);
    ship.icon = Image.fromURL("pics/ship.png");

    ship.pos = Vec2.new_at(400, 300).iadd(Vec2.radial(200, alpha));
    
    ship.angle = Math.PI + alpha + Math.PI/4.4;
    ship.vel = Vec2.radial(5, ship.angle);
    ship.ang_vel = -0.005;
    
    return ship;
}

function create_scene(canvas) {
    var k;
    var ships = new Array(7);
    
    var scene = Object.create(CanvasManager).fromElement(canvas);

    for (k = 0; k < ships.length; k++) {
        ships[k] = create_ship(k, ships.length);
        scene.add(ships[k]);
    }
    
    add_beams(scene, ships);

    var exploder = 0, explo = 0;
    setInterval(function(){
        var exp = Object.create(explosions[explo]);
        exp.space = ships[exploder];
        exp.scale = 0.5 + 0.075 * exploder;
        exploder++;  explo++;
        exploder = exploder % ships.length;
        explo = explo % explosions.length;
        
        scene.add(exp, {z:3});
        
    }, 1000); 
    
    return scene;
}