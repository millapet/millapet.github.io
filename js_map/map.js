var mymap = L.map('mapid').setView([30, -40], 2);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors | <a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a> | <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a> | Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a> | Icons &copy; <a target="_blank" href="https://icons8.com/icons">Icons8</a>',
	maxZoom: 18,
	id: 'mapbox.dark',
	accessToken: 'pk.eyJ1IjoibWlsbGFwZXQiLCJhIjoiY2pycGRqNHYzMTl4MDN6cGpyZGpsYjRybyJ9.IWzPKinWNt-NvEGxkiJ97g'
}).addTo(mymap);

mymap.attributionControl.setPosition('bottomleft')

// MARKERS
//----------
var articleMarker =	L.icon({
	iconUrl: 'js_map/X.png',
	iconAnchor: [0,30],
	popupAnchor: [5,-30]
});


//GEOJSON LAYER
//----------

function onEachFeature(feature, layer){
	if (feature.properties && feature.properties.title) {
		layer.bindPopup('<body bgcolor="000000"><font size="3"><p><b>'+feature.properties.title+'</b></font><br /><font size="2">'+feature.properties.text+'</p></font></body>')
	}
}
				
var geojsonLayer = L.geoJSON(locations, {
	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {icon: articleMarker})},
		onEachFeature: onEachFeature
}).addTo(mymap);

//CENTERING BUTTON
//----------
var centerControl = L.Control.extend({
	options: {
    position: 'topleft' 
  },
 
  onAdd: function(mymap) {
    var ccontainer = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');

	ccontainer.style.backgroundImage = 'URL(\'https://img.icons8.com/metro/15/000000/center-direction.png\')';
	ccontainer.style.backgroundColor = 'white';
	ccontainer.style.backgroundRepeat = 'no-repeat'
	ccontainer.style.backgroundPosition = 'center';
   ccontainer.style.width = '33px';
   ccontainer.style.height = '33px';
	ccontainer.style.cursor = 'pointer';
	
    ccontainer.onclick = function(){
		mymap.setView([30, -40], 2);
      console.log('buttonClicked');
    }
	ccontainer.onmouseover = function(){
		ccontainer.style.backgroundColor = '#eee';
    }
	ccontainer.onmouseout = function(){
		ccontainer.style.backgroundColor = 'white';
    }
    return ccontainer;
  },
});

mymap.addControl(new centerControl());