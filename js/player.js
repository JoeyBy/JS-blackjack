

function hit(player) {

	player.hand.push(dealCard(deck));
	
	var cardContainer = document.querySelector('#' + player.container + ' .card-container');
	cardContainer.innerHTML += '<div class="card card' + (player.hand.length + 1) + '"><div class="side side1"></div><div class="side side2"><p class="suit"></p><p class="value"></p></div></div>';
	
	setCardFaces(players);
	flipCard(player, 'card' + (player.hand.length + 1))
	calculateScore(player);
}

function playersTurn(player) {

	// Flip the hidden card and score the hand
	flipCard(player, 'card1');
	calculateScore(player);

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

	if (player != dealer) {
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
	}
	endGame();

}

function endGame() {

	// Loop through players, except for dealer, and declare winners, losers, and pushers
	for (var i = 0; i < players.length - 1; i++) {
		if ((players[i].total > dealer.total && players[i].total <= 21) || (dealer.total > 21 && players[i].total <= 21)) {
			document.querySelector('#' + players[i].container + ' h2').innerHTML += " wins!";
		} else if (players[i].total == dealer.total) {
			document.querySelector('#' + players[i].container + ' h2').innerHTML += " pushes!";
		} else {
			document.querySelector('#' + players[i].container + ' h2').innerHTML += " loses!";
		}
	}

	// Then check if the dealer won
	if (dealer.total > player1.total && dealer.total > player2.total && dealer.total <= 21) {
		document.querySelector('#' + dealer.container + ' h2').innerHTML += " wins!";
	}

}