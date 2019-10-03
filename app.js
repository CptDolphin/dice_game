/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, dice;

const [current0, current1] = document.querySelectorAll('#current-0, #current-1');

init()

//const current0 = document.querySelector("#current-0");
//const current1 = document.querySelector("#current-1");

//const [player_panel_0, player_panel_1] =
//  document.querySelectorAll('.player-0-panel, .player-1-panel');

dice = Math.floor(Math.random() * 6) + 1;

console.log(dice);

document.querySelector('#current-' + activePlayer).textContent = roundScore;

// On click buttons roll/hold/new
document.querySelector('.btn-roll').addEventListener('click', function() {
    // 1. Random number


    console.time();
    var a = 3;
    console.timeEnd();
    dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    // 3. Update the round score if the roled numbe was NOT 1
    if (dice !== 1) {
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      nextPlayer();
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {

    scores[activePlayer] += roundScore;

    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

    if (scores[activePlayer] >= 50) {
      B('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    } else {
      nextPlayer()
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';

    activaPlayer = activePlayer === 0 ? 1 : 0;
    roundScore = 0

    //const current = document.getElementById('current-0');

    //current.innerHTML = '<p>ala ma kota</p>';

    //    current.appendChild(document.createElement('script')).textContent
    // = '<script href="https://www.google.com/evilscript.js">ala ma kota</script>';

    current0.textContent = '0';
    current1.textContent = '0';
}

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;

    document.querySelector('.dice').style.display = 'none'

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    current0.textContent = '0';
    current1.textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';

    const player0 = document.querySelector('.player-0-panel');
    const player1 = document.querySelector('.player-1-panel');

    player0.classList.remove('winner');
    player1.classList.remove('winner');

    player0.classList.remove('active');
    player0.classList.add('active');
    player1.classList.remove('active');
}
