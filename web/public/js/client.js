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
            $('#teams').append('<button class=" team-card card mb-4 shadow-sm btn btn-lg btn-primary">' + team.name + '</button>')

    )
        ;
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
        if (selTeam === "x" || selPoints <= 0) {
            toastr["warning"]("No values set");
            return;
        }
        $.ajax({
            url: '../api/order',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({"teamid": teams[selTeam], "points": selPoints} ),
            processData: false,
            success: function( data, textStatus, jQxhr ){
                toastr["success"]("Sent!");
            },
            error: function( jqXhr, textStatus, errorThrown ){
                toastr["error"](textStatus);
            }
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