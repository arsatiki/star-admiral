var Vec2 = function() {
    var x, y;
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
                return Math.atan2(thix.x, this.y);
            
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
        }
    };
}();

Vec2.i = Vec2.new_at(1,0);
Vec2.j = Vec2.new_at(0, 1);

var Ship = function() {
}();