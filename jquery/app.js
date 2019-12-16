const todo_container = $('ul#todo-list-container');
const list_counter = $('span#list-counter');
const todo_input = $('input#todo-input');
let todo_item = [];
let matching = [];
let suggestions = [];

$(function() {
  if (localStorage.td_list_jq.length > 1) {
    todo_item = JSON.parse(localStorage.getItem('td_list_jq'));
    generate_list();
  }
});

todo_input.keyup(function(e) {
  let val = $(this).val();
  $('#input-resetter-container').prop('hidden', val.length === 0);
  if (e.which === 13) {
    todo_item.push({'content': val, 'is_done': 0});
    generate_list();
    $(this).val('');
  }
});

function generate_list() {
  todo_container.empty();
  if (todo_item.length > 0) {
    $.each(todo_item, function(index, el) {
      todo_container.append(generate_todo_item(el, index));
      todo_container.parents('#todo-body').prop('hidden', false);
    });
  }

  localStorage.setItem('td_list_jq', JSON.stringify(todo_item));
  list_counter.text('list (' + todo_item.length + ')');
}

function generate_todo_item(el, index) {
  return '<li class="list-group-item ' + (el.is_done != 1 ? '' : 'td_done') +
      '" id="todo-item-' + index + '">' +
      '  <label class="container">' + el.content +
      '         <input type="checkbox" onchange="mark_td(' + index + ')" ' +
      (el.is_done != 1 ? '' : 'checked') + '/>' +
      '        <span class="checkmark"></span>' +
      '  </label>' +
      '</li>';
}

function mark_td(index) {
  todo_item[index].is_done = todo_item[index].is_done !== true;
  localStorage.setItem('td_list_jq', JSON.stringify(todo_item));
  generate_list();
}

function reset() {
  todo_item = [];
  generate_list();
  localStorage.setItem('td_list_jq', JSON.stringify(todo_item));
  todo_container.parents('#todo-body').prop('hidden', true);
}

function input_resetter(input_id) {
  $('input#'+input_id).val('');
}

function autocomplete() {
  if (todo_input.val().length > 0) {
   matching = suggestions.filter(
        suggestion => suggestion.toLowerCase().
            indexOf(todo_input.val().toLowerCase()) > -1);
  }
  else {
    matching = [];
  }
}