// Tabs Transitioner
$(document).ready(function() {
  $('#activeOrdersContainer, #orderHistoryContainer, #inventoryContainer').hide();

  function switchContent(newContainer) {
    $('.content-container').fadeOut(500, function() {
      $(newContainer).fadeIn(500);
    });
  }

  $('nav ul li a').on('click', function(e) {
    e.preventDefault();

    var targetContainer = $(this).attr('href') + 'Container';

    if (!$(targetContainer).is(':visible')) {
      switchContent(targetContainer);
    }
  });

  $('#logout').on('click', function() {
    location.reload();
  });
});

// Name Shower
$(document).ready(function() {
  var employeeID = 'the_employee_id';

  $.ajax({
    url: 'http://3.130.252.18:3000/getEmployeeName',
    type: 'GET',
    data: { employeeID: employeeID },
    success: function(response) {
      $('#employeeName').text(response.name);
    },
    //shows in console
    error: function(xhr, status, error) {
      console.error("Error fetching employee name", error);
    }
  });
});