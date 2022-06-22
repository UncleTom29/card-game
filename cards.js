class Card {
    constructor (value, name, suit) {
      this.value = value;
      this.name = name;
      this.suit = suit;
    }
  }

  class Player {
    constructor(id) {
      this.id = id;
      this.hand = [];
      this.points = 0;
    }
  
    addCards (cards) {
      this.hand.push(cards)
    }
  
    playTopCard () {
      return this.hand.pop()
    }
  
    reinsertCard (card) {
      let totalSpaces = this.hand.length + 1
      let randomIndex = Math.floor(Math.random() * totalSpaces)
      this.hand.splice(randomIndex, 0, card)
    }
  
    addPoints (points) {
      this.points += points
    }
  }

  
class Deck {
  constructor () {
    this.names = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
    this.suits = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
    this.cards = [];

    for (var s = 0; s < this.suits.length; s++) {
      for (var n = 0; n < this.names.length; n++) {
        this.cards.push(new Card(n + 1, this.names[n], this.suits[s]))
      }
    }
    
    this.shuffle()
  }

  shuffle () {
    let currentIndex = this.cards.length
    let temporaryValue
    let randomIndex
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      temporaryValue = this.cards[currentIndex]
      this.cards[currentIndex] = this.cards[randomIndex]
      this.cards[randomIndex] = temporaryValue
    }
  }

  deal () {
    let cardsPerPerson = 26
    let hand1 = this.cards.slice(0, 26)
    let hand2 = this.cards.slice(26, 52)
    let hands = []
    hands.push(hand1)
    hands.push(hand2)
    return hands
  }
}

class Game {
    constructor () {
      this.deck = new Deck()
      this.player1 = new Player(1)
      this.player2 = new Player(2)
  
      this.startGame()
    }
  
    startGame () {
      let hands = this.deck.deal()
      let hand1 = hands[0]
      let hand2 = hands[1]
  
      hand1.forEach((card) => {
        this.player1.addCards(card)
      })
  
      hand2.forEach((card) => {
        this.player2.addCards(card)
      })
    }
  
    gameRound () {
      let player1Card = this.player1.playTopCard()
      let player2Card = this.player2.playTopCard()
  
      console.log(`
        Player 1 plays ${player1Card.name} of ${player1Card.suit}.
        Player 2 plays ${player2Card.name} of ${player1Card.suit}.
      `)
  
      if (player1Card.value === player2Card.value) {
        if (this.player1.hand.length === 0) {
          console.log('The last card has the same value. What are the odds!')
        } else {
          console.log('Same value! Reinsert your cards randomly')
          this.player1.reinsertCard(player1Card)
          this.player2.reinsertCard(player2Card)
        }
      } else if (player1Card.value === 1) {
        console.log('Player 1 gets a point!')
        this.player1.addPoints(1)
      } else if (player2Card.value === 1) {
        console.log('Player 2 gets a point!')
        this.player2.addPoints(1)
      } else if (player1Card.value > player2Card.value) {
        console.log('Player 1 gets a point!')
        this.player1.addPoints(1)
      } else if (player2Card.value > player1Card.value) {
        console.log('Player 2 gets a point!')
        this.player2.addPoints(1)
      }
    }
  }
  