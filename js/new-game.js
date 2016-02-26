$(function () {
	
	$('#deal').on('click', function () {
		$('#deal').hide();
		$('#newGame').show();
		createDeck(cardSuits, cardValues);
		player1.hand = dealHand(deck);
		player2.hand = dealHand(deck);
		dealer.hand = dealHand(deck);
		setCardFaces(players);
		flipCard(player1, 'card2');
		flipCard(player2, 'card2');
		flipCard(dealer, 'card2');
		playersTurn(player1);
	});
	$('#newGame').on('click', function () {
		player1.hand = [];
		player2.hand = [];
		dealer.hand = [];
		$('#deal').show();
		$('#newGame').hide();
		// Reset everything to original condition
		$('.flipped').removeClass('flipped');
		$('.score').text('0');
		$('.playerHand .button').removeClass('is-active');
		$('#player0Hand').find('.card').slice(2).remove();
		$('#player1Hand').find('.card').slice(2).remove();
		$('#player2Hand').find('.card').slice(2).remove();
		$('#player0Hand h2').text('Dealer (Joey)');
		$('#player1Hand h2').text('Player One');
		$('#player2Hand h2').text('Player Two');
	});

	$('#playerOneHit').on('click', function () {
		if ($(this).hasClass('is-active')) {
			hit(player1);
		}
	});
	$('#playerOneStay').on('click', function () {
		if ($(this).hasClass('is-active')) {
			endTurn(player1);
		}
	});
	$('#playerTwoHit').on('click', function () {
		if ($(this).hasClass('is-active')) {
			hit(player2);
		}
	});
	$('#playerTwoStay').on('click', function () {
		if ($(this).hasClass('is-active')) {
			endTurn(player2);
		}
	});

});


var cardSuits = [ 'spades', 'hearts', 'diamonds', 'clubs'];
var cardValues = [ '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace' ];
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
var players = [player1, player2, dealer];


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
	var totals = [0];
	var scoreboard = document.querySelector('#' + player.container + ' .score');
	// Loop through the hand, and convert letter values to numbers, then add to every value in totals array
	for (var i = 0; i < player.hand.length; i++) {
		if (player.hand[i].value === "jack" || player.hand[i].value === "queen" || player.hand[i].value === "king") {
			totals = addToTotals(totals, 10);
		// If card is an ace, add 1 to every value in the total array- and then combine with
		// a duplicate number of totals where we add 10
		// (this creates an array of all possible totals, which we can then choose from)
		} else if (player.hand[i].value === "ace") {
			totals = addToTotals(totals, 1).concat(addToTotals(totals, 11));
		} else {
			totals = addToTotals(totals, parseInt(player.hand[i].value));
		}		
	}

	var total = totals[0];
	// Choose the highest total that does not bust
	for (var i = 0; i < totals.length; i++) {
		if (totals[i] > total && totals[i] < 22) {
			total = totals[i];
		}
	}

	// If total is a blackjack, or a bust, tell player- otherwise just display total
	if (total > 21) {
		scoreboard.innerHTML = "Bust! (" + total + ")";	
		player.total = total;
		endTurn(player);
	} else if (total === 21) {
		scoreboard.innerHTML = "Blackjack!";
		player.total = total;
		endTurn(player);
	} else {
		scoreboard.innerHTML =  total;
		player.total = total;
	}

}

function setCardFaces (players) {

	for (var i = 0; i < players.length; i++) {
		var cards = document.querySelectorAll('#' + players[i].container + ' .card-container .side2');
		for (var j = 0; j < cards.length; j++) {
			cards[j].style.backgroundImage = 'url("img/cardfaces/' + players[i].hand[j].value + '_of_' + players[i].hand[j].suit + '.png")';
		}
	}

}

function flipCard(player, card) {

	// Flip the card
	document.querySelector('#' + player.container + ' .card-container .' + card).className = 'card ' + card + ' flipped';

}

function addToTotals (array, value) {

	// Creates a copy of the array
	var tot = array.slice(0);
	// Adds the value to each element in that copy
	for (var i = 0; i < tot.length; i++) {
		tot[i] = tot[i] + value;
	}
	// Returns the copy
	return tot;
}