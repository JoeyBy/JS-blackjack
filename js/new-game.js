$(function () {
	
	$('#startGame').on('click', function () {
		$('#startGame').hide();
		$('#deal').show();
	});
	$('#deal').on('click', function () {
		createDeck(cardSuits, cardValues);
		player1.hand = dealHand(deck);
		player2.hand = dealHand(deck);
		dealer.hand = dealHand(deck);
		$('#playerOneScore').text(calculateScore(player1.hand));
		$('#playerTwoScore').text(calculateScore(player2.hand));
		$('#dealerScore').text(calculateScore(dealer.hand));
		displayCards(player1.hand, '#playerOneHand');
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

function Player (name, hand, total) {
	this.name = name;
	this.total = 0;
	this.hand = [];
}
var player1 = new Player("Joey");
var player2 = new Player("Scott");
var dealer = new Player("Dealer");

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
}

function dealHand(deck) {

	var hand = [];
	for (var i = 0; i < 2; i++) {
		hand.push(dealCard(deck));
	}
	return hand;

}

function dealCard(deck) {

	// Generate a random number, then pull card of that number from deck array, removing it from the deck
	var cardNumber = randomNumber(deck);
	return deck.splice(cardNumber, 1)[0];
}

function randomNumber(deck) 
{
  return Math.floor(Math.random() * (deck.length - 1)) + 1 
};

function calculateScore (hand) {
	var total = 0;
	// Loop through the hand, and convert letter values to numbers, then add to total
	for (var i = 0; i < hand.length; i++) {
		if (hand[i].value === "J" || hand[i].value === "Q" || hand[i].value === "K") {
			total += 10;
		// If card is an ace, check to see whether it should be 1 or 11
		} else if (hand[i].value === "A") {
			if (total + 11 > 21) {
				total += 1;
			} else {
				total += 11;
			}
		} else {
			total += parseInt(hand[i].value);
		}		
	}

	// If total is a blackjack, or a bust, tell player- otherwise just display total
	if (total > 21) {
		return "Bust! (" + total + ")";	
	} else if (total === 21) {
		return "Blackjack!";
	} else {
		return total;
	}
}

function displayCards(hand, handID) {

	var suits = document.querySelectorAll(handID + ' .suit');
	var values = document.querySelectorAll(handID + ' .value');
	suits[0].innerHTML = player1.hand[0].suit;
	suits[1].innerHTML = player1.hand[1].suit;
	values[0].innerHTML = player1.hand[0].value;
	values[1].innerHTML = player1.hand[1].value;

}