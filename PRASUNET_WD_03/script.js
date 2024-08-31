// script.js
const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];

function updateStatus() {
    status.textContent = `Player ${currentPlayer}'s Turn`;
    status.className = `turn-${currentPlayer.toLowerCase()}`;
}

function handleClick(event) {
    const cellIndex = event.target.dataset.index;

    if (gameBoard[cellIndex] !== '' || checkWinner()) return;

    gameBoard[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add(`clicked-${currentPlayer.toLowerCase()}`);

    if (checkWinner()) {
        status.textContent = `${currentPlayer} Wins!`;
    } else if (gameBoard.every(cell => cell !== '')) {
        status.textContent = 'It\'s a Draw!';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus();
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    updateStatus();
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('clicked-x', 'clicked-o');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);

// Initialize the status on page load
updateStatus();
