const gameBoard = document.getElementById('game-board');
const restartButton = document.getElementById('restart-button');
const icons = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🥝', '🍑'];
let cardArray = [...icons, ...icons]; // Dubblera ikonerna för par
let flippedCards = [];
let matchedCards = 0;

// Blanda korten
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

// Skapa korten på spelbrädet
function createBoard() {
    gameBoard.innerHTML = ''; // Rensa brädet
    shuffle(cardArray);
    cardArray.forEach(icon => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.icon = icon;
        card.innerHTML = '?'; // Baksidan av kortet
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Vänd kortet
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.innerHTML = this.dataset.icon; // Visa ikonen på kortet
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

// Kontrollera om två kort matchar
function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.icon === card2.dataset.icon) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards += 2;
        if (matchedCards === cardArray.length) {
            setTimeout(() => alert('Grattis! Du har matchat alla kort!'), 500);
        }
        flippedCards = [];
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.innerHTML = '?';
            card2.innerHTML = '?';
            flippedCards = [];
        }, 1000);
    }
}

// Starta spelet
restartButton.addEventListener('click', () => {
    matchedCards = 0;
    flippedCards = [];
    createBoard();
});

// Ladda spelet första gången
createBoard();
