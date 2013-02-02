/* Sequential operations */

var check_status = function (i) {

    var btn = $('#start');
    if(i > $.settings.total_users) {
        btn.removeAttr("disabled");
        submit_results($.results);
        return;
    }

    btn.attr("disabled", "disabled");

    $.ajax({
        url:'/user_' + i,
        context:$('#results'),
        dataFilter:function (msg) {
            // Validate status returned from the server
            switch (msg) {
                case 'online':
                case 'offline':
                    return msg;
                default:
                    return 'unknown';
            }
        },
        timeout:2000
    })
        .success(function (msg) {
            // Handle success response [online,offline,unknown]
            $("#results_ul").append(
                '<li id="u' + i + '">User ' + i +
                    ' status is: ' + msg + '</li>'
            );
            $("#u" + i).addClass(msg);
            update_totals(msg);
        })
        .fail(function (err) {
            // Error handler
            // debugger
            $("#results_ul").append('<li id="u' + i + '">User ' + i + ' status is: [error]: ' + err.statusText + '</li>');
            $("#users_error").addClass('offline');

            // Expected 3 errors:
            // 	user 31 not found and 2 timeouts
            update_totals('error');
        })
        .complete(function() {
            check_status(++i);
        });
};


var run = function () {
    // Main
    reset();

    check_status(1);

};


var reset = function () {
    // Clear old results
    $("#results_ul").empty();
    $("li span").html(0);
    $('#submit_results').html('');

    $.settings = {
        total_users:31, // 31 used to emulate error on user_id = 31
        counter:0
    };

    $.results = {
        error:0,
        online:0,
        offline:0,
        unknown:0
    }
};

var update_totals = function (msg) {
    var el = $("#users_" + msg);
    el.html(parseInt(el.html()) + 1);

    $.settings.counter++;
    $.results[msg]++;
};

var submit_results = function (results) {
    $.ajax({
        url:'/users/results',
        type:'POST',
        async:false,
        timeout:3000,
        data:$.results,
        dataFilter:function (res) {
            return JSON.stringify(res);
        }
    })
        .success(function (res) {
            $("#submit_results").addClass('online').html(res);
        })
        .fail(function (err) {
            // console.log(err);
            $("#submit_results").addClass('offline').html(err.statusText);

        })

};

/* End sequential operations */