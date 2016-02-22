

function hit(player) {

	player.hand.push(dealCard(deck));
	
	var cardContainer = document.querySelector('#' + player.container + ' .card-container');
	cardContainer.innerHTML += '<div class="card card' + (player.hand.length + 1) + '"><div class="side side1"></div><div class="side side2"><p class="suit"></p><p class="value"></p></div></div>';
	
	displayCards(player);
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