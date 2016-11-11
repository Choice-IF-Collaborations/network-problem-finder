$(function() {
  const TEST_COMPLETE_STRING = "Test complete";

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

  let randomProblem = 1;

  $('body').on('click', '.device', function(e) {
    e.preventDefault();

    let device = devices[$(this).attr('id').replace("device_", "")];

    // Populate interface
    $('#device_info h1').text(device.name);
    $('#device_info #device_symbol').attr('src', '/public/images/' + device.symbol);
    $('#device_info #device_hardware_name').text(device.hardware_name);
    $('#device_info #device_hardware_model').text(device.hardware_model);
    $('#test_device_name').text(device.name);

    //randomProblem = getRandomInt(0, 2);

    // Move device info into view
    $('#device_info').css({
      'top': $(window).height(),
      'display': 'block'
    }).animate({
      'top': 0
    }, 250, function() {
      startTestingInternetConnection();
    });

    // Scroll back to top
    $('#device_info .content').scrollTop(0);
  });

  function startTestingInternetConnection() {
    setTimeout(function() {
      $('#test_internet_connection .status_icon').removeClass('pending').addClass('working');

      $('#test_internet_connection p.test').fadeIn(250, function() {
        $('#test_internet_connection p.test').delay(1750).fadeOut(250);

        if (randomProblem == 0) {
          internetConnectionResult("bad");
        } else {
          internetConnectionResult("good");
        }
      });
    }, 250);
  }

  function internetConnectionResult(status) {
    if (status === "good") {
      $('#test_internet_connection p.result.good').delay(2000).fadeIn(250, function() {
        $('#test_internet_connection .status_icon').removeClass('working').addClass('good');
        startTestingRouter();
      });
    } else if (status === "bad") {
      $('#test_internet_connection p.result.bad, #test_internet_connection .advice, #test_internet_connection .advice p').delay(2000).fadeIn(250, function() {
        $('#device_info #device_status').text(TEST_COMPLETE_STRING);
        $('#test_internet_connection .status_icon').removeClass('working').addClass('bad');
      });
    }
  }

  function startTestingRouter() {
    setTimeout(function() {
      $('#test_router .status_icon').removeClass('pending').addClass('working');

      $('#test_router p.test').fadeIn(250, function() {
        $('#test_router p.test').delay(1750).fadeOut(250);

        if (randomProblem == 1) {
          routerResult("bad");
        } else {
          routerResult("good");
        }
      });
    }, 250);
  }

  function routerResult(status) {
    if (status === "good") {
      $('#test_router p.result.good').delay(2000).fadeIn(250, function() {
        $('#test_router .status_icon').removeClass('working').addClass('good');
        startTestingDevice();
      });
    } else if (status === "bad") {
      $('#test_router p.result.bad, #test_router .advice, #test_router .advice p').delay(2000).fadeIn(250, function() {
        $('#device_info #device_status').text(TEST_COMPLETE_STRING);
        $('#test_router .status_icon').removeClass('working').addClass('bad');
      });
    }
  }

  function startTestingDevice() {
    setTimeout(function() {
      $('#test_deviice .status_icon').removeClass('pending').addClass('working');

      $('#test_device p.test').fadeIn(250, function() {
        $('#test_device p.test').delay(1750).fadeOut(250);

        if (randomProblem == 2) {
          deviceResult("bad");
        } else {
          deviceResult("good");
        }
      });
    }, 250);
  }

  function deviceResult(status) {
    if (status === "good") {

    } else if (status === "bad") {
      $('#test_device p.result.bad, #test_device .advice, #test_device .advice p').delay(2000).fadeIn(250, function() {
        $('#device_info #device_status').text(TEST_COMPLETE_STRING);
        $('#test_device .status_icon').removeClass('working').addClass('bad');
      });
    }
  }

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

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
});
