var Vec2 = function() {
    var that = this;
    
    return {
        'new_at': function(xx, yy) {
            new_vec = Object.create(this);
            new_vec.x = xx;
            new_vec.y = yy;
            return new_vec;
        },
        
        radial: function(r, theta) {
            return this.new_at(r * Math.cos(theta), r * Math.sin(theta));
        },
        
        
        'magnitude': function() { return Math.sqrt(this.dot(this)); },
        'angle':  function(other) { 
            if (arguments.length === 0)
                return Math.atan2(this.y, this.x);
            
            return Math.acos(this.dot(other));
        },
        'unit': function() {
            var len = this.magnitude();
            return this.new_at(this.x / len, this.y / len);
        },
        'dist': function(other) {
            var diff = this.new_at(this.x - other.x, this.y - other.y);
            return diff.magnitude();
        },
        
        'dot': function(other) {
            return this.x * other.x + this.y * other.y;
        },
        
        'iadd': function(other) {
            this.x += other.x;
            this.y += other.y;
            return this;
        },
        'add': function(other) {
            var newv = Object.create(this);
            return newv.iadd(other);
        },

        'imul': function(scalar) {
            this.x *= scalar;
            this.y *= scalar;
            return this;
        },

        'mul': function(scalar) {
            var newv = Object.create(this);
            return newv.imul(scalar);
        }
    };
}();

Vec2.i = Vec2.new_at(1,0);
Vec2.j = Vec2.new_at(0, 1);


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
        
        'load_icon': function(url) {
            this.icon = new Image();
            this.icon.src = url;
            return this;
        },
        
        'local': function(x, y) {
            return {'x': x, 'y': y, 'space': this};
        }
    };
    
}();

Math.random0w = function(w) { return w*(Math.random() - 0.5); };

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
                ctx.lineWidth = lineWidths[bid];
                ctx.strokeStyle = colors[bid];
                
                for (sid = 0; sid < this.sources.length; sid++) {
                    this.sources[sid].space.transform_to_local(ctx);
                    ctx.moveTo(this.sources[sid].x, this.sources[sid].y);

                    // TODO: Demeter screams bread.
                    this.target.space.transform_to_local(ctx);
                    ctx.lineTo(tgx, tgy);
                }
                ctx.stroke();
            }
            
            ctx.restore();
        }
    };
})();

function framecoords(frame, n_cols) {
    if (!n_cols) {
        n_cols = 4;
    }

    var wf = 256/4, hf = 256/4;
    var xi = frame % n_cols;
    var yi = (frame - xi) / n_cols;
    
    return { 'sx': xi*wf, 'sy': yi*hf, 'sw': wf, 'sh': hf };
}

var Explosion = (function() {
    

    return {
        'foo': 'bar'
    };
})();

var Billy = (function() {
    return {
        'fire': function (source, target) {
            var newob = Object.create(this);
            newob.source = source;
            newob.target = target;
            newob.radius = 0;
            
            return newob;
        },
        
        'update': function(t_d) {
            var speed = 10;
            this.radius += speed * t_d;
        },
        
        'draw': function(ctx) {
            // TODO: Add a diff method to vec2!
            var diff = this.target.pos.add(this.source.pos.mul(-1));
            var angle, distance = diff.magnitude();

            var center, radius;
            
            if (this.radius < 0.75 * distance) {
                // expanding phase
                center = this.source.pos;
                radius = this.radius;
                diff.imul(-1);
            } else {
                // contracting phase
                center = this.target.pos;
                radius = distance - this.radius;
            }
                    
            if (radius > 0) {
                ctx.save();
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 1;
                
                angle = diff.angle();
                
                ctx.beginPath();
                ctx.arc(center.x, center.y, radius, angle-Math.PI/2, angle+Math.PI/2, true);
            
                ctx.stroke();
            
                ctx.restore();
            } else {
                this.dead = true;
            }
        }
    };
})();


