var barChart;
let ctx;
$(document).ready(function () {
    ctx = document.getElementById('dash').getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    loadData();
    // setInterval(loadData, 10000);

});


function loadData() {
    /* $.get("../api/points", function (data) {
         drawBarChart(data);
     });

     */
    $.get("../api/points/detailed", function (data) {
        initLineChart(ctx, data);
    });
}

function drawBarChart(data) {
    let teams = data.map((item) => {
        return item.Name
    });
    let points = data.map((item) => {
        return item.TotalPoints
    });
    if (barChart == null) {
        initBarChart(ctx, teams, points)
    } else {
        barChart.data.datasets[0].data = points;
        barChart.data.labels = teams;
        barChart.update()
    }
}

function initBarChart(ctx, teams, points) {
    barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: teams,
            datasets: [{
                label: 'Total points per Team',
                data: points,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function createLineDataset(teams) {
    var dataset = [];
    for (let i = 0; i < teams.length; i++) {
        var data = [];
        for (let j = 0; j < teams[i].Orders.length; j++) {
            data.push({
                x: teams[i].Orders[j].CreatedAt,
                y: teams[i].Orders[j].points
            })
        }
        var entry = {
            label: teams[i].name,
            data: data,
            borderColor: colors[i],
            fill: false
        };
        dataset.push(entry)
    }
    return dataset
}

function initLineChart(ctx, teams) {
    var dataset = createLineDataset(teams);


    var config = {
        type: 'line',
        data: {
            datasets: dataset
        },
        options: {
            title: {
                display: true,
                text: "The Hungover Games"
            },
            scales: {
                xAxes: [{
                    type: 'time',
                    distribution: 'series',
                    time: {
                        displayFormats: {
                            quarter: 'h:mm:ss'
                        }
                    },
                    ticks: {
                        source: 'auto'
                    },
                }]
            }
        }
    };
    var lineChart = new Chart(ctx, config);

}