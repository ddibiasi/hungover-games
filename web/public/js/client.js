var teams = [];
var selTeam = "xxx";
var selPoints = 0;

$(document).ready(function () {
    loadTeams();
    initListeners()
});

function loadTeams() {
    $.get("../api/teams", function (data) {
        teams = data.reduce(function (map, obj) {
            map[obj.name] = obj.ID;
            return map;
        }, {});
        data.forEach(team =>
            $('#teams').append('<div class="card mb-4 shadow-sm team-card">\n' +
                '<div class="card-header">\n' +
                '<h1 class="card-title pricing-card-title">' + team.name + '</h1>\n' +
                '</div>\n' +
                '</div>')
        );
    });
}

function initListeners() {
    $('#teams').click(function (event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        selTeam = $(event.target).text();
        $("#selTeam").text(selTeam)
    });

    $('#points').click(function (event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        selPoints += parseInt($(event.target).text());
        $("#selPoints").text(selPoints)
    });

    $('#submit').click(function (event) {
        if(selTeam === "x" || selPoints <= 0){
            toastr["warning"]("No values set");
            return;
        }
        $.post("../api/order", JSON.stringify({"teamid": teams[selTeam], "points": selPoints}))
            .done(function () {
                toastr["success"]("Sent!");
            })
            .fail(function () {
                toastr["error"]("Could not send :(");
            });

        resetViews();

    });

    $('#clear').click(function (event) {
        resetViews();
    });
}

function resetViews() {
    selTeam = "xxx";
    $("#selTeam").text(selTeam);
    selPoints = 0;
    $("#selPoints").text(selPoints)
}