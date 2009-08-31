var Ship = function() {
    var that = this;

    var icon;
    
    return {
        // position and velocity
        'pos': Vec2.new_at(0, 0), 'vel': Vec2.new_at(0, 0),

        // angle and angular speed
        'angle': 0, 'ang_vel': 0,
        
        'in_sector': function(target, sector_angle) {
            var dir = target.position.add(this.position.scale(-1));
            var angular_diff = Math.abs(dir.angle() - this.angle);
            return (angular_diff > sector_angle/2);
        },
        
        'transform_to_local': function(ctx) {
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.translate(this.pos.x, this.pos.y);
            ctx.rotate(Math.PI/2);
            ctx.rotate(this.angle);
            ctx.translate(-this.icon.width/2, -this.icon.height/2);
        },
    
        // v and ang_vel specified in units / sec, i.e. update(1/framerate)
        'update': function(t_delta) {
            this.pos.iadd(this.vel.mul(t_delta));
            this.angle += t_delta * this.ang_vel;
            return this;
        },
    
        'draw': function(ctx) {
            ctx.save();
            this.transform_to_local(ctx);
            ctx.drawImage(this.icon, 0, 0);
            ctx.restore();
        }, 
                
        'local': function(x, y) {
            return {'x': x, 'y': y, 'space': this};
        }
    };
    
}();

var Beam = (function() {
    var that = this;
    that.levels = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
    
        
    return {
        'level': 1, 'width': 3, 'sigma': 1,
        
        'fire': function (sources, target, opts) {
            var opt;
            
            newbeam = Object.create(this);
            newbeam.sources = sources;
            newbeam.target = target;
            for (opt in opts)
                if (opt in newbeam)
                    newbeam[opt] = opts[opt];
            
            return newbeam;
        },
        
        'update': function(t_d) {
            
        },
        
        fillBeam: function(ctx, source, target_space, tgx, tgy, r) {
            var k, NGONS = 7;
            var angle = 2 * Math.PI / NGONS;
            ctx.save();
            source.space.transform_to_local(ctx);
            ctx.translate(source.x, source.y);

            ctx.beginPath();
            for (k = 0; k < NGONS; k += 1) {
                ctx.rotate(angle);
                ctx.moveTo(r, 0);

                ctx.save();
                ctx.save();
                target_space.transform_to_local(ctx);
                ctx.lineTo(tgx, tgy);
                ctx.restore();
                
                ctx.rotate(-angle);
                ctx.lineTo(r, 0);
                
                ctx.restore();
                ctx.lineTo(r, 0);

                ctx.fill();
            }

            ctx.restore();
        },
        
        'draw': function(ctx) {
            var sid, bid;
            var lineWidths = [this.width, this.width*2/3];
            var colors = [that.levels[this.level], "#fff"];
                        
            var tgx = this.target.x + Math.random0w(this.sigma * this.width);
            var tgy = this.target.y + Math.random0w(this.sigma * this.width);

            ctx.save();
            ctx.beginPath();
            ctx.lineCap = "round";
            
            for (bid = 0; bid < colors.length; bid++) {
                ctx.fillStyle = colors[bid];
                ctx.shadowBlur = lineWidths[bid];
                ctx.shadowColor = colors[bid];
                
                for (sid = 0; sid < this.sources.length; sid++) {
                    this.fillBeam(ctx, this.sources[sid], this.target.space, tgx, tgy, lineWidths[bid] / 2);
                }
            }
            
            ctx.restore();
        }
    };
})();


