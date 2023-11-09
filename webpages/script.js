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

$(document).ready(function() {
  const employeeID = urlParams.get('employeeID');

  if (employeeID) {
    $.ajax({
      url: 'http://localhost:3000/getEmployeeName',
      method: 'GET',
      data: { employeeID: employeeID },
      success: function(response) {
        $('#employeeName').text(response.name);
      },
      error: function(xhr, status, error) {
        console.error('Error fetching employee name:', error);
      }
    });
  }
});