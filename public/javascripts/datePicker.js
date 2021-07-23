$(function () {
  $('#datepicker').datepicker({
    altField: '#datepicker',
    altFormat: 'yy-mm-dd',
    dateFormat: 'yy-mm-dd',
  })
})
Handlebars.registerHelper('eq', function (value1, value2) {
  return value1 === value2
})
