// الحصول على العناصر
const cells = document.querySelectorAll('.cell');
const resultDiv = document.querySelector('.result');
const resetGameBtn = document.getElementById('resetGame');
const resetScoresBtn = document.getElementById('resetScores');

// متغيرات اللعبة
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let player = 'X';
let computer = 'O';
let currentTurn = player;

// متغيرات العدّاد
let playerWins = 0;
let computerWins = 0;
let draws = 0;

// تحديث العدّاد
function updateScores() {
    document.getElementById('playerWins').textContent = playerWins;
    document.getElementById('computerWins').textContent = computerWins;
    document.getElementById('draws').textContent = draws;
}

// تركيبات الفوز
const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

// حركة اللاعب
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (!gameActive || board[index] !== '' || currentTurn !== player) return;
        
        // وضع علامة اللاعب
        cell.textContent = player;
        board[index] = player;
        
        // التحقق من النتيجة
        if (checkWinner(player)) {
            resultDiv.textContent = '🎉 أنت فزت! 🎉';
            gameActive = false;
            playerWins++;
            updateScores();
        } 
        else if (isDraw()) {
            resultDiv.textContent = '🤝 تعادل! 🤝';
            gameActive = false;
            draws++;
            updateScores();
        } 
        else {
            currentTurn = computer;
            setTimeout(computerMove, 500);
        }
    });
});

// حركة الكمبيوتر (معدلة عشان يعطي فرصة للمستخدم)
function computerMove() {
    if (!gameActive) return;
    
    // 70% يلعب بذكاء، 30% يلعب غلط (عشوائي)
    let move;
    if (Math.random() < 0.3) {
        // يلعب بشكل عشوائي (فرصة للمستخدم)
        move = findRandomMove();
    } else {
        // يلعب بذكاء
        move = findSmartMove();
    }
    
    if (move !== -1) {
        cells[move].textContent = computer;
        board[move] = computer;
        
        if (checkWinner(computer)) {
            resultDiv.textContent = '💻 الكمبيوتر فاز! 💻';
            gameActive = false;
            computerWins++;
            updateScores();
        } 
        else if (isDraw()) {
            resultDiv.textContent = '🤝 تعادل! 🤝';
            gameActive = false;
            draws++;
            updateScores();
        } 
        else {
            currentTurn = player;
        }
    }
}

// حركة عشوائية (الكمبيوتر يغلط)
function findRandomMove() {
    const availableMoves = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') availableMoves.push(i);
    }
    
    if (availableMoves.length > 0) {
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }
    return -1;
}

// ذكاء الكمبيوتر (مخفف شوي)
function findSmartMove() {
    // 1. هل يقدر الكمبيوتر يربح؟ (بنسبة 80% فقط)
    if (Math.random() < 0.8) {
        for (let combo of winningCombos) {
            const [a,b,c] = combo;
            if (board[a] === computer && board[b] === computer && board[c] === '') return c;
            if (board[a] === computer && board[c] === computer && board[b] === '') return b;
            if (board[b] === computer && board[c] === computer && board[a] === '') return a;
        }
    }
    
    // 2. منع اللاعب من الفوز (بنسبة 70% فقط)
    if (Math.random() < 0.7) {
        for (let combo of winningCombos) {
            const [a,b,c] = combo;
            if (board[a] === player && board[b] === player && board[c] === '') return c;
            if (board[a] === player && board[c] === player && board[b] === '') return b;
            if (board[b] === player && board[c] === player && board[a] === '') return a;
        }
    }
    
    // 3. أخذ المنتصف (بنسبة 60%)
    if (board[4] === '' && Math.random() < 0.6) return 4;
    
    // 4. أخذ زاوية (بنسبة 50%)
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(i => board[i] === '');
    if (availableCorners.length > 0 && Math.random() < 0.5) {
        return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }
    
    // 5. أي مكان فاضي
    return findRandomMove();
}

// التحقق من الفوز
function checkWinner(playerSymbol) {
    return winningCombos.some(combo => {
        const [a,b,c] = combo;
        return board[a] === playerSymbol && 
               board[b] === playerSymbol && 
               board[c] === playerSymbol;
    });
}

// التحقق من التعادل
function isDraw() {
    return board.every(cell => cell !== '');
}

// إعادة تعيين اللعبة
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentTurn = player;
    resultDiv.textContent = '';
    cells.forEach(cell => cell.textContent = '');
}

// تصفير العدّاد
function resetScores() {
    playerWins = 0;
    computerWins = 0;
    draws = 0;
    updateScores();
    resetGame();
}

// أحداث الأزرار
resetGameBtn.addEventListener('click', resetGame);
resetScoresBtn.addEventListener('click', resetScores);