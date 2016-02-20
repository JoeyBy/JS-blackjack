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
		calculateScore(player1);
		calculateScore(player2);
		calculateScore(dealer);
		displayCards(player1);
		displayCards(player2);
		displayCards(dealer);
		playersTurn(player1);
	})

	$('#playerOneHit').on('click', function () {
		if ($(this).hasClass('is-active')) {
			hit(player1);
		}
	});
	$('#playerOneStay').on('click', function () {
		if ($(this).hasClass('is-active')) {
			stay(player1);
		}
	});
	$('#playerTwoHit').on('click', function () {
		if ($(this).hasClass('is-active')) {
			hit(player2);
		}
	});

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

function Player (number, hand, total, container) {
	this.number = number;
	this.total = 0;
	this.hand = [];
	this.container = 'player' + number + 'Hand';
}
var dealer = new Player(0);
var player1 = new Player(1);
var player2 = new Player(2);
var players = [dealer, player1, player2];


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

function calculateScore (player) {
	var total = 0;
	var scoreboard = document.querySelector('#' + player.container + ' .score');
	// Loop through the hand, and convert letter values to numbers, then add to total
	for (var i = 0; i < player.hand.length; i++) {
		if (player.hand[i].value === "J" || player.hand[i].value === "Q" || player.hand[i].value === "K") {
			total += 10;
		// If card is an ace, check to see whether it should be 1 or 11
		} else if (player.hand[i].value === "A") {
			if (total + 11 > 21) {
				total += 1;
			} else {
				total += 11;
			}
		} else {
			total += parseInt(player.hand[i].value);
		}		
	}

	// If total is a blackjack, or a bust, tell player- otherwise just display total
	if (total > 21) {
		scoreboard.innerHTML = "Bust! (" + total + ")";	
	} else if (total === 21) {
		scoreboard.innerHTML = "Blackjack!";
	} else {
		scoreboard.innerHTML =  total;
	}

}

function displayCards(player) {

	// Flip all the cards in the hand
	document.querySelector('#' + player.container + ' .card-container').className = 'card-container flipped';
	var suits = document.querySelectorAll('#' + player.container + ' .suit');
	var values = document.querySelectorAll('#' + player.container + ' .value');
	// Display the suits and values
	for (var i = 0; i < suits.length; i++) {
		suits[i].innerHTML = player.hand[i].suit;
		values[i].innerHTML = player.hand[i].value;
	}

}