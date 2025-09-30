// --- Configurações do Jogo ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const TILE_SIZE = 40; 
const GRID_COLS = canvas.width / TILE_SIZE; 
const GRID_ROWS = canvas.height / TILE_SIZE; 

// Referências da Interface
const arrowCountElement = document.getElementById('arrowCount');
const placeArrowBtn = document.getElementById('placeArrowBtn');
const removeArrowBtn = document.getElementById('removeArrowBtn');

// --- Definição do Nível ---
const currentLevel = {
    map: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] 
    ],
    initialPlayerPos: { gridX: 1, gridY: 8 },
    maxArrows: 6 
};

// Posição e estado do jogador
let player = {
    gridX: currentLevel.initialPlayerPos.gridX,
    gridY: currentLevel.initialPlayerPos.gridY,
    isMoving: false,
    nextMove: { x: null, y: null }, 
    moveProgress: 0, 
    moveSpeed: 0.1, 
    currentDirection: 'right' // NOVO: Direção persistente
};

// Armazena as setas colocadas pelo jogador
let arrows = [];
let selectedTile = null; 

// --- Funções Utilitárias e Inicialização ---

function updateArrowCount() {
    arrowCountElement.textContent = `${currentLevel.maxArrows - arrows.length} / ${currentLevel.maxArrows}`;
    const canPlace = arrows.length < currentLevel.maxArrows || findArrow(selectedTile?.x, selectedTile?.y);
    placeArrowBtn.disabled = !canPlace;
}

function findArrow(x, y) {
    return arrows.find(arrow => arrow.x === x && arrow.y === y);
}

updateArrowCount();

// --- Funções de Desenho (Mantidas) ---

function drawMap() {
    for (let y = 0; y < GRID_ROWS; y++) {
        for (let x = 0; x < GRID_COLS; x++) {
            const tileValue = currentLevel.map[y][x];
            const px = x * TILE_SIZE;
            const py = y * TILE_SIZE;

            ctx.fillStyle = (x === selectedTile?.x && y === selectedTile?.y) ? '#a2f0a2' : '#e2c0ad'; 
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            ctx.strokeStyle = '#c0a08e'; 
            ctx.strokeRect(px, py, TILE_SIZE, TILE_SIZE);

            if (tileValue === 1) { 
                ctx.fillStyle = '#000000';
                ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            } else if (tileValue === 3) { 
                ctx.fillStyle = '#ff00ff'; 
                ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
                ctx.strokeStyle = '#000000';
                ctx.lineWidth = 3;
                ctx.strokeRect(px, py, TILE_SIZE, TILE_SIZE);
                ctx.lineWidth = 1;
            }
        }
    }
}

function drawArrows() {
    arrows.forEach(arrow => {
        const px = arrow.x * TILE_SIZE + TILE_SIZE / 2;
        const py = arrow.y * TILE_SIZE + TILE_SIZE / 2;
        
        ctx.fillStyle = 'yellow';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        
        ctx.save();
        ctx.translate(px, py); 
        
        if (arrow.direction === 'up') ctx.rotate(0); 
        else if (arrow.direction === 'right') ctx.rotate(Math.PI / 2);
        else if (arrow.direction === 'down') ctx.rotate(Math.PI);
        else if (arrow.direction === 'left') ctx.rotate(-Math.PI / 2);

        ctx.beginPath();
        ctx.moveTo(0, -TILE_SIZE / 4); 
        ctx.lineTo(-TILE_SIZE / 4, TILE_SIZE / 4);
        ctx.lineTo(TILE_SIZE / 4, TILE_SIZE / 4);
        ctx.closePath();
        
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    });
}

function drawPlayer() {
    let drawX = player.gridX * TILE_SIZE;
    let drawY = player.gridY * TILE_SIZE;

    if (player.isMoving && player.nextMove.x !== null) {
        drawX = player.gridX * TILE_SIZE + (player.nextMove.x - player.gridX) * TILE_SIZE * player.moveProgress;
        drawY = player.gridY * TILE_SIZE + (player.nextMove.y - player.gridY) * TILE_SIZE * player.moveProgress;
    }

    ctx.fillStyle = '#4cc9f0'; 
    ctx.fillRect(drawX, drawY, TILE_SIZE, TILE_SIZE);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(drawX, drawY, TILE_SIZE, TILE_SIZE);
    
    const eyeSize = TILE_SIZE / 8;
    const eyeOffsetY = TILE_SIZE / 4;
    ctx.fillStyle = 'white';
    ctx.fillRect(drawX + TILE_SIZE/2 - eyeSize, drawY + eyeOffsetY, eyeSize * 2, eyeSize * 2);
    ctx.fillStyle = 'black';
    ctx.fillRect(drawX + TILE_SIZE/2, drawY + eyeOffsetY + eyeSize, eyeSize, eyeSize);
}

// --- Funções de Lógica de Movimento Contínuo (ALTERADA) ---

