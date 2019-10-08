/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores = [0, 0];
let score_current_accumulated = 0;
let score_to_win = 50;
let activePlayer = 0;
let gamePlaying = true;
let rolls = [0, 0];

const players = [...document.body.querySelectorAll('.player')].map(Player);

function Player(root) {
	// to bylo nazwane 'score'
	// to bylo nazwane 'dice'
	const [name, total, current] = root.querySelectorAll('.name, .score');

	const $total = 0;
	const $current = 0;

	return {
		dom: {
			root,
			name,
		},
		set is_active(bool) {
			root.classList.toggle('active', bool);
		},

		get total() {
			return $total;
		},
		set total(value) {
			total.textContent = value;
        },
		get current() {
			return $current;
		},
		set current(value) {
			current.textContent = value;
		},
	};
}

const images = document.querySelectorAll('img');
const [button_new, button_roll, button_hold] =
	document.querySelectorAll('button');

state_reset();
function state_reset() {
	scores = [0, 0];
	activePlayer = 0;
	score_current_accumulated = 0;
	gamePlaying = true;
	rolls = [0, 0];

	dice_hide();

	for (const player of players) {
		player.total = 0;
		player.current = 0;
		player.dom.root.classList.remove('winner');
	}

	players[0].dom.name.textContent = 'Player1';
	players[1].dom.name.textContent = 'Player2';
	players[0].dom.root.classList.add('active');
	players[1].dom.root.classList.remove('active');
}

button_roll.addEventListener('click', function state_try() {
	if (gamePlaying) {
		const dice = [
			Math.random() * 6 + 1 | 0,
			Math.random() * 6 + 1 | 0,
		];

		images[0].style.display = 'block';
		images[1].style.display = 'block';

		images[0].src = `../../assets/dice-${dice[0]}.png`;
		images[1].src = `../../assets/dice-${dice[1]}.png`;

		rolls = dice;

		console.log("rolls:", rolls)

		if (dice[0] !== 1 && dice[1] !== 1) {
		// if (!dice.every(val => val == 1)) {
			score_current_accumulated += dice[0] + dice[1];
			players[activePlayer].current = score_current_accumulated;
		} else {
			nextPlayer();
		}
	}
});

const score_final = document.querySelector('input');

button_hold.addEventListener('click', function state_save() {
	if (gamePlaying) {
		scores[activePlayer] += score_current_accumulated;
		players[activePlayer].total = scores[activePlayer];

		const input = score_final.value;
		console.log("Input: ", input);

		score_to_win = input || 50;

		if (scores[activePlayer] >= score_to_win) {
			players[activePlayer].dom.name.textContent = 'Winner!';
			dice_hide();

			const player = players[activePlayer];
			player.dom.root.classList.add('winner');
			player.dom.root.classList.remove('active');
			gamePlaying = false;
		} else {
			nextPlayer();
		}
	}
});

button_new.addEventListener('click', state_reset);

function nextPlayer() {
	activePlayer = +!activePlayer;
	score_current_accumulated = 0;

	for (const player of players) {
		player.current = 0;
		console.log('player:', player);
		player.dom.root.classList.toggle('active');
	}

	dice_hide();
}

function dice_hide() {
	images[0].style.display = 'none';
	images[1].style.display = 'none';
}
