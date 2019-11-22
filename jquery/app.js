const todo_container = $('ul#todo-list-container');
const list_counter = $('span#list-counter');
let todo_item = [];

$('input#todo-input').keypress(function(e) {
  if (e.which == 13) {
      let val = $(this).val();
      todo_item.push({"content": val, "is_done": 0});
      generate_list();
  }
});

function generate_list() {
  todo_container.empty();
  $.each(todo_item, function(index, el) {
    todo_container.append(generate_todo_item(el, index));
  });

  list_counter.text('list ('+todo_item.length+')');
  todo_container.parents('#todo-body').prop('hidden', false);
}

function generate_todo_item(el, index) {
  return  '<li class="list-group-item '+(el.is_done != 1 ?"":"td_done")+ '" id="todo-item-'+ index +'">' +
      '  <label class="container">' + el.content +
      '         <input type="checkbox" onchange="mark_td('+index+')" '+(el.is_done != 1 ?"":"checked")+ '/>' +
      '        <span class="checkmark"></span>' +
      '  </label>' +
      '</li>';
}

function mark_td(index) {
  todo_item[index].is_done = 1;
  generate_list();
}

function reset() {
  todo_item = [];
  generate_list();
  todo_container.parents('#todo-body').prop('hidden', true);
}