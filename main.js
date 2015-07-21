  $(document).ready(function() {
    'use strict';

    var currentText = $('#task');
    currentText.focus();

    // //////////////////////
    // Add task by enter
    // //////////////////////

    currentText.on('keydown', function(event) {
      if (event.which == 13) {
        currentText.focus();
        adder();
      }
    });

    // //////////////////////
    // Add task by button
    // //////////////////////

    $('#btnAdd').on('click', function() {
      currentText.focus();
      adder();
    });

    // //////////////////////
    // Function to delete
    // //////////////////////

    $('ul').on('click', '.deleter', function() {
      $(this).parent().remove();
    });

    // //////////////////////
    // Function for done task
    // //////////////////////

    $('ul').on('click', '.task', function() {
      $(this).toggleClass('taskDone');
    });

    // ///////////////////////
    // Function to add
    // ///////////////////////

    function adder() {
      var textValue = currentText.val();
      var textToAdd = '<p>' + textValue + '</p>';
      var newLi = $('<li class="task"></li>');

      newLi.append(textToAdd);
      newLi.append('<button class="deleter">Borrar</button>');

      if (textToAdd !== '<p></p>') {
        $('#list').append(newLi);
      }

      $('#task').val('');
    }

    // ///////////////////////
    // Save the data in localStorage
    // ///////////////////////
  });
