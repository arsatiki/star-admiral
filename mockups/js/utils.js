
// Object.create. From Douglas Crockford.
// newObject = Object.create(oldObject);
if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}


