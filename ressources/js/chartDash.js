window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(231,233,237)'
};

Chart.defaults.global.tooltips.custom = function (tooltip) {
    // Tooltip Element
    var tooltipEl = document.getElementById('chartjs-tooltip');

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
    }

    // Set Text
    if (tooltip.body) {
        var total = 0;

        // get the value of the datapoint
        var value = this._data.datasets[tooltip.dataPoints[0].datasetIndex].data[tooltip.dataPoints[0].index].toLocaleString();

        // calculate value of all datapoints
        this._data.datasets[tooltip.dataPoints[0].datasetIndex].data.forEach(function (e) {
            total += e;
        });

        // calculate percentage and set tooltip value
        tooltipEl.innerHTML = '<h1>' + (value / total * 100).toFixed(2) + '%</h1>';
    }

    // calculate position of tooltip
    var centerX = (this._chartInstance.chartArea.left + this._chartInstance.chartArea.right) / 2;
    var centerY = ((this._chartInstance.chartArea.top + this._chartInstance.chartArea.bottom) / 2);

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = centerX + 'px';
    tooltipEl.style.top = centerY + 'px';
    tooltipEl.style.fontFamily = tooltip._fontFamily;
    tooltipEl.style.fontSize = tooltip.fontSize;
    tooltipEl.style.fontStyle = tooltip._fontStyle;
    tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
};

// const api_url = 'https://moroccostats.herokuapp.com/stats/coronavirus/countries/morocco/';

async function getData(result) {
    var lien = "";
    if(result=="All"){
        lien = 'https://corona.lmao.ninja/All';}
    else{ 
        lien = 'https://corona.lmao.ninja/countries/'.concat(result);
    }
    const api_url = lien; 
    const response = await fetch(api_url);
    const data = await response.json();
    console.log(data)
     var tConfirmed = parseInt(data.cases);
     var tDeaths = parseInt(data.deaths);
     var tRecovered = parseInt(data.recovered);
     document.getElementById("tC").textContent = tConfirmed;
     document.getElementById("tD").textContent = tDeaths;
     document.getElementById("tR").textContent = tRecovered;
     if(result=="All"){
        document.getElementById("country_name").textContent = "World";
         document.getElementById("flag").src= "ressources/image/all.png";
         document.getElementById("code_iso").textContent ="---";
         document.getElementById("lat").textContent =  "---";
         document.getElementById("long").textContent ="---";
        }
     else{
        document.getElementById("country_name").textContent = data.country;
         document.getElementById("flag").src=data.countryInfo.flag;
         document.getElementById("code_iso").textContent =data.countryInfo.iso3;
         document.getElementById("lat").textContent = data.countryInfo.lat;
         document.getElementById("long").textContent = data.countryInfo.long;
         }



    // Bar chart
    var chartline = new Chart(document.getElementById("bar-chart"), {
        type: 'bar',
        data: {
            labels: ["الحالات المؤكدة", "المتعافون", "الوفيات"],
            datasets: [
                {

                    backgroundColor: [
                    window.chartColors.red,
                    window.chartColors.green,
                    window.chartColors.orange,

                ],
                    data: [tConfirmed, tRecovered,tDeaths]
                }
            ]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: 'عدد المصابين بفيروس كرونا 2020'
            }
        }
    });
    chartline.update( );
    var config = {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [tConfirmed , tRecovered,tDeaths],
                backgroundColor: [
                    window.chartColors.red,
                    window.chartColors.green,
                    window.chartColors.orange,

                ]
            }],
            labels: ["الحالات المؤكدة", "المتعافون", "الوفيات"]
        },
        options: {
            responsive: true,
            legend: {
                display: true,
                labels: {
                    padding: 20
                },
            },
            tooltips: {
                enabled: false,
            }, title: {
                display: true,
                text: 'نسبة المصابين بفيروس كرونا 2020'
            }
        }
    };


    var ctx = document.getElementById("chart-area").getContext("2d");
    var mypie = new Chart(ctx, config);
    mypie.update( );
    

}

