
// https://api.covidactnow.org/v2/counties.json?apiKey=

// console.log(covidData)

// function covidInfo(){
//    let input = d3.select("#city").property("value")
//    console.log(input)
//}

// d3.selectAll("#city").on("change", covidInfo);

var tbody = d3.select("#overview");

function init(){
  var selector = d3.select("#selDataset");

  let options = ["Los Angeles Metro", "Orange", "Los Angeles", "Riverside", "San Bernadino", "Ventura"];

  for (x in options){
    selector.append("option").text(options[x]).property("value", options[x]);
  }

  tbody.html("");
  for (let i = 2011; i < 2021; i++){
    let row = tbody.append("tr");
    let title = row.append("td")
    title.text(i)
    Object.values(laMetro[i]).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  };
};

buildChart(laMetro, "Los Angeles Metropolitan Area")



init();




function buildTable(data){
  tbody.html("");
  for (let i = 2011; i < 2021; i++){
    let row = tbody.append("tr");
    let title = row.append("td")
    title.text(i)
    Object.values(data[i]).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  };
};

function handleClick(countyInput) {
  // Grab the datetime value from the filter
  console.log(countyInput);
  let CountyExtract = ""

  if (countyInput === "Los Angeles Metro"){
    CountyExtract = laMetro
  }

  if (countyInput === "Orange"){
    CountyExtract = orange
  }

  if (countyInput === "Los Angeles"){
    CountyExtract = laCounty
  }

  if (countyInput === "Riverside"){
    CountyExtract = riverside
  }

  if (countyInput === "San Bernadino"){
    CountyExtract = SanBernadino
  }

  if (countyInput === "Ventura"){
    CountyExtract = ventura
  }

  

  
   // Rebuild the table using the filtered data
  // @NOTE: If no date was entered, then filteredData will
  // just be the original tableData.
  buildTable(CountyExtract);
  buildChart(CountyExtract, countyInput);
};

function buildChart(data, name){
  let Felony = []
  let Violent = []
  let Property = []
  let Drug = []
  let Sex = []
  let Other = []
  let Misdemeanor = []
  let status = []

  for (let i = 2011; i < 2021; i++){
    let year = data[i]
    for(let b = 0; b < 8; b++){
      if (b == 0){
        Felony.push((year[b]))
      }

      if (b == 1){
        Violent.push((year[b]))
      }

      if (b == 2){
        Property.push((year[b]))
      }

      if (b == 3){
        Drug.push((year[b]))
      }

      if (b == 4){
        Sex.push((year[b]))
      }

      if (b == 5){
        Other.push((year[b]))
      }

      if (b == 6){
        Misdemeanor.push((year[b]))
      }

      if (b == 7){
        status.push((year[b]))
      }
    };
  };

  var FelonyPlot = {
    x : [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
    y : Felony,
    name : "Felony"
  };

  var ViolentPlot = {
    x : [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
    y : Violent,
    name : "Violent Crimes"
  };

  var PropertyPlot = {
    x : [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
    y : Property,
    name : "Property Crimes"
  };

  var DrugPlot = {
    x : [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
    y : Drug,
    name : "Drug Crimes"
  };

  var sexPlot = {
    x : [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
    y : Sex,
    name : "Sex Crimes"
  };

  var otherPlot = {
    x : [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
    y : Other,
    name : "Other crimes"
  };

  var MisdemeanorPlot = {
    x : [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
    y : Misdemeanor,
    name : "Misdemeanors"
  };

  var statusPlot = {
    x : [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
    y : status,
    name : "Status Offenses"
  };

  console.log(FelonyPlot)

  var linePlot = [ FelonyPlot, ViolentPlot, PropertyPlot, DrugPlot, sexPlot, otherPlot, MisdemeanorPlot, statusPlot];

  var lineLayout = {
    title : name,
    xaxis : {
      title : "Years"
    },
    yaxis : {
      title : "Number of Arrests"
    },

   };

  Plotly.newPlot("line", linePlot, lineLayout)

};

d3.selectAll("input").on("change", handleClick);

buildTable(laMetro)


