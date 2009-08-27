
// Object.create. From Douglas Crockford.
// newObject = Object.create(oldObject);
if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}


// From hunlock.com
//This prototype is provided by the Mozilla foundation and
//is distributed under the MIT license.
//http://www.ibiblio.org/pub/Linux/LICENSES/mit.license

if (!Array.prototype.filter) {
    Array.prototype.filter = function(fun) {
        var len = this.length;
        if (typeof fun != "function")
            throw new TypeError();

        var res = [];
        var thisp = arguments[1];
        for (var i = 0; i < len; i++) {
            if (! (i in this))
                continue;

            var val = this[i];
            // in case fun mutates this
            if (fun.call(thisp, val, i, this))
            res.push(val);
        }

        return res;
    };
}

if (!Array.prototype.forEach)  {
    Array.prototype.forEach = function(fun /*, thisp*/) {
        var len = this.length;
        if (typeof fun != "function")
            throw new TypeError();

        var thisp = arguments[1];
        for (var i = 0; i < len; i++) {
            if (i in this)
                fun.call(thisp, this[i], i, this);
        }
    };
}

function SortBy() {
    var k;
    var keys = arguments;
    return function(a, b) {
        var key, diff;
        for (k = 0; k < keys.length; k++) {
            key = keys[k];
            diff = a[key] - b[key];
            if (diff != 0)
                return diff;
        }
        return 0;
    };
}

Math.random0w = function(w) { return w*(Math.random() - 0.5); };
