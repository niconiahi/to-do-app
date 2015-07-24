$(document).ready(function() {
'use strict';

var currentText = $('#task');
var controller;
currentText.focus();

// //////////////////////
// Automatically add the previous tasks
// //////////////////////

function checkStorage() {
  if (localStorage.getItem('activeTasks') === null) {
    controller = [];
  } else {
    controller = JSON.parse(localStorage.getItem('activeTasks'));
  }

  if (controller.length > 0) {
    for (var i = 0; i < controller.length; i++) {
      var textToAdd = controller[i].text;
      var newLi = $('<li class="task"></li>');

      newLi.append(textToAdd);
      newLi.append('<button class="deleter">Borrar</button>');

      $('#list').append(newLi);

      if (controller[i].state === true) {
        $('#list').find('li').last().toggleClass('taskDone');
      }
    }

  }
}

checkStorage();
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
// Function for done task
// //////////////////////

$('ul').on('click', 'li p', function() {
  var newStorage;
  var sbln = $(this).html();

  for (var i = 0; i < controller.length; i++) {
    if ("<p>" + sbln + "</p>" == controller[i].text) {
      controller[i].state = !controller[i].state;
      newStorage = controller;
    }
  }

  $(this).parent().toggleClass('taskDone');

  var tasksData = JSON.stringify(newStorage);

  localStorage.setItem('activeTasks', tasksData);
  console.log(localStorage);
});

// //////////////////////
// Function to delete
// //////////////////////

$('ul').on('click', '.deleter', function() {
  var newStorage;
  var sbln = $(this).siblings().html();
  var comparableText = "<p>" + sbln + "</p>";
  console.log(comparableText);

  for (var i = 0; i < controller.length; i++) {
    if (comparableText == controller[i].text) {
      console.log(controller[i].text);
      controller.splice(i, 1);
      newStorage = controller;
    }
  }

  $(this).parent().remove();

  var tasksData = JSON.stringify(newStorage);

  localStorage.setItem('activeTasks', tasksData);
  console.log(localStorage);
});

// ///////////////////////
// Function to add
// ///////////////////////

function adder() {
  var currentTasks = $('ul').find('li');
  var textValue = currentText.val();
  var textToAdd = '<p>' + textValue + '</p>';
  var newLi = $('<li class="task"></li>');

  newLi.append(textToAdd);
  newLi.append('<button class="deleter">Borrar</button>');

  if (textToAdd !== '<p></p>') {
    $('#list').append(newLi);
    controller.push({
      text: textToAdd,
      state: false
    });
  }

  $('#task').val('');

  var tasksData = JSON.stringify(controller);

  localStorage.setItem('activeTasks', tasksData);
  console.log(localStorage);
}
});
