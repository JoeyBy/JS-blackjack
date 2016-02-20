

function hit(player) {

	player.hand.push(dealCard(deck));
	return calculateScore(player.hand);

}