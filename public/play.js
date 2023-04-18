
import { Chess } from './dist/chess.js';

const playerNameEl = document.querySelector('.player-name');
playerNameEl.textContent = localStorage.getItem('username') ?? 'Mystery Player';

var board = null;   
var game = new Chess();
var $status = $('#status');
var $fen = $('#fen');
var $pgn = $('#pgn');

var whiteSquareGrey = '#a9a9a9';
var blackSquareGrey = '#696969';

function onDragStart (source, piece, position, orientation) {
    // do not pick up pieces if the game is over
    if (game.isGameOver()) return false;
  
    // only pick up pieces for the side to move
    if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
      return false;
    }
  }
  
function onDrop (source, target) {
// see if the move is legal
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) {
        console.log("snapback");
        return 'snapback';
    } 

    updateStatus();
}

function onMouseoverSquare (square, piece) {
    // get list of possible moves for this square
    var moves = game.moves({
      square: square,
      verbose: true
    });
  
    // exit if there are no moves available for this square
    if (moves.length === 0) return;

    // highlight the square they moused over
    greySquare(square);
  
    // highlight the possible squares for this piece
    for (var i = 0; i < moves.length; i++) {
      greySquare(moves[i].to);
    }
}

function onMouseoutSquare (square, piece) {
    removeGreySquares();
}

function greySquare (square) {
    var $square = $('#board .square-' + square);
  
    var background = whiteSquareGrey;
    if ($square.hasClass('black-3c85d')) {
      background = blackSquareGrey;
    }
  
    $square.css('background', background);
}

function removeGreySquares () {
    $('#board .square-55d63').css('background', '');
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd () {
    board.position(game.fen());
}

function updateStatus () {
    var status = '';

    var moveColor = 'White';
    if (game.turn() === 'b') {
        moveColor = 'Black';
    }

    // Is someone in checkmate?
    if (game.isCheckmate()) {
        status = 'Game over, ' + moveColor + ' is in checkmate.';
    }

    // is it a stalemate?
    else if (game.isStalemate()) {  
        status = 'Game over, drawn position';
    }

    // game continues
    else {
        status = moveColor + ' to move';

        // is someone in check?
        if (game.inCheck()) {
            status += ', ' + moveColor + ' is in check';
        }
    }

    $status.html(status);
    $fen.html(game.fen());
    $pgn.html(game.pgn());
}

var config = {
    draggable: true,
    showNotation: false,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onMouseoutSquare: onMouseoutSquare,
    onMouseoverSquare: onMouseoverSquare,
    onSnapEnd: onSnapEnd
};

var board = Chessboard('board', config);

updateStatus();

// Functionality for peer to peer communication with WebSockets
function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    var socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    socket.onopen = (event) => {
        displayMsg('system', 'game', 'connected');
    };
    socket.onclose = (event) => {
        displayMsg('system', 'game', 'disconnected');
    };    
    socket.onmessage = async(event) => {
        const text = await event.data.text();
        const chat = JSON.parse(text);
        appendMsg('friend', chat.name, chat.msg);
      };
}

function displayMsg(cls, from, msg) {
    const chatText = document.querySelector('#player-messages');
    chatText.innerHTML =
        `<div class="event"><span class="${cls}-event">${from}</span> ${msg}</div>` + chatText.innerHTML;
}

function broadcastEvent(from, type, value) {
    const event = {
        from: from,
        type: type,
        value: value,
    };
    socket.send(JSON.stringify(event));
}

configureWebSocket();

/* need to review websocket stuff

function sendMessage() {
    const msgEl = document.querySelector('#new-msg');
    const msg = msgEl.value;
    if (!!msg) {
        appendMsg('me', 'me', msg);
        const name = document.querySelector('.player-name').value;
        socket.send(`{"name":"${name}", "msg":"${msg}"}`);
        msgEl.value = '';
    }
}

// Create one long list of messages
function appendMsg(cls, from, msg) {
const chatText = document.querySelector('#chat-text');
chatText.innerHTML =
    `<div><span class="${cls}">${from}</span>: ${msg}</div>` +
    chatText.innerHTML;
}

// Send message on enter keystroke
const input = document.querySelector('#new-msg');
input.addEventListener('keydown', (e) => {
if (e.key === 'Enter') {
    sendMessage();
}
});
*/
