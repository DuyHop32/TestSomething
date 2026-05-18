const STORAGE_KEY = 'testsomething-tasks';
const EDITION = 'main';

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const stats = document.getElementById('stats');

function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function render() {
  const tasks = loadTasks();
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    if (task.done) li.classList.add('done');

    const check = document.createElement('input');
    check.type = 'checkbox';
    check.checked = task.done;
    check.addEventListener('change', () => {
      tasks[index].done = check.checked;
      saveTasks(tasks);
      render();
    });

    const label = document.createElement('span');
    label.textContent = task.text;

    const remove = document.createElement('button');
    remove.className = 'remove';
    remove.textContent = '×';
    remove.setAttribute('aria-label', 'Xóa');
    remove.addEventListener('click', () => {
      tasks.splice(index, 1);
      saveTasks(tasks);
      render();
    });

    li.append(check, label, remove);
    taskList.appendChild(li);
  });

  const pending = tasks.filter((t) => !t.done).length;
  stats.textContent = `${tasks.length} việc · ${pending} chưa xong`;
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;
  const tasks = loadTasks();
  tasks.push({ text, done: false });
  saveTasks(tasks);
  taskInput.value = '';
  render();
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

render();
