

function hit(player) {

	player.hand.push(dealCard(deck));
	calculateScore(player);

}

function playersTurn(player) {

	// Show hit and stay buttons as active
	var buttons = document.querySelectorAll('#' + player.container + ' .button');
	buttons[0].className += ' is-active';
	buttons[1].className += ' is-active';

}

function endTurn(player) {

	// Show hit and stay buttons as active
	var buttons = document.querySelectorAll('#' + player.container + ' .button');
	buttons[0].className = 'button';
	buttons[1].className = 'button';

}

function stay(player) {

	endTurn(player);
	playersTurn(players[player.number + 1]);

}