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

function create_scene(canvas) {
    var k;
    var ships = new Array(7);
    
    var scene = Object.create(CanvasManager).fromElement(canvas);
    
    s = Object.create(Ship);
    
    s.icon = Image.fromURL("pics/ship.png");
    s.pos = Vec2.new_at(0, 300);
    //s.ang_vel = Math.PI/12;
    //s.vel = Vec2.new_at(10, 0);

    var alpha;
    for (k = 0; k < ships.length; k++) {
        ships[k] = Object.create(s);
        
        var r = 200;
        alpha = k * 2*Math.PI / ships.length;

        ships[k].pos = Vec2.new_at(400, 300).iadd(Vec2.radial(r, alpha));
        
        ships[k].angle = Math.PI + alpha + Math.PI/4.4;
        ships[k].vel = Vec2.radial(5, ships[k].angle);
        ships[k].ang_vel = -0.005;
        
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