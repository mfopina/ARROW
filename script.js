// --- Definição dos Níveis ---

// 0: Vazio | 1: Parede | 2: Início | 3: Saída | 4: Chave | 5: Porta
const LEVELS = [
    // Level 1: Básico
    {
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
        maxArrows: 6
    },
    // Level 2: Primeiro obstáculo de Parede (3 setas)
    {
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] 
        ],
        maxArrows: 3
    },
    // Level 3: Introdução de Chave e Porta (5 setas)
    {
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 5, 1], 
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
            [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] 
        ],
        maxArrows: 5
    },
    // Level 4: Volta no Tempo (7 setas)
    {
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        maxArrows: 7
    },
    // Level 5: Chave Escondida e Risco de Colisão (4 setas)
    {
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1], 
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
            [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] 
        ],
        maxArrows: 4
    },
    // Level 6: Labirinto com chave no meio (9 setas)
    {
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1], 
            [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1], 
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        maxArrows: 9
    },
    // Level 7: Viagem Dupla (Chave e Porta separadas) (8 setas)
    {
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
            [1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        maxArrows: 8
    },
    // Level 8: Caminho Longo e Estreito (6 setas)
    {
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1], 
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        maxArrows: 6
    },
    // Level 9: Desvio Obligatório para a Chave (7 setas)
    {
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1], 
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1], 
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        maxArrows: 7
    },
    // Level 10: Grande Final - Multiplos Caminhos e Chave (10 setas)
    {
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1], 
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1], 
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        maxArrows: 10
    }
];

// --- Variáveis de Estado do Jogo ---
let currentLevelIndex = 0;

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
const h1Element = document.querySelector('h1');

let currentMap = LEVELS[currentLevelIndex].map.map(row => [...row]); // Cópia do mapa
let arrows = [];
let selectedTile = null; 

// Posição e estado do jogador
let player = {
    gridX: 0,
    gridY: 0,
    isMoving: false,
    nextMove: { x: null, y: null }, 
    moveProgress: 0, 
    moveSpeed: 0.1, 
    currentDirection: 'right', 
    hasKey: false // NOVO: Estado para a chave
};


// --- Funções de Controle de Nível ---

function loadLevel(index) {
    if (index >= LEVELS.length) {
        alert("Parabéns! Você completou todos os níveis!");
        currentLevelIndex = 0;
    }
    
    // Atualiza o índice global
    currentLevelIndex = index;
    const levelData = LEVELS[currentLevelIndex];

    // Cópia profunda do mapa para que as portas abertas sejam salvas apenas para este jogo
    currentMap = levelData.map.map(row => [...row]); 

    // Encontra a posição inicial do jogador no mapa
    let startPos = { x: 0, y: 0 };
    for (let y = 0; y < currentMap.length; y++) {
        for (let x = 0; x < currentMap[y].length; x++) {
            if (currentMap[y][x] === 2) {
                startPos = { x: x, y: y };
                break;
            }
        }
    }

    // Reinicia o estado do jogo
    player.gridX = startPos.x;
    player.gridY = startPos.y;
    player.isMoving = false;
    player.nextMove = { x: null, y: null };
    player.moveProgress = 0;
    player.currentDirection = 'right';
    player.hasKey = false;
    arrows = [];
    selectedTile = null;

    // Atualiza a interface
    h1Element.textContent = `Arrow Pathway - Level ${currentLevelIndex + 1}`;
    updateArrowCount();
}


// --- Funções Utilitárias ---

function updateArrowCount() {
    const maxArrows = LEVELS[currentLevelIndex].maxArrows;
    arrowCountElement.textContent = `${maxArrows - arrows.length} / ${maxArrows}`;
    const canPlace = arrows.length < maxArrows || findArrow(selectedTile?.x, selectedTile?.y);
    placeArrowBtn.disabled = !canPlace;
}

function findArrow(x, y) {
    return arrows.find(arrow => arrow.x === x && arrow.y === y);
}

// --- Funções de Desenho (Adicionado desenho de Chave e Porta) ---

function drawMap() {
    for (let y = 0; y < GRID_ROWS; y++) {
        for (let x = 0; x < GRID_COLS; x++) {
            const tileValue = currentMap[y][x];
            const px = x * TILE_SIZE;
            const py = y * TILE_SIZE;

            ctx.fillStyle = (x === selectedTile?.x && y === selectedTile?.y) ? '#a2f0a2' : '#e2c0ad'; 
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            ctx.strokeStyle = '#c0a08e'; 
            ctx.strokeRect(px, py, TILE_SIZE, TILE_SIZE);

            if (tileValue === 1) { // Parede
                ctx.fillStyle = '#000000';
                ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            } else if (tileValue === 3) { // Saída
                ctx.fillStyle = '#ff00ff'; 
                ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
                ctx.strokeStyle = '#000000';
                ctx.lineWidth = 3;
                ctx.strokeRect(px, py, TILE_SIZE, TILE_SIZE);
                ctx.lineWidth = 1;
            } else if (tileValue === 4) { // NOVO: Chave
                ctx.fillStyle = 'gold';
                ctx.beginPath();
                ctx.arc(px + TILE_SIZE/2, py + TILE_SIZE/2, TILE_SIZE/3, 0, 2 * Math.PI);
                ctx.fill();
                ctx.strokeStyle = '#000000';
                ctx.stroke();
            } else if (tileValue === 5) { // NOVO: Porta Fechada
                ctx.fillStyle = '#8B4513'; // Marrom
                ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
                ctx.strokeStyle = '#000000';
                ctx.strokeRect(px, py, TILE_SIZE, TILE_SIZE);
            }
        }
    }
}

// ... drawArrows e drawPlayer são mantidos

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

    ctx.fillStyle = player.hasKey ? '#f07167' : '#4cc9f0'; // Cor muda se tiver chave
    ctx.fillRect(drawX, drawY, TILE_SIZE, TILE_SIZE);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(drawX, drawY, TILE_SIZE, TILE_SIZE);
    
    // Olhos (Mantidos)
    const eyeSize = TILE_SIZE / 8;
    const eyeOffsetY = TILE_SIZE / 4;
    ctx.fillStyle = 'white';
    ctx.fillRect(drawX + TILE_SIZE/2 - eyeSize, drawY + eyeOffsetY, eyeSize * 2, eyeSize * 2);
    ctx.fillStyle = 'black';
    ctx.fillRect(drawX + TILE_SIZE/2, drawY + eyeOffsetY + eyeSize, eyeSize, eyeSize);
}


// --- Funções de Lógica de Movimento (Adicionado mecânica de Chave/Porta) ---

function calculateNextPosition(x, y) {
    const arrow = findArrow(x, y);
    
    // 1. Verifica e ATUALIZA a direção persistente se houver seta
    if (arrow) {
        player.currentDirection = arrow.direction;
    }

    let nextX = x;
    let nextY = y;
    let directionToUse = player.currentDirection;

    // 2. Aplica o movimento baseado na direção persistente
    switch (directionToUse) {
        case 'up': nextY--; break;
        case 'down': nextY++; break;
        case 'left': nextX--; break;
        case 'right': nextX++; break;
    }

    // 3. Verifica se a próxima posição é válida e lida com obstáculos
    if (nextX < 0 || nextX >= GRID_COLS || nextY < 0 || nextY >= GRID_ROWS) {
        return null; // Fora dos limites
    }
    
    const nextTileValue = currentMap[nextY][nextX];

    if (nextTileValue === 1) {
        return null; // Colisão com Parede
    }

    if (nextTileValue === 5) { // É uma Porta Fechada
        if (player.hasKey) {
            currentMap[nextY][nextX] = 0; // Abre a porta (muda para vazio)
            player.hasKey = false; // Chave usada
            return { x: nextX, y: nextY }; // Pode se mover
        } else {
            return null; // Colisão com Porta (Não tem chave)
        }
    }
    
    // 4. Lógica de Coleta (Chave)
    if (nextTileValue === 4) {
        player.hasKey = true;
        currentMap[nextY][nextX] = 0; // Remove a chave do mapa
    }

    return { x: nextX, y: nextY };
}

function movePlayer(deltaTime) {
    if (!player.isMoving) return;

    // Animação de movimento
    if (player.nextMove.x !== null) {
        player.moveProgress += player.moveSpeed; 
        
        if (player.moveProgress >= 1) {
            player.gridX = player.nextMove.x;
            player.gridY = player.nextMove.y;
            player.moveProgress = 0;
            player.nextMove = { x: null, y: null }; 
        }
    }

    // Início de novo movimento
    if (player.nextMove.x === null) {
        
        // Verifica Vitória
        if (currentMap[player.gridY][player.gridX] === 3) {
            player.isMoving = false;
            alert(`Parabéns! Nível ${currentLevelIndex + 1} completo!`);
            // Carrega o próximo nível
            loadLevel(currentLevelIndex + 1);
            return;
        }

        const nextPos = calculateNextPosition(player.gridX, player.gridY);

        if (nextPos) {
            player.nextMove = nextPos;
        } else {
            // Parada: Bateu em parede/porta (sem chave) ou saiu do mapa
            player.isMoving = false;
            alert("O caminho bloqueou! O personagem parou.");
        }
    }
}


// --- Funções de Eventos ---

canvas.addEventListener('click', (event) => {
    if (player.isMoving) return; 
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const gridX = Math.floor(mouseX / TILE_SIZE);
    const gridY = Math.floor(mouseY / TILE_SIZE);
    
    const tileValue = currentMap[gridY][gridX];
    // Permite selecionar em células vazias (0) ou onde já há seta
    if (tileValue === 0 || findArrow(gridX, gridY)) {
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
    const maxArrows = LEVELS[currentLevelIndex].maxArrows;
    
    if (existingIndex !== -1) {
        arrows[existingIndex].direction = direction;
    } 
    else if (arrows.length < maxArrows) {
        arrows.push({ x, y, direction });
    } else {
        alert(`Limite de ${maxArrows} setas atingido!`);
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
    player.currentDirection = 'right';
    player.isMoving = true;
    player.moveProgress = 0; 
});

document.getElementById('resetBtn').addEventListener('click', () => {
    // Recarrega o nível atual
    loadLevel(currentLevelIndex); 
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

// Inicia o jogo no primeiro nível
loadLevel(0); 
gameLoop(0);