
const playerNameEl = document.querySelector('.player-name');
playerNameEl.textContent = localStorage.getItem('userName') ?? 'Mystery Player';

var config = {
    draggable: true,
    showNotation: false,
    position: 'start'
}

var board = Chessboard('board', config);

updateStatus();
