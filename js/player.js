

function hit(player) {

	player.hand.push(dealCard(deck));
	
	var cardContainer = document.querySelector('#' + player.container + ' .card-container');
	cardContainer.innerHTML += '<div class="card card' + (player.hand.length + 1) + '"><div class="side side1"></div><div class="side side2"><p class="suit"></p><p class="value"></p></div></div>';
	
	displayCards(player);
	calculateScore(player);
}

function playersTurn(player) {

	if (player == dealer) {
		dealersTurn(player);
	} else {
		// Show hit and stay buttons as active
		var buttons = document.querySelectorAll('#' + player.container + ' .button');
		buttons[0].className += ' is-active';
		buttons[1].className += ' is-active';
	}
}

function endTurn(player) {

	if (player == dealer) {
		endGame();
	} else {
		// Show hit and stay buttons as inactive
		var buttons = document.querySelectorAll('#' + player.container + ' .button');
		buttons[0].className = 'button';
		buttons[1].className = 'button';
		// Advance to next players turn (since player1 is players[0], can use current player's
		// number to advance)
		playersTurn(players[player.number]);
	}

}

function dealersTurn(dealer) {

	while (dealer.total < 17) {
		hit(dealer);
	};
	endGame();

}

function endGame() {

	console.log("It's over!");

}