import { Deck } from './deck'
import { Colour, Orientation } from './enums'
import { PlacedCard } from './placedCard'
import { printCard, printPlacedCard } from './cardUtils'

const main = (): void => {
  const deck = new Deck()
  console.log('deck.numCardsLeft:', deck.numCardsLeft)
  // while (deck.numCardsLeft) {
  //   const card = deck.nextCard()
  //   printCard(card)
  //   console.log('-'.repeat(10))
  // }
  const card1 = Deck.findCard(Colour.Yellow, Colour.Red, Colour.Red, Colour.Yellow)
  printCard(card1)
  const placedCard1 = new PlacedCard(card1, 0, 0, Orientation.East)
  console.dir(placedCard1)
  printPlacedCard(placedCard1)
}

main()
