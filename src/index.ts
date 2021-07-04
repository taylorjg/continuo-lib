import { printPlacedCard } from './cardUtils'
import { Deck } from './deck'
import { Colour } from './enums'
import { PlacedCard } from './placedCard'

const main = (): void => {
  const deck = new Deck()
  console.log('deck.numCardsLeft:', deck.numCardsLeft)

  // while (deck.numCardsLeft) {
  //   const card = deck.nextCard()
  //   printCard(card)
  //   console.log('-'.repeat(10))
  // }

  const [card1, orientation1] = Deck.findCard(Colour.Blue, Colour.Green, Colour.Green, Colour.Blue)
  const [card2, orientation2] = Deck.findCard(Colour.Blue, Colour.Green, Colour.Red, Colour.Blue)
  const [card3, orientation3] = Deck.findCard(Colour.Blue, Colour.Red, Colour.Red, Colour.Yellow)
  const [card4, orientation4] = Deck.findCard(Colour.Blue, Colour.Green, Colour.Yellow, Colour.Blue)

  const placedCard1 = new PlacedCard(card1, 0, 0, orientation1)
  const placedCard2 = new PlacedCard(card2, 0, 0, orientation2)
  const placedCard3 = new PlacedCard(card3, 0, 0, orientation3)
  const placedCard4 = new PlacedCard(card4, 0, 0, orientation4)

  printPlacedCard(placedCard1)
  console.log()
  printPlacedCard(placedCard2)
  console.log()
  printPlacedCard(placedCard3)
  console.log()
  printPlacedCard(placedCard4)
}

main()
