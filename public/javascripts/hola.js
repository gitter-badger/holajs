var settings = {
    total_users:31, // 101 used to emulate error on user_id = 101
    counter:0
}

var check_status = function (i) {
    $("#start").attr("disabled", "disabled");

    $.ajax({
        url:'/user_' + i,
        context:$('#results'),
        async:true, // default is true
        dataFilter:function (msg, type) {
            // Validate status returned from the server
            debugger
            switch (msg) {
                case 'online':
                case 'offline':
                    return msg;
                default:
                    return 'unknown';
            }
        },
        timeout:3000
    })
        .success(function (msg) {
            // Handle success response [online,offline,unknown]
            $("#results ul").append(
                '<li id="u' + i + '">User ' + i +
                    ' status is: ' + msg + '</li>'
            );
            $("#u" + i).addClass(msg);
            update_totals(msg);
        })
        .fail(function (err, text) {
            // Error handler
            // debugger
            $("#results ul").append('<li id="u' + i + '">User ' + i + ' status is: [error]: ' + err.statusText + '</li>');
            $("#users_error").addClass('offline');

            // Expected 3 errors:
            // 	user 101 not found and 2 timeouts
            update_totals('error');
        });
}


var run = function () {
    // Main
    reset();

    for (i = 1; i <= settings.total_users; i++) {
        check_status(i, results);
    }

}


var reset = function () {
    // Clear old results
    $("#results ul li").remove();
    $("li span").html(0);

    settings.counter = 0;
}


var update_totals = function (msg) {
    var el = $("#users_" + msg);
    el.html(parseInt(el.html()) + 1);
    settings.counter++;

    if (settings.counter == settings.total_users) {
        $("#start").removeAttr("disabled");
    }
}

$(document).ready(function () {
    $('.edit').editable('/jeditable/save', {
        indicator:'Saving...',
        tooltip:'Click to edit...'
    });
    $('.edit_area').editable('/jeditable/save', {
        type:'textarea',
        cancel:'Cancel',
        submit:'OK',
        tooltip:'Click to edit...'
    });
});

$(document).ready(function () {

});