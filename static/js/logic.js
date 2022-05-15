

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: LEAFLET
    });

    let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            accessToken: LEAFLET
        });

        // Create a base layer that holds both maps.
let baseMaps = {
    "Streets": streets,
    "Satellite Streets": satelliteStreets
  };

  let map = L.map("mapid", {
    center: [34.0522, -118.2437],
    zoom: 8,
    layers: [streets]
  })

  // Pass our map layers into our layers control and add the layers control to the map.
  L.control.layers(baseMaps).addTo(map);

let myStyle = {
  color: "blue",
  fillColor: "yellow",
  weight: 1
}

maptbody = d3.select("#mapoverview")

function Click(filter){
  maptbody.html("");

  var crimeNames = ["Felony Offenses", "Violent Offenses", "Property Offenses", "Drug Offenses", "Sex Offenses", "Other Offenses", "Misdemeanor", "Status Offenses"]

    for (let i = 0; i < 8; i++){
      let row = maptbody.append("tr");
      let title = row.append("td");
      title.text(crimeNames[i])
      row.append("td").text(laMetro[filter][i])
      row.append("td").text(orange[filter][i])
      row.append("td").text(riverside[filter][i])
      row.append("td").text(SanBernadino[filter][i])
      row.append("td").text(ventura[filter][i])
      
    };

};

function MapCrime(crime){
  function getColor(input) {
    let color = ""
    magnitude = parseInt(input, 10)
    if (magnitude > 50000) {
      color = "#ea2c2c";
    }
    if (magnitude > 30000) {
      color = "#ea822c";
    }
    if (magnitude > 20000) {
      color = "#ee9c00";
    }
    if (magnitude > 5000) {
      color =  "#eecc00";
    }
    if (magnitude > 1000) {
      console.log(magnitude)
      color = "green";
    }

    if (magnitude < 1000){
    color = "blue";
    }

    return color
  }

  var yearSelect = d3.select("#mapDataset").property("value")

  console.log(yearSelect)
  d3.json("static/json/counties.json").then(function(data){
    function styleInfo(feature) {
      return {
          opacity: 1,
          fillOpacity: 1,
          fillColor: getColor(feature.properties.crimes[position][yearSelect][offense]),
          color: "#000000",
          stroke: true,
          weight: 0.5
      };
  };

  
  if (crime == "Felony Offenses"){
    var offense = 0
  };
  if (crime == "Violent Offenses"){
    var offense = 1
  };
  if (crime == "Property Offenses"){
    var offense = 2
  };
  if (crime  == "Drug Offenses"){
    var offense = 3
  };
  if (crime == "Sex Offenses"){
    var offense = 4
  };
  if (crime == "Other Offenses"){
    var offense = 5
  };
  if (crime == "Misdemeanor"){
    var offense = 6
  };
  if (crime == "Status Offenses"){
    var offense = 7
  };



  if (yearSelect == 2011){
    var position = 0
  };
  if (yearSelect == 2012){
    var position = 1
  };
  if (yearSelect == 2013){
    var position = 2
  };
  if (yearSelect == 2014){
    var position = 3
  };
  if (yearSelect == 2015){
    var position = 4
  };
  if (yearSelect == 2016){
    var position = 5
  };
  if (yearSelect == 2017){
    var position = 6
  };
  if (yearSelect == 2018){
    var position = 7
  };
  if (yearSelect == 2019){
    var position = 8
  };
  if (yearSelect == 2020){
    var position = 9
  };


    console.log(data)
    L.geoJSON(data, {
      onEachFeature: function(feature, layer){
        layer.bindPopup("<h2>" + feature.properties.name + ": " + yearSelect+ "</h2><hr><h4>" + crime + ": " + feature.properties.crimes[position][yearSelect][offense] + "</h4>")
      }
    }).addTo(map);
  });

}

function intial(){
  let options = [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];

  for (x in options){
    var selector = d3.select("#mapDataset");

    selector.append("option").text(options[x]).property("value", options[x]);
  }


  maptbody.html("");

  var crimeNames = ["Felony Offenses", "Violent Offenses", "Property Offenses", "Drug Offenses", "Sex Offenses", "Other Offenses", "Misdemeanor", "Status Offenses"]

  for (x in crimeNames){
    let selector = d3.select("#crime")

    selector.append("option").text(crimeNames[x]).property("value", crimeNames[x]);
  }
    for (let i = 0; i < 8; i++){
      let row = maptbody.append("tr");
      let title = row.append("td");
      title.text(crimeNames[i])
      row.append("td").text(laMetro[2011][i])
      row.append("td").text(orange[2011][i])
      row.append("td").text(riverside[2011][i])
      row.append("td").text(SanBernadino[2011][i])
      row.append("td").text(ventura[2011][i])
      
    };

    d3.json("static/json/counties.json").then(function(data){

      console.log(data)
      L.geoJSON(data, {
        onEachFeature: function(feature, layer){
          console.log(feature.properties.crimes[0]["2011"][0])
          layer.bindPopup("<h2>" + feature.properties.name + "</h2><hr>")
        }
      }).addTo(map);
    });

    let legend = L.control({
      position: "bottomright"
    });
  
    // Then add all the details for the legend.
  //legend.onAdd = function() {
  //    let div = L.DomUtil.create("div", "info legend");
  //    const magnitudes = [0, 1000, 5000, 20000, 30000, 50000];
  //const colors = [
  //  "#98ee00",
  //  "#d4ee00",
  //  "#eecc00",
  //  "#ee9c00",
  //  "#ea822c",
  //  "#ea2c2c"
  //];
      // Looping through our intervals to generate a label with a colored square for each interval.
  //for (var i = 0; i < magnitudes.length; i++) {
  //    console.log(colors[i]);
   //   div.innerHTML +=
  //      "<i style='background: " + colors[i] + "'></i> " +
  //      magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
  // }
  //  return div;
 // };
  
  //legend.addTo(map);



  };

intial()






  