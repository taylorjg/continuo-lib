import { Deck } from './deck'
import { Colour, Orientation } from './enums'
import { PlacedCard } from './placedCard'
import { printPlacedCard } from './cardUtils'

const main = (): void => {
  const deck = new Deck()
  console.log('deck.numCardsLeft:', deck.numCardsLeft)

  // while (deck.numCardsLeft) {
  //   const card = deck.nextCard()
  //   printCard(card)
  //   console.log('-'.repeat(10))
  // }

  const card1 = Deck.findCard(Colour.Blue, Colour.Green, Colour.Green, Colour.Blue)
  const card2 = Deck.findCard(Colour.Blue, Colour.Green, Colour.Red, Colour.Blue)
  const card3 = Deck.findCard(Colour.Red, Colour.Blue, Colour.Yellow, Colour.Red)
  const card4 = Deck.findCard(Colour.Blue, Colour.Green, Colour.Yellow, Colour.Blue)

  const placedCard1 = new PlacedCard(card1, 0, 0, Orientation.North)
  const placedCard2 = new PlacedCard(card2, 0, 0, Orientation.North)
  const placedCard3 = new PlacedCard(card3, 0, 0, Orientation.East)
  const placedCard4 = new PlacedCard(card4, 0, 0, Orientation.North)

  printPlacedCard(placedCard1)
  console.log()
  printPlacedCard(placedCard2)
  console.log()
  printPlacedCard(placedCard3)
  console.log()
  printPlacedCard(placedCard4)
}

main()
