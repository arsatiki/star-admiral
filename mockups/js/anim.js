
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
                
                by_time = current.dies && this.time > current.dies;
                current.node.dead |= by_time;
            }
            
            this.nodes = this.nodes.filter(function(c) {
                return !c.node.dead;
            });
            
            return this;
        }, 
        
        draw: function() {
            var outer = this;
            this.nodes.sort(sceneObjectSort);
            this.nodes.forEach(function(x) {x.node.draw(outer.context);});
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

