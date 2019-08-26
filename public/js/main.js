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

function addNewTodo(e) {
  e.preventDefault();
  if (!todoNewEntry.value.trim()) {
    todoNewEntry.value = '';
    return;
  }

  const li = document.createElement('li');
  const span = formatChild();

  li.appendChild(span);

  todos.appendChild(li);
  todoNewEntry.value = '';
}

function formatChild() {
  const span = document.createElement('span');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  const label = document.createElement('label');
  label.classList.add('todo-entry-text')
  label.appendChild(document.createTextNode(todoNewEntry.value));

  const deleteBtn = document.createElement('button');
  deleteBtn.appendChild(document.createTextNode('×'));

  span.appendChild(checkbox);
  span.appendChild(label);
  span.appendChild(deleteBtn);

  return span;
}

function toggleDone(e) {
  if (e.target.type === 'checkbox') {
    e.target.parentElement.classList.toggle('done');
  }
}

function removeTodo(e) {
  if (e.target.type === 'submit') {
    todos.removeChild(e.target.parentElement.parentElement);
  }
}

function editTodo(e) {
  if (e.target.classList.contains('todo-entry-text')) {
  // console.log(e.target)
  // if (false) {
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

    li.classList.toggle('editing');
    li.removeChild(e.target);
    li.querySelector('.todo-entry-text').textContent = editedTodoEntry;
  }
}

function filter() {

}

todoForm.addEventListener('submit', addNewTodo);
todos.addEventListener('click', toggleDone);
todos.addEventListener('click', removeTodo);
todos.addEventListener('dblclick', editTodo);
todos.addEventListener('blur', commitChange, true);
todos.addEventListener('input', updateTodoText);