// TODO:
// - separate "spaces" from ships, i.e. ship contains space. Possible?
// - Explosion is actually a frame based animation. Separate.

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
        frame: -1, n_rows: 0, n_cols: 0,
        image: null,
        space: {},
        scale: 1,

        create: function(img, rows, cols, space) {
            var n = Object.create(Explosion);
            n.image = Image.fromURL(img);
            n.n_cols = cols; n.n_rows = rows;
            n.space = space;
            return n;
        },

        update: function(t_d) {
            // TODO: Currently throws away t_d
            // consider interpolation
            this.frame++;
            if (this.frame > (this.n_cols * this.n_rows -1))
                this.dead = true;
        },
        
        draw: function(ctx) {
            coords = framecoords(this.frame, this.n_cols);
            var dw = this.scale * coords.sw;
            var dh = this.scale * coords.sh;
            
            ctx.save();
            this.space.transform_to_local(ctx);
            ctx.drawImage(this.image, 
                coords.sx, coords.sy, coords.sw, coords.sh, 
                20-dw/2, 25-dh/2, dw, dh);
            ctx.restore();
        },
    };
})();

var explosions = [], explosion_i;
for (explosion_i = 0; explosion_i < 8; explosion_i++ ) {
    var imgname = 'pics/ani' + (explosion_i+1) + '.png';
    explosions[explosion_i] = Explosion.create(imgname, 4, 4);
}
