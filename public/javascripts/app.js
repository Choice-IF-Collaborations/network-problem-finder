$(function() {
  let devices = (function () {
    let json = null;

    $.ajax({
      'async': false,
      'global': false,
      'url': '/public/devices.json',
      'dataType': "json",
      'success': function (data) {
        $.each(data, function(index, data) {
          // Put a placeholder for undefined symbols
          if (!data.symbol) {
            data.symbol = "placeholder.svg";
          }

          $('#devices').append('<div id="device_' + index + '" class="device"><a href="#"><div class="symbol"></div><div class="label"><p>' + data.name + '</p></div></a></div>');

          $('#device_' + index + ' .symbol').css({
            'display': 'flex',
            'justify-content': 'center',
            'align-items': 'center',
            'background-image': "url('/public/images/" + data.symbol + "')"
          });

          if (data.notifications) {
            data.notifications.reverse();
            $('#device_' + index).css({
                'background-image': "url('/public/images/problem-background.svg')"
            });

            $('#device_' + index + ' .label p').append('<span class="bubble">!</span>');
            $('#device_' + index).addClass('active');
          }
        });

        json = data;
      }
    });

    return json;
  })();

  $('body').on('click', '#add_device', function(e) {
    e.preventDefault();

    $('#add_device_overlay').css({
      'top': $(window).height(),
      'display': 'block'
    }).animate({
      'top': 0
    }, 250);
  });

  $('body').on('click', '.device', function(e) {
    e.preventDefault();

    let device = devices[$(this).attr('id').replace("device_", "")];

    if (device.notifications) {
      // Change title
      $('#device_info h1').text(device.name);

      // Change device symbol
      $('#device_info #device_symbol').attr('src', '/public/images/' + device.symbol);

      // Change make and model info
      $('#device_info #device_hardware_name').text(device.hardware_name);
      $('#device_info #device_hardware_model').text(device.hardware_model);

      // Add feed items
      $('#device_info .feed').empty();

      $.each(device.notifications, function(index, item) {
        $('#device_info .feed').append('<div id="feed-' + index + '" class="feed_item"><p>' + item.body + '</p></div>');

        $('#feed-' + index).append('<p class="timestamp">' + item.timestamp + '</p>');
      });

      $('#device_info').css({
        'top': $(window).height(),
        'display': 'block'
      }).animate({
        'top': 0
      }, 250);

      // Scroll back to top
      $('#device_info .content').scrollTop(0);
    }
  });

  $('body').on('click', '.close_overlay', function(e) {
    e.preventDefault();

    let overlay = $(this).parent().parent();

    $(overlay).animate({
      'top': $(window).height()
    }, 250, function() {
      $(overlay).css({
        'display': 'none'
      });
    });
  });
});
