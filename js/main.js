$(function () {
    var currentPath = window.location.pathname;

    $('.nav-link').each(function () {
        var linkPath = new URL(this.href, window.location.href).pathname;
        if (linkPath === currentPath) {
            $(this).attr('aria-current', 'page');
        }
    });

    var $updates = $('#recent-updates');
    if (!$updates.length) {
        return;
    }

    $.ajax({
        url: 'http://localhost:5000/api/recent-updates',
        method: 'GET',
        dataType: 'json',
        timeout: 2500,
        cache: false,
        success: function (data) {
            if (!Array.isArray(data) || data.length === 0) {
                $('#recent-updates-status').text('No live updates were returned; showing saved updates.');
                return;
            }

            $updates.empty();
            $.each(data, function (index, item) {
                var title = item && item.title ? item.title : 'Untitled update';
                var url = item && item.url ? item.url : 'index.html';
                $('<li>').append(
                    $('<a>').attr('href', url).text(title)
                ).appendTo($updates);
            });
        },
        error: function (xhr, status, error) {
            $('#recent-updates-status').text('Live updates are unavailable; showing saved updates.');
            console.error('Could not load recent updates from port 5000.', status, error);
        }
    });
});
