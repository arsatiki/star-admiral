var ARMADATA = ARMADATA || {};

ARMADATA.canvasManager = function() {
    var context;
    
    var show_bg = false, paused = true;
        
    return {
        fromElement: function(el) {
            context = el.getContext('2d');
            return context;
        },
        
        loop: function() {
            if (paused)
                return;
            
            if (show_bg) {
                // do shit
            }
            
            
            
        }
    };
} ();