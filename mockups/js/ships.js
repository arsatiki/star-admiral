var Vec2 = function() {
    var that = this;
    
    return {
        'new_at': function(xx, yy) {
            new_vec = Object.create(this);
            new_vec.x = xx;
            new_vec.y = yy;
            return new_vec;
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

        
    }
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
        
        'transform_to_local': function(ctx) {
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
        
        'local': function(x, y) { return {'x': x, 'y': y, 'space': this}; }
    }
    
}();

var Beam = function() {
    var that = this;
    that.levels = [0, 30, 60, 120, 240, 270];
    
    function hue(level) {
        return "hsl( " + that.levels[level] + ", 100%, 100%)";
    }
    
    return {
        'level': 1, 'width': 3, 'sigma': 3,
        
        'hue': function(l) { return that.levels[l]; },
        'fire': function(ctx, sources, target) {
            var sid, bid;
            var lineWidths = [this.width, this.width-1.5];
            var colors = [that.hue(this.level), "#fff"];
                        
            var tgx = target.x + this.sigma * Math.random();
            var tgy = target.y + this.sigma * Math.random();
            
            ctx.save();
            c.beginPath();
            ctx.lineCap = "round";
            
            for (bid = 0; bid < colors.length; bid++) {
                ctx.lineWidth = lineWidths[bid];
                ctx.strokeStyle = colors[bid];
                
                for (sid = 0; sid < sources.length; sid++) {
                    sources[sid].space.transform_to_local(ctx);
                    ctx.moveTo(sources[sid].x, sources[sid].y);
                    ctx.save();
                    ctx.setTransform(1, 0, 0, 1, 0, 0);
                    target.space.transform_to_local(ctx);
                    ctx.lineTo(tgx, tgy);
                    ctx.restore();
                }
                ctx.stroke();
            }
            
            ctx.restore();
        }
    }
}();