
//assigns the body of the table 
var tbody = d3.select("#overview");

//initial function
function init(){
  //selects the input select ID
  var selector = d3.select("#selDataset");

  //options for this input
  let options = ["Los Angeles Metro", "Orange", "Los Angeles", "Riverside", "San Bernadino", "Ventura"];

  // iterates through options and adds them 
  for (x in options){
    selector.append("option").text(options[x]).property("value", options[x]);
  }

  //inital table 
  tbody.html("");
  //iterates through years
  for (let i = 2011; i < 2021; i++){
    // assigns rows and cells
    let row = tbody.append("tr");
    let title = row.append("td")
    //beginning of each row is the year
    title.text(i)
    //iterates through the JSON file for laMetro and adds to table 
    Object.values(laMetro[i]).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  };
};
//calls and creates plotly chart
buildChart(laMetro, "Los Angeles Metropolitan Area")

// initial function called
init();

// builds table based on county selected
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

//function called when input for table is changed
function handleClick(countyInput) {
  // Grab the input value and call the JSON function associated with it
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
  //calls function to build new table
  buildTable(CountyExtract);
  //calls function to plot new chart
  buildChart(CountyExtract, countyInput);
};

// function to create chart
function buildChart(data, name){
  // creates all of the value used in the chart
  let Felony = []
  let Violent = []
  let Property = []
  let Drug = []
  let Sex = []
  let Other = []
  let Misdemeanor = []
  let status = []

  // iterates through years
  for (let i = 2011; i < 2021; i++){
    //calls the data from the year from the JSON file
    let year = data[i]
    // iterates through data in the year and pushes value to array 
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

  //creates plot for each array 
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
  //configures plot
  var linePlot = [ FelonyPlot, ViolentPlot, PropertyPlot, DrugPlot, sexPlot, otherPlot, MisdemeanorPlot, statusPlot];
  //plot layout
  var lineLayout = {
    title : name,
    xaxis : {
      title : "Years"
    },
    yaxis : {
      title : "Number of Arrests"
    },

   };
   // chart plot
  Plotly.newPlot("line", linePlot, lineLayout)

};

// awaits change on input
d3.selectAll("input").on("change", handleClick);


