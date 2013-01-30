/* Sequential operations */

var check_status = function (i) {
    $("#start").attr("disabled", "disabled");

    $.ajax({
        url:'/user_' + i,
        context:$('#results'),
        async:true, // default is true
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
            // 	user 101 not found and 2 timeouts
            update_totals('error');
        });
};


var run = function () {
    // Main
    reset();

    for (i = 1; i <= $.settings.total_users; i++) {
        check_status(i, results);
    }

};


var reset = function () {
    // Clear old results
    $("#results_ul").empty();
    $("li span").html(0);

    $.settings = {
        total_users:31, // 31 used to emulate error on user_id = 101
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

    if($.settings.counter == $.settings.total_users) {
        $("#start").removeAttr("disabled");
        submit_results($.results);
    }
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


/* Jeditable */
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
