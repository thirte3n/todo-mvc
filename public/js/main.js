const todoForm = document.querySelector('.todo-form');
const todoNewEntry = document.querySelector('.todo-new-entry');
const todos = document.querySelector('.todos');
const todoFooter = document.querySelector('.todo-footer');
const itemsLeft = document.querySelector('.items-left');
const clearBtn = document.querySelector('.clear-completed');

if (!localStorage.getItem('todos')) {
  localStorage.setItem('todos', JSON.stringify([]));
}
const localData = JSON.parse(localStorage.getItem('todos'));
let todoList = localData;

let editedTodoEntry = '';


function loadTodoList() {
  todoList.forEach(entry => {
    appendTodos(entry);
  });
  toggleFooter();
  displayNoOfItems();
}

function clearTodos() {
  todos.innerHTML = '';
}

function appendTodos(entry) {
  const li = document.createElement('li');
  const span = document.createElement('span');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = entry.isCompleted;
  if (entry.isCompleted) {
    span.classList.toggle('done');
  }

  const label = document.createElement('label');
  label.classList.add('todo-entry-text');
  label.appendChild(document.createTextNode(entry.todo));

  const deleteBtn = document.createElement('button');
  deleteBtn.appendChild(document.createTextNode('×'));

  span.appendChild(checkbox);
  span.appendChild(label);
  span.appendChild(deleteBtn);

  li.appendChild(span);

  todos.appendChild(li);
}

function addNewTodo(e) {
  e.preventDefault();
  if (!todoNewEntry.value.trim()) {
    todoNewEntry.value = '';
    return;
  }

  todoList.push(
    {
      todo: todoNewEntry.value,
      isCompleted: false
    }
  );
  localStorage.setItem('todos', JSON.stringify(todoList));

  clearTodos();
  loadTodoList();

  todoNewEntry.value = '';
}

function toggleDone(e) {
  if (e.target.type === 'checkbox') {
    e.target.parentElement.classList.toggle('done');
    const li = e.target.parentElement.parentElement;
    const index = Array.prototype.indexOf.call(todos.children, li);

    todoList[index].isCompleted = e.target.checked;
    displayNoOfItems();
    localStorage.setItem('todos', JSON.stringify(todoList));
  }
}

function removeTodo(e) {
  if (e.target.type === 'submit') {
    // todos.removeChild(e.target.parentElement.parentElement);
    const li = e.target.parentElement.parentElement;
    const index = Array.prototype.indexOf.call(todos.children, li);

    todoList.splice(index, 1);

    clearTodos();
    loadTodoList();
    localStorage.setItem('todos', JSON.stringify(todoList));
  }
}

function editTodo(e) {
  if (e.target.classList.contains('todo-entry-text')) {
    const li = e.target.parentElement.parentElement;
    let currentText = e.target.textContent;
    li.classList.toggle('editing');

    const newTextForm = document.createElement('input');
    newTextForm.type = 'text';
    newTextForm.value = currentText;
    newTextForm.classList.add('new-text-form');

    li.appendChild(newTextForm);
    newTextForm.focus();

    editedTodoEntry = newTextForm.value;
  }
}

function updateTodoText(e) {
  editedTodoEntry = e.target.value;
}

function commitChange(e) {
  if (e.target.classList.contains('new-text-form')) {
    const li = e.target.parentElement;
    const index = Array.prototype.indexOf.call(todos.children, li);

    if (todoList[index].todo !== editedTodoEntry) {
      todoList[index].todo = editedTodoEntry;
      clearTodos();
      loadTodoList();
      localStorage.setItem('todos', JSON.stringify(todoList));
    } else {
      li.classList.toggle('editing');
      li.removeChild(e.target);
    }
  }
}

function toggleFooter() {
  if (todoList.length > 0 && todoFooter.classList.contains('hidden')) {
    todoFooter.classList.remove('hidden');
  } else if (todoList.length === 0 && !todoFooter.classList.contains('hidden')) {
    todoFooter.classList.add('hidden');
  }
}

function displayNoOfItems() {
  const itemLeft = todoList.filter(entry => entry.isCompleted == false).length;

  if (itemLeft === 1) {
    itemsLeft.textContent = '1 item left';
  } else {
    itemsLeft.textContent = `${itemLeft} items left`;
  }

  if (todoList.length !== itemLeft) {
    clearBtn.classList.remove('faded');
  } else {
    clearBtn.classList.add('faded');
  }
}

function clearList(e) {
  if (e.target.classList.contains('clear-completed')) {
    todoList = todoList.filter(todo => todo.isCompleted === false);
    localStorage.setItem('todos', JSON.stringify(todoList));

    clearTodos();
    loadTodoList();
  }
}

function filter(e) {
  if (e.target.id === 'filter-active') {
    console.log('active');
  } else if (e.target.id === 'filter-completed') {
    console.log('completed');
  }
}

window.addEventListener('load', loadTodoList);
todoForm.addEventListener('submit', addNewTodo);
todos.addEventListener('click', toggleDone);
todos.addEventListener('click', removeTodo);
todos.addEventListener('dblclick', editTodo);
todos.addEventListener('blur', commitChange, true);
todos.addEventListener('input', updateTodoText);
todoFooter.addEventListener('click', clearList);
todoFooter.addEventListener('click', filter);

/*
TODO
  Footer css
  Filter
  Mark all as done
  Commit change on submit
*/
