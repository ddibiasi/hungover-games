var chart;
var ctx;
var reloadCounter = 0;
var chartNumber = 1;


$(document).ready(function () {
    resetChart();
    Chart.defaults.global.defaultFontColor = "#fff";
    loadData();
});


function resetChart() {
    // todo remove size monitor
    $('#dash').remove();
    $('#dash-container').append('<canvas id="dash"><canvas>');
    canvas = document.querySelector('#dash');
    ctx = canvas.getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}

function loadData() {
    if (reloadCounter >= 30) {
        chartNumber++;
        if (chartNumber >= 3) {
            chartNumber = 1;
        }
        reloadCounter = 0;
        resetChart();
    }
    switch (chartNumber) {
        case 1:
            $.get("../api/points", function (data) {
                drawBarChart(ctx, data);
            });
            break;
      //  case 2:
      //      $.get("../api/points/detailed", function (data) {
      //          drawCurrentConsumption(ctx, data);
      //      });
      //      break;
        case 2:
            $.get("../api/points/timeline", function (data) {
                drawTimeline(ctx, data);
            });
            break;
        default:
            chartNumber = 1;
    }
    reloadCounter++;
    setTimeout(loadData, 10000);
}

function drawBarChart(ctx, data) {
    let teams = data.map((item) => {
        return item.Name
    });
    let points = data.map((item) => {
        return item.TotalPoints
    });

    if (chart == null || chart.config.type !== 'bar') {
        initBarChart(ctx, teams, points)
    } else {
        chart.data.datasets[0].data = points;
        chart.data.labels = teams;
        chart.update()
    }
}

function initBarChart(ctx, teams, points) {
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: teams,
            datasets: [{
                label: 'Total points per Team',
                data: points,
                backgroundColor: colors,
                borderColor: colors,
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

function drawTimeline(ctx, data) {
    var config = {
        type: 'line',
        data: {
            datasets: []
        },
        options: {
            title: {
                display: true,
                text: "Timeline"
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
                }],
            }
        }
    };
    chart = new Chart(ctx, config);
    updateTimeline(data);
}

function updateTimeline(teams) {
    for (let i = 0; i < teams.length; i++) {
        var data = [];
        for (let j = 0; j < teams[i].CumulativeSums.length; j++) {
            data.push({
                x: teams[i].CumulativeSums[j].CreatedAt,
                y: teams[i].CumulativeSums[j].cumulated_points
            })
        }
        var entry = {
            label: teams[i].name,
            data: data,
            borderColor: colors[i],
            fill: false
        };
        chart.data.datasets.push(entry)
    }
    chart.update(0)
}

function drawCurrentConsumption(ctx, teams) {
    var config = {
        type: 'line',
        data: {
            datasets: []
        },
        options: {
            title: {
                display: true,
                text: "Current consumption in points"
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
                }],
            }
        }
    };
    chart = new Chart(ctx, config);
    updateCurrentConsumption(teams);
}

function updateCurrentConsumption(teams) {
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
        chart.data.datasets.push(entry)
    }
    chart.update(0)
}