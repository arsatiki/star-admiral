
var sceneObjectSort = SortBy('z', 'created');

var CanvasManager = (function() {

    return {
        'time': 0,
        'nodes': [],
        
        fromElement: function(el) {
            this.context = el.getContext('2d');
            return this;
        },
        
        update: function(t_delta) {
            var k, current;
            var by_time, by_self;
            this.time += t_delta;
            
            for (k = 0; k < this.nodes.length; k++) {
                current = this.nodes[k];
                current.node.update(t_delta);
                
                // This approach is wrong.
                // is_dead should be a function of the node
                // bcos some deaths may only occur after update
                // but! If something dies because it is old
                // and something else depends on it, how to signal this?
                
                by_time = current.dies !== undefined && this.time > current.dies;
                current.node.dead |= by_time;
            }
            
            this.nodes = this.nodes.filter(function(c) {
                return !c.node.dead;
            });
            
            return this;
        }, 
        
        draw: function(opts) {
            opts = opts || {};
            var canvas;

            if (opts.clear) {
                canvas = this.context.canvas;
                this.context.clearRect(0, 0, canvas.width, canvas.height);
            }
            var outer = this;
            this.nodes.sort(sceneObjectSort);
            this.nodes.forEach(function(x) {
                x.node.draw(outer.context);
            });
        }, 
        
        add: function(node, opts) {
            opts = opts || {};
            if (!opts.z || opts.z < 0) { opts.z = 0; }

            var new_node = {
                'node': node,
                'created': this.time,
                'z': opts.z
            };
            
            if (opts.TTL !== undefined) { 
                new_node.dies = new_node.created + opts.TTL;
            }

            this.nodes.push(new_node);
            
            return new_node;
        }
        
    };
}) ();

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
