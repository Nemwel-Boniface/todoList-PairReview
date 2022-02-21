import './style.css';
import setState from './modules/getstates.js';

import { addToLocalStorage, getFromLocalStorage, resetIndex, rmvTask, editTask } from './modules/localStorage.js';

export let tasks = [];
const taskWrapper = document.querySelector('.activities');
const newTask = document.querySelector('.newTask');
const addNewTask = document.querySelector('.submit');
const clearAll = document.querySelector('.clearallBtn');
const reset = document.getElementById('reset');

const clearallTasks = () => {
  tasks = [];
};

const displayTasks = () => {
  taskWrapper.innerHTML = '';
  const mylocal = getFromLocalStorage();

  mylocal.forEach((tsk) => {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    if (tsk.checked === true) {
      checkbox.setAttribute('checked', 'checked');
    }
    checkbox.addEventListener('change', (e) => {
      e.preventDefault();
      setState(tasks, e.target, tsk.index);
      addToLocalStorage();
    });

    const taskDesc = document.createElement('input');
    taskDesc.classList.add('todotask');
    taskDesc.value = tsk.description;

    const deleteTask = document.createElement('i');
    taskDesc.addEventListener('change', (e) => {
      e.preventDefault();
      editTask(e.target.value, tsk.index);
      taskDesc.blur();
    });
    deleteTask.classList.add('fas', 'fa-ellipsis-v');
    deleteTask.addEventListener('click', () => {
      rmvTask(tsk.index);
      resetIndex(mylocal);
      addToLocalStorage();
      displayTasks();
    });

    li.append(checkbox, taskDesc, deleteTask);
    taskWrapper.appendChild(li);
  });
};

const ClearcompletedTasks = () => {
  tasks = tasks.filter((item) => item.checked === false);
  resetIndex(tasks);
  addToLocalStorage();
  displayTasks();
};

clearAll.addEventListener('click', ClearcompletedTasks);

const addToTasks = () => {
  const lengt = tasks.length;
  tasks.push({
    checked: false,
    description: newTask.value,
    index: lengt + 1,
  });
  newTask.value = '';
  addToLocalStorage();
  displayTasks();
};

addNewTask.addEventListener('click', (e) => {
  e.preventDefault();
  addToTasks();
});

document.addEventListener('DOMContentLoaded', () => {
  getFromLocalStorage();
  displayTasks();
});

reset.addEventListener('click', () => {
  clearallTasks();
  addToLocalStorage();
  displayTasks();
});