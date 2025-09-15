let level = 1;
let playerPos = null;
let goalPos = null;
let gridSize = { rows: 4, cols: 8 };

let maxArrows = 8;
let placedArrowsCount = 0;
let running = false;
let obstacles = [];

// cronômetro acumulativo
let startTime = null;
let timerInterval = null;
let totalElapsed = 0;

const game = document.getElementById('game');
const levelSpan = document.getElementById('level');
const remainingSpan = document.getElementById('remaining');
const setStepsBtn = document.getElementById('setSteps');
const maxStepsInput = document.getElementById('maxSteps');
const playBtn = document.getElementById('play');
const resetBtn = document.getElementById('reset');
const arrowsPalette = document.querySelectorAll('.arrow-palette');
const soundToggleBtn = document.getElementById('soundToggle');
const timerDisplay = document.getElementById('timer');

// sons
const theme = document.getElementById('theme');
const stepSound = document.getElementById('step-sound');
const loseSound = document.getElementById('lose-sound');
let soundEnabled = true;
theme.volume = 0.4;

// === Funções de tempo acumulado ===
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
}

function startTimer() {
  if (timerInterval) return; // já está rodando
  startTime = Date.now() - totalElapsed;
  timerInterval = setInterval(() => {
    totalElapsed = Date.now() - startTime;
    timerDisplay.textContent = `⏱ Tempo: ${formatTime(totalElapsed)}`;
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

// === Som ===
function updateSoundButton() {
  soundToggleBtn.textContent = soundEnabled ? '🔊 Som' : '🔈 Sem som';
}
soundToggleBtn.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  if (soundEnabled) theme.play().catch(()=>{});
  else theme.pause();
  updateSoundButton();
});
updateSoundButton();

// === Grid ===
function buildGrid() {
  game.innerHTML = '';
  game.style.gridTemplateColumns = `repeat(${gridSize.cols}, var(--cell-size))`;
  game.style.gridTemplateRows = `repeat(${gridSize.rows}, var(--cell-size))`;

  obstacles = [];
  for (let r = 0; r < gridSize.rows; r++) {
    for (let c = 0; c < gridSize.cols; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = r;
      cell.dataset.col = c;

      cell.addEventListener('dragover', e => e.preventDefault());
      cell.addEventListener('drop', handleCellDrop);

      game.appendChild(cell);
    }
  }

  playerPos = { row: gridSize.rows - 1, col: 0 };
  goalPos = randomGoalPos();

  if (level >= 2) {
    generateObstacles();
  }

  placedArrowsCount = 0;
  updateRemaining();
  renderObjects();
}

function randomGoalPos() {
  let r, c;
  do {
    r = Math.floor(Math.random() * gridSize.rows);
    c = Math.floor(Math.random() * gridSize.cols);
  } while (r === playerPos.row && c === playerPos.col);
  return { row: r, col: c };
}

// Obstáculos no caminho
function generateObstacles() {
  obstacles = [];
  let path = [];
  let r = playerPos.row;
  let c = playerPos.col;

  while (r !== goalPos.row) {
    r += (goalPos.row > r) ? 1 : -1;
    path.push({ row: r, col: c });
  }
  while (c !== goalPos.col) {
    c += (goalPos.col > c) ? 1 : -1;
    path.push({ row: r, col: c });
  }

  const count = Math.max(1, Math.min(level, Math.floor(path.length / 2)));
  for (let i = 0; i < count; i++) {
    let spot;
    do {
      spot = path[Math.floor(Math.random() * path.length)];
    } while (
      (spot.row === playerPos.row && spot.col === playerPos.col) ||
      (spot.row === goalPos.row && spot.col === goalPos.col) ||
      obstacles.some(o => o.row === spot.row && o.col === spot.col)
    );
    obstacles.push(spot);
    getCell(spot.row, spot.col).classList.add('wall');
  }
}

function getCell(row, col) {
  return game.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
}

function renderObjects() {
  document.querySelectorAll('.cell').forEach(cell => {
    const p = cell.querySelector('#player');
    if (p) p.remove();
    const g = cell.querySelector('#goal');
    if (g) g.remove();
  });

  const playerCell = getCell(playerPos.row, playerPos.col);
  if (playerCell) {
    const p = document.createElement('div');
    p.id = 'player';
    playerCell.appendChild(p);
  }

  const goalCell = getCell(goalPos.row, goalPos.col);
  if (goalCell) {
    const g = document.createElement('div');
    g.id = 'goal';
    goalCell.appendChild(g);
  }
}

function handleCellDrop(e) {
  if (placedArrowsCount >= maxArrows) {
    alert("Você já usou todas as setas permitidas!");
    return;
  }

  e.preventDefault();
  const dir = e.dataTransfer.getData('dir');
  if (!dir) return;

  const cell = e.currentTarget;
  if (cell.classList.contains('wall')) return;
  if (cell.querySelector('.grid-arrow')) return;

  const arrow = document.createElement('div');
  arrow.className = 'grid-arrow';
  arrow.dataset.dir = dir;
  arrow.textContent = dir === "up" ? "⬆️" : dir === "down" ? "⬇️" : dir === "left" ? "⬅️" : "➡️";

  arrow.addEventListener('dblclick', () => {
    arrow.remove();
    placedArrowsCount--;
    updateRemaining();
  });

  cell.appendChild(arrow);
  placedArrowsCount++;
  updateRemaining();
}

function updateRemaining() {
  remainingSpan.textContent = maxArrows - placedArrowsCount;
}

arrowsPalette.forEach(arrow => {
  arrow.addEventListener('dragstart', e => {
    e.dataTransfer.setData('dir', e.target.dataset.dir);
  });
});

setStepsBtn.addEventListener('click', () => {
  const val = parseInt(maxStepsInput.value, 10);
  if (!isNaN(val) && val > 0) maxArrows = val;
  placedArrowsCount = 0;
  updateRemaining();
  buildGrid();
});

resetBtn.addEventListener('click', () => {
  stopTimer();
  totalElapsed = 0;
  timerDisplay.textContent = "⏱ Tempo: 00:00";
  buildGrid();
});

// === Jogar ===
playBtn.addEventListener('click', () => {
  if (soundEnabled) theme.play().catch(()=>{});
  if (running) return;
  running = true;
  game.classList.add('locked');

  startTimer();

  let stepsExecuted = 0;

  function step() {
    if (playerPos.row === goalPos.row && playerPos.col === goalPos.col) {
      success();
      return;
    }
    if (stepsExecuted >= maxArrows) {
      fail("Fim dos passos. Você não alcançou a porta.");
      return;
    }

    const currentCell = getCell(playerPos.row, playerPos.col);
    const arrow = currentCell ? currentCell.querySelector('.grid-arrow') : null;
    if (!arrow) {
      fail("Seu personagem encontrou uma célula sem seta e parou.");
      return;
    }

    const dir = arrow.dataset.dir;
    if (!movePlayer(dir)) {
      fail("O personagem bateu em um obstáculo ou na borda!");
      return;
    }

    stepsExecuted++;
    renderObjects();

    if (soundEnabled) {
      stepSound.currentTime = 0;
      stepSound.play().catch(()=>{});
    }

    if (playerPos.row === goalPos.row && playerPos.col === goalPos.col) {
      success();
      return;
    }
    setTimeout(step, 500);
  }

  setTimeout(step, 300);

  function success() {
    running = false;
    game.classList.remove('locked');
    alert(`Parabéns! Você passou de nível!\nTempo acumulado: ${formatTime(totalElapsed)}`);
    nextLevel();
  }

  function fail(msg) {
    running = false;
    game.classList.remove('locked');
    if (soundEnabled) {
      loseSound.currentTime = 0;
      loseSound.play().catch(()=>{});
    }
    alert(`${msg}\nTempo acumulado: ${formatTime(totalElapsed)}`);
  }
});

function movePlayer(dir) {
  let newRow = playerPos.row;
  let newCol = playerPos.col;
  if (dir === 'up') newRow--;
  else if (dir === 'down') newRow++;
  else if (dir === 'left') newCol--;
  else if (dir === 'right') newCol++;

  if (newRow < 0 || newRow >= gridSize.rows || newCol < 0 || newCol >= gridSize.cols)
    return false;

  if (obstacles.some(o => o.row === newRow && o.col === newCol)) return false;

  playerPos.row = newRow;
  playerPos.col = newCol;
  return true;
}

function nextLevel() {
  level++;
  levelSpan.textContent = level;
  gridSize.cols++;
  if (level % 2 === 0) gridSize.rows++;
  buildGrid();
}

buildGrid();
updateRemaining();