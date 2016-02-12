$(function () {
	
	$('#startGame').on('click', function () {
		createDeck(cardSuits, cardValues);

		$('#startGame').hide();
		$('#deal').show();
	});
	$('#deal').on('click', function () {
		var handOne = dealHand(deck);
		var handTwo = dealHand(deck);
		var dealerHand = dealHand(deck);
		$('#handOneScore').text(calculateScore(handOne));
		$('#handTwoScore').text(calculateScore(handOne));
		$('#dealerScore').text(calculateScore(dealerHand));
	})
});


var cardSuits = [ 'S', 'H', 'D', 'C'];
var cardValues = [ '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A' ];
var deck = [];
var handOne = [];
var handTwo = [];
function Card (suit, value) {
	this.suit= suit;
	this.value= value;
}

function createDeck(cardSuits, cardValues) {

	deck = [];
	// Loop through each suit, then each value for that suit, and create a card object for each combo
	for (var i = 0; i < cardSuits.length; i++) {
		var suit = cardSuits[i];
		for (var j = 0; j < cardValues.length; j++) {
			var value = cardValues[j];
			var currentCard = new Card (suit, value);
			// Push that card object to the deck array
			deck.push(currentCard);
		}
	}
	console.log(deck);
}

function dealHand(deck) {

	var hand = [];
	for (var i = 0; i < 2; i++) {
		hand.push(dealCard(deck));
	}
	return hand;

}

function dealCard(deck) {

	// Generate a randon number, then pull card of that number from deck array
	var cardNumber = randomNumber(deck);
	return deck[cardNumber];
}

function randomNumber(deck) 
{
  return Math.floor(Math.random() * (deck.length - 1)) + 1 
};

function calculateScore (hand) {

	total = 0;
	// Loop through the hand, and convert letter values to numbers, then add to total
	for (var i = 0; i < hand.length; i++) {
		var value = hand[i].value;
		if (value === "J" || value === "Q" || value === "K") {
			value = 10;
		} else if (value === "A") {
			value = 1;
		} else {
			value = parseInt(value);
		}
		total += value;	
	}
	return total;
}