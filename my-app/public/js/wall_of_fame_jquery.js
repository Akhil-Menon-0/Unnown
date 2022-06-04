$(function() {
  let $container = $('#achievers');
  $container.isotope({ filter: '*' });

  $('#filters').on('click', 'li', function() {
    $('#filters li').removeClass('active');
    $(this).addClass('active');

    var filterValue = $(this).attr('data-filter');
    $container.isotope({ filter: filterValue });
  });
});
