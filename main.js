const winningComb = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 4, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 4, 6],
	[2, 5, 8],
];

/* Returns the Array of the Query List */
const grid = () => Array.from(document.getElementsByClassName('quadrant'));

/* Convert ID string to number */
const quadNumberId = (quadEl) =>
	Number.parseInt(quadEl.id.replace('cell-', ''));

/* Helper Function */
/* Find the quadrant that has an empty string and build and array*/
const emptyQuads = () => grid().filter((el) => el.innerText === '');
/* Indicates all of the items are the same strings */
const all = (arr) =>
	arr.every((el) => el.innerText === arr[0].innerText && el.innerText !== '');

/* Taking turn */
const takeTurn = (index, letter) => (grid()[index].innerText = letter);

const gameOver = (winningSeq) => {
	winningSeq.forEach((elem) => elem.classList.add('winner'));
	disableListener();
};

const checkWinner = () => {
	let victory = false;
	/* Loop through winning combos if same or not */
	winningComb.forEach((y) => {
		const nGrid = grid();
		/* To access the 6th, 7th, 8th element of the grid (bottom) */
		const seq = [nGrid[y[0]], nGrid[y[1]], nGrid[y[2]]];
		if (all(seq)) {
			victory = true;
			gameOver(seq);
		}
	});
	return victory;
};

/* Opponent Turn */
/*  */
const opponentChoice = () =>
	quadNumberId(emptyQuads()[Math.floor(Math.random() * emptyQuads().length)]);
const opponentTurn = () => {
	/* This function will prevent from taking a player's turn */
	disableListener();
	/* This will mark as how long the AI will take it's turn  */
	setTimeout(() => {
		takeTurn(opponentChoice(), 'O');
		/* If there's no winner. This will enable player's turn */
		if (!checkWinner()) {
			enableListener();
		}
	}, 1000);
};

/* Click Function */
const clickFunc = (event) => {
	takeTurn(quadNumberId(event.target), 'X');
	if (!checkWinner()) {
		opponentTurn();
	}
};

/* Waiting for the turn - Enabling Listeners */
const enableListener = () =>
	grid().forEach((el) => el.addEventListener('click', clickFunc));
/* Waiting for the turn - Disabling Listeners */
const disableListener = () =>
	grid().forEach((el) => el.removeEventListener('click', clickFunc));

enableListener();