/**
 * Calcula a próxima posição. 
 * Se houver uma seta na posição atual (x, y), a direção do jogador é atualizada.
 * O movimento é baseado na direção ATUAL do jogador (persistente).
 */
function calculateNextPosition(x, y) {
    const arrow = findArrow(x, y);
    
    // 1. Verifica se há seta e atualiza a direção persistente
    if (arrow) {
        player.currentDirection = arrow.direction;
    }

    let nextX = x;
    let nextY = y;
    let directionToUse = player.currentDirection; // Usa a direção persistente

    // 2. Aplica o movimento baseado na direção persistente
    switch (directionToUse) {
        case 'up': nextY--; break;
        case 'down': nextY++; break;
        case 'left': nextX--; break;
        case 'right': nextX++; break;
    }

    // 3. Verifica se a próxima posição é válida (limite do mapa ou parede)
    if (nextX < 0 || nextX >= GRID_COLS || nextY < 0 || nextY >= GRID_ROWS || currentLevel.map[nextY][nextX] === 1) {
        return null; // Movimento Inválido/Bloqueado
    }

    return { x: nextX, y: nextY };
}

/** Gerencia o movimento contínuo por animação (Mantida) */
function movePlayer(deltaTime) {
    if (!player.isMoving) return;

    // 1. Animar o Movimento
    if (player.nextMove.x !== null) {
        player.moveProgress += player.moveSpeed; 
        
        // 2. Mover para a próxima célula
        if (player.moveProgress >= 1) {
            player.gridX = player.nextMove.x;
            player.gridY = player.nextMove.y;
            player.moveProgress = 0;
            player.nextMove = { x: null, y: null }; 
        }
    }

    // 3. Iniciar um novo movimento
    if (player.nextMove.x === null) {
        
        // Verificar Condição de Vitória
        if (currentLevel.map[player.gridY][player.gridX] === 3) {
            player.isMoving = false;
            alert("Parabéns! Você completou o Level 1!");
            return;
        }

        // Tenta calcular a próxima posição (aqui a nova lógica é aplicada)
        const nextPos = calculateNextPosition(player.gridX, player.gridY);

        if (nextPos) {
            player.nextMove = nextPos;
        } else {
            // Se o movimento bloqueou
            player.isMoving = false;
            alert("O caminho bloqueou! O personagem parou.");
        }
    }
}

// --- Funções de Controle e Eventos ---

canvas.addEventListener('click', (event) => {
    if (player.isMoving) return; 

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const gridX = Math.floor(mouseX / TILE_SIZE);
    const gridY = Math.floor(mouseY / TILE_SIZE);
    
    if (currentLevel.map[gridY][gridX] === 0 || findArrow(gridX, gridY)) {
        selectedTile = { x: gridX, y: gridY };
    } else {
        selectedTile = null;
    }
    
    updateArrowCount(); 
});

placeArrowBtn.addEventListener('click', () => {
    if (!selectedTile || player.isMoving) return;

    const direction = document.getElementById('arrowDirection').value;
    const { x, y } = selectedTile;

    const existingIndex = arrows.findIndex(arrow => arrow.x === x && arrow.y === y);
    
    if (existingIndex !== -1) {
        arrows[existingIndex].direction = direction;
    } 
    else if (arrows.length < currentLevel.maxArrows) {
        arrows.push({ x, y, direction });
    } else {
        alert(`Limite de ${currentLevel.maxArrows} setas atingido!`);
    }

    selectedTile = null;
    updateArrowCount();
});

removeArrowBtn.addEventListener('click', () => {
    if (!selectedTile || player.isMoving) return;

    const { x, y } = selectedTile;

    const existingIndex = arrows.findIndex(arrow => arrow.x === x && arrow.y === y);
    if (existingIndex !== -1) {
        arrows.splice(existingIndex, 1);
    }

    selectedTile = null;
    updateArrowCount();
});


document.getElementById('startBtn').addEventListener('click', () => {
    if (player.isMoving) return;
    
    // Define a direção inicial como padrão (direita) antes de começar
    player.currentDirection = 'right';
    player.isMoving = true;
    player.moveProgress = 0; 
});

document.getElementById('resetBtn').addEventListener('click', () => {
    player.isMoving = false;
    player.gridX = currentLevel.initialPlayerPos.gridX;
    player.gridY = currentLevel.initialPlayerPos.gridY;
    player.nextMove = { x: null, y: null };
    player.moveProgress = 0;
    player.currentDirection = 'right'; // Resetar a direção persistente
    arrows = []; 
    selectedTile = null;
    updateArrowCount(); 
});


// --- Loop Principal do Jogo ---
let lastTime = 0;
function gameLoop(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    
    drawMap();
    drawArrows();
    drawPlayer();
    
    movePlayer(deltaTime);

    requestAnimationFrame(gameLoop); 
}

gameLoop(0);