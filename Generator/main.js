$(document).ready(function() {
  $('#statblock-form').submit(function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the value of the monster name input field
    var monsterName = $('#monster-name').val();

    // Make an AJAX request to the backend to generate the stat block
    $.ajax({
      url: 'Generator/generate_statblock',
      method: 'POST',
      data: JSON.stringify({'monster_name': monsterName}),
      contentType: 'application/json',
      success: function(response) {
        // Update the HTML on the page to display the generated stat block
        $('#statblock-container').html(response.stat_block);
      }
    });
  });
});
