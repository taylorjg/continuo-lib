import { Colour } from './enums'
import { Card } from './card'

const mainColourPairs: [Colour, Colour][] = [
  [Colour.Yellow, Colour.Red],
  [Colour.Yellow, Colour.Green],
  [Colour.Yellow, Colour.Blue],
  [Colour.Red, Colour.Green],
  [Colour.Red, Colour.Blue],
  [Colour.Blue, Colour.Green]
]

const allColours = [
  Colour.Red,
  Colour.Green,
  Colour.Blue,
  Colour.Yellow
]

const makeCardsForMainColourPair = (mainColourPair: [Colour, Colour]): Card[] => {
  const [mainColour1, mainColour2] = mainColourPair
  const [cornerColour1, cornerColour2] = allColours.filter(colour => colour != mainColour1 && colour != mainColour2)
  return [
    new Card(mainColour1, mainColour2, mainColour2, mainColour1),
    new Card(mainColour1, mainColour2, cornerColour1, mainColour1),
    new Card(mainColour1, mainColour2, cornerColour1, cornerColour1),
    new Card(mainColour1, mainColour2, mainColour2, cornerColour1),
    new Card(mainColour1, mainColour2, cornerColour2, mainColour1),
    new Card(mainColour1, mainColour2, cornerColour2, cornerColour2),
    new Card(mainColour1, mainColour2, mainColour2, cornerColour2)
  ]
}

const makeCards = (): Card[] => mainColourPairs.flatMap(makeCardsForMainColourPair)

export class Deck {

  private static originalCards: readonly Card[] = makeCards()

  private cards: Card[] = Deck.originalCards.slice()

  constructor() {
    this.shuffle()
  }

  reset(): void {
    this.cards = Deck.originalCards.slice()
    this.shuffle()
  }

  nextCard(): Card {
    const card = this.cards.shift()
    if (!card) {
      throw new Error('[Card#nextCard] deck is empty')
    }
    return card
  }

  get numCardsLeft() {
    return this.cards.length
  }

  private shuffle(): void {
    // TODO: shuffle this.cards
  }
}
