
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
                
                by_time = current.dies && this.time > current.dies;
                current.node.dead |= by_time;
            }
            
            this.nodes = this.nodes.filter(function(c) {
                return !c.node.dead;
            });
            
            return this;
        }, 
        
        draw: function(opts) {
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
        
        add: function(node, z, TTL) {
            if (!z || z < 0) { z = 0; }

            var new_node = {
                'node': node,
                'created': this.time,
                'z': z
            };
            
            if (TTL) { new_node.dies = new_node.created + TTL; }

            this.nodes.push(new_node);
            
            return new_node;
        }
        
    };
}) ();

