var barChart;
var curConsumptionLineChart;
var timelineChart;
let ctx;
var reloadCounter = 0;
var viewSwitcher = 1;
$(document).ready(function () {
    ctx = document.getElementById('dash').getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    Chart.defaults.global.defaultFontColor = "#fff";
    loadData();
    setInterval(loadData, 10000);
});


function loadData() {
    if (reloadCounter >= 100) {
        viewSwitcher++;
        if(viewSwitcher >= 4){
            viewSwitcher = 1;
        }
        reloadCounter = 0;
        curConsumptionLineChart = null;
        timelineChart = null;
        barChart = null;
    }
    switch (viewSwitcher) {
        case 1:
            $.get("../api/points", function (data) {
                drawBarChart(data);
            });
            break;
        case 2:
            $.get("../api/points/detailed", function (data) {
                drawCurrentConsumption(ctx, data);
            });
            break;
        case 3:
            $.get("../api/points/timeline", function (data) {
                drawTimeline(ctx, data);
            });
            break;
        default:
            viewSwitcher = 1;
    }
    reloadCounter++;
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
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
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
    timelineChart = new Chart(ctx, config);
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
        timelineChart.data.datasets.push(entry)
    }
    timelineChart.update(0)
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
    curConsumptionLineChart = new Chart(ctx, config);
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
        curConsumptionLineChart.data.datasets.push(entry)
    }
    curConsumptionLineChart.update(0)
}