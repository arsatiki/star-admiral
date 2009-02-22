var mars;
var markers;
var map;

function mark(iconfile, x, y) {
  size = new OpenLayers.Size(32, 32);
  icon = new OpenLayers.Icon(iconfile, 
             size, new OpenLayers.Pixel(-size.w/2, -size.h/2));
  pos = new OpenLayers.LonLat(x, y);

  return new OpenLayers.Marker(pos, icon);
}

/*
function update_planet(marker, radius, angle) {
    x = radius * Math.sin(angle);
    y = radius * Math.cos(angle);
    
    marker.
    setTimeout("update_planet")
}

function add_planet(marker, radius) {
    update_planet(marker, radius, 0);
}
*/
function initmap() {
    base_size = new OpenLayers.Bounds(-80, -60, 80, 60);

    var custom = [
        new OpenLayers.Control.PanZoomBar(),
        new OpenLayers.Control.DragPan(),
        new OpenLayers.Control.MouseDefaults(),
        //new OpenLayers.Control.MouseToolbar(),
        new OpenLayers.Control.KeyboardDefaults()    
    ];

    map_opts = {controls: custom, alwaysInRange: true, 
                 restrictedExtent: base_size,};
    map = new OpenLayers.Map('map', map_opts);

    for (var i = 0; i < custom.length; i++ ) { custom[i].activate(); }

    
    var base_opts = {isBaseLayer:true, 
                     units:'m',
                     resolutions:[.2, .15, .1,, .075, 0.05],
                     transitionEffect: 'resize',
                     };

    var base = new OpenLayers.Layer.Image('base', 'full_jpg.jpg', 
                    base_size, 
                    new OpenLayers.Size(3690, 3743),
                    base_opts);

    map.addLayer(base);

    markers = new OpenLayers.Layer.Markers('markers');
    map.addLayer(markers);

    mars = mark('mars.gif', 20, 25);
    /*add_planet(mars, 5);*/
    
    markers.addMarker(mark('sun.gif', 0, 0));
    markers.addMarker(mars);
    

    map.zoomToMaxExtent();
    map.setCenter(new OpenLayers.LonLat(0, 0));

}