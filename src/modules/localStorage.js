import { tasks } from "../index.js";

const addToLocalStorage = (tasks) => {
  localStorage.setItem('myTasks', JSON.stringify(tasks));
};

const getFromLocalStorage = (tasks) => {
  if (localStorage.getItem('myTasks')) {
    tasks = JSON.parse(localStorage.getItem('myTasks'));
  }
  return tasks;
};

const resetIndex = (tasks) => {
  for (let i = 0; i < tasks.length; i += 1) {
    const indx = i + 1;
    tasks[i].index = indx;
  }
};

const rmvTask = (index) => {
  const mylocal = getFromLocalStorage();
  mylocal.splice(index - 1, 1);
};

const editTask = (tasks ,desc, index) => {
  tasks[index - 1].description = desc;
  addToLocalStorage();
};

export {
  addToLocalStorage, getFromLocalStorage, resetIndex, rmvTask, editTask,
};