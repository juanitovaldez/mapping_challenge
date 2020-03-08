window.onload = function() {
    L.mapquest.key = 'lYrP4vF3Uk5zgTiGGuEzQGwGIVDGuy24';
    var baseLayer = L.mapquest.tileLayer('hybrid');
    

    var map = L.mapquest.map('map', {
      center: L.latLng(0, 0),
      layers: baseLayer,
      zoom: 2
    });

  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson", function(error, quakes) {
    if (error) throw error;
    //I messed up earlier, this should fix things without refactoring too much
    
    var features = quakes.features;
    // console.log(feature)


  
    //Making markers for quake events:
    var markers = L.markerClusterGroup();

    for (var i = 0; i < features.length; i++) {
      console.log(features[i].properties.code)
      properties = features[i].properties
      console.log(properties)
      geometry = features[i].geometry

      var popup = '<b>Event UID Code: </b>' + properties.code +
              '<br/><b>Local: </b>' + properties.place +
              '<br/><b>Significance: </b>' + properties.sig +
              '<br/><b>Magnitude: </b>' + properties.mag +
              '<br/><b>Latitude: </b>' + geometry.coordinates[1] +
              '<br/><b>Longitude: </b> ' + geometry.coordinates[0];   
       
        // var quake = quakes.features[i];
        var title = properties.code + ': ' + properties.mag;
        var lat = geometry.coordinates[1];
        var lng = geometry.coordinates[0];
        console.log(lat, lng, title);
        var marker = L.marker(new L.LatLng(lat, lng) , {
          title: title,
          icon: L.mapquest.icons.marker()
        
        });

      marker.bindPopup(popup);
      markers.addLayer(marker);
    };
    markers.addTo(map);

    var heatArray = [];

      for (var i = 0; i < features.length; i++) {
        qevent = features[i].geometry;
        console.log(qevent)
    
        if (qevent) {
          heatArray.push([qevent.coordinates[1], qevent.coordinates[0]]);
        }
      }
    
     var heat = L.heatLayer(heatArray, {
        minOpacity: .75,
        maxZoom: 11,
        radius: 42,
        blur: 69
      }).addTo(map);

  });
}
