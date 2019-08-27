const todoForm = document.querySelector('.todo-form');
const todoNewEntry = document.querySelector('.todo-new-entry');
const todos = document.querySelector('.todos');
let editedTodoEntry = '';

let todoEntries = [
  {
    todo: 'Todo no. 1',
    isCompleted: false
  },
  {
    todo: 'Todo no. 2',
    isCompleted: false
  },
  {
    todo: 'Todo no. 3',
    isCompleted: false
  }
];

function loadTodoList() {
  todoEntries.forEach(entry => {
    appendList(entry);
  });
  console.log(todoEntries);
}

function clearTodoList() {
  todos.innerHTML = '';
}

function appendList(entry) {
  const li = document.createElement('li');
  const span = document.createElement('span');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = entry.isCompleted;

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

  todoEntries.push(
    {
      todo: todoNewEntry.value,
      isCompleted: false
    }
  );

  clearTodoList();
  loadTodoList();

  todoNewEntry.value = '';
}

function toggleDone(e) {
  if (e.target.type === 'checkbox') {
    // e.target.parentElement.classList.toggle('done');
    const li = e.target.parentElement.parentElement;
    const index = Array.prototype.indexOf.call(todos.children, li);

    todoEntries[index].isCompleted = e.target.checked;
  }
}

function removeTodo(e) {
  if (e.target.type === 'submit') {
    // todos.removeChild(e.target.parentElement.parentElement);
    const li = e.target.parentElement.parentElement;
    const index = Array.prototype.indexOf.call(todos.children, li);

    todoEntries.splice(index, 1);

    clearTodoList();
    loadTodoList();
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

    todoEntries[index].todo = editedTodoEntry;
    clearTodoList();
    loadTodoList();
  }
}

function filter() {

}

window.addEventListener('load', loadTodoList);
todoForm.addEventListener('submit', addNewTodo);
todos.addEventListener('click', toggleDone);
todos.addEventListener('click', removeTodo);
todos.addEventListener('dblclick', editTodo);
todos.addEventListener('blur', commitChange, true);
todos.addEventListener('input', updateTodoText);