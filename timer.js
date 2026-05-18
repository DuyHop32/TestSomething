const FOCUS_SEC = 25 * 60;
const BREAK_SEC = 5 * 60;
const RING = 2 * Math.PI * 54;
const POMODORO_KEY = 'testsomething-pomodoros';

const display = document.getElementById('timerDisplay');
const label = document.getElementById('timerLabel');
const ring = document.getElementById('ringProgress');
const startBtn = document.getElementById('timerStart');
const resetBtn = document.getElementById('timerReset');
const pomodoroStats = document.getElementById('pomodoroStats');

let mode = 'focus';
let secondsLeft = FOCUS_SEC;
let totalSeconds = FOCUS_SEC;
let running = false;
let tickId = null;

ring.style.strokeDasharray = RING;
ring.style.strokeDashoffset = '0';

function todayCount() {
  const data = JSON.parse(localStorage.getItem(POMODORO_KEY) || '{}');
  const day = new Date().toISOString().slice(0, 10);
  return data[day] || 0;
}

function bumpPomodoro() {
  const data = JSON.parse(localStorage.getItem(POMODORO_KEY) || '{}');
  const day = new Date().toISOString().slice(0, 10);
  data[day] = (data[day] || 0) + 1;
  localStorage.setItem(POMODORO_KEY, JSON.stringify(data));
  updatePomodoroStats();
}

function updatePomodoroStats() {
  pomodoroStats.textContent = ` · ${todayCount()} pomodoro hôm nay`;
}

function format(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function updateRing() {
  const progress = 1 - secondsLeft / totalSeconds;
  ring.style.strokeDashoffset = String(RING * progress);
}

function render() {
  display.textContent = format(secondsLeft);
  label.textContent =
    mode === 'focus' ? 'Tập trung làm việc' : 'Nghỉ ngắn — hít thở đã!';
  startBtn.textContent = running ? 'Tạm dừng' : 'Bắt đầu';
  updateRing();
}

function switchMode(next) {
  mode = next;
  totalSeconds = mode === 'focus' ? FOCUS_SEC : BREAK_SEC;
  secondsLeft = totalSeconds;
  if (mode === 'break') bumpPomodoro();
}

function onComplete() {
  if (mode === 'focus') {
    switchMode('break');
    try {
      new Audio(
        'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGWi77eefTRAMUKfj8LZjHAY4kdfyzHksBSR3x/DdkEAKFF606euoVRQKRp/g8r5sIQUrgc7y2Yk2CBlou+3nn00QDFCn4/C2YxwGOJHX8sx5LAUkd8fw3ZBAC'
      ).play();
    } catch {
      /* ignore */
    }
  } else {
    switchMode('focus');
  }
  render();
}

function tick() {
  if (secondsLeft <= 0) {
    onComplete();
    return;
  }
  secondsLeft -= 1;
  render();
}

startBtn.addEventListener('click', () => {
  running = !running;
  if (running) {
    tickId = setInterval(tick, 1000);
  } else {
    clearInterval(tickId);
    tickId = null;
  }
  render();
});

resetBtn.addEventListener('click', () => {
  running = false;
  clearInterval(tickId);
  tickId = null;
  mode = 'focus';
  totalSeconds = FOCUS_SEC;
  secondsLeft = FOCUS_SEC;
  render();
});

updatePomodoroStats();
render();
