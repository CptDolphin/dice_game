/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, dice0, dice1, gamePlaying, winningScore;

const [current0, current1] = document.querySelectorAll('#current-0, #current-1');
const [score0, score1] = document.querySelectorAll('#score-0, #score-1');
const [player0, player1] = document.querySelectorAll('.player-0-panel, .player-1-panel');
const dice0DOM = document.getElementById('dice-0');
const dice1DOM = document.getElementById('dice-1');

init();

dice = Math.floor(Math.random() * 6) + 1;

document.querySelector('#current-' + activePlayer).textContent = roundScore;

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        dice0 = Math.floor(Math.random() * 6) + 1;
        dice1 = Math.floor(Math.random() * 6) + 1;

        dice0DOM.style.display = 'block';
        dice1DOM.style.display = 'block';

        dice0DOM.src = '../../assets/dice-' + dice0 + '.png';
        dice1DOM.src = '../../assets/dice-' + dice1 + '.png';
        
        rolls.push(dice0);
        rolls.push(dice1);
        
        console.log("rolls:", rolls)
        
        while (rolls.length >= 2) {
            rolls.shift();
        } 

        if (dice0 !== 1 && dice1 !== 1) {
            roundScore += dice0 + dice1;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;

        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        let input = document.querySelector('.final-score').value;
        console.log("Input: ", input);

        if (input) {
            winningScore = input;
        } else {
            winningScore = 50;
        }

        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            hideDice();
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer()
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    activePlayer = activePlayer === 0 ? 1 : 0;
    roundScore = 0;

    current0.textContent = '0';
    current1.textContent = '0';

    player0.classList.toggle('active');
    player1.classList.toggle('active');

    hideDice();
}

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    rolls = []

    hideDice();

    score0.textContent = '0';
    score1.textContent = '0';
    current0.textContent = '0';
    current1.textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';


    player0.classList.remove('winner');
    player1.classList.remove('winner');

    player0.classList.remove('active');
    player0.classList.add('active');
    player1.classList.remove('active');
}

function hideDice() {
    dice0DOM.style.display = 'none';
    dice1DOM.style.display = 'none';
}
