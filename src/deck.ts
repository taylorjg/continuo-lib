import { Colour, Orientation } from './enums'
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
    const maybeCard = this.cards.shift()
    if (!maybeCard) {
      throw new Error('[Deck#nextCard] deck is empty')
    }
    return maybeCard
  }

  get numCardsLeft() {
    return this.cards.length
  }

  static findCard(mainColour1: Colour, mainColour2: Colour, cornerColour1: Colour, cornerColour2: Colour): Card {
    const maybeCard = Deck.originalCards.find(card =>
      card.colourAt(0, 1, Orientation.North) == mainColour1 &&
      card.colourAt(0, 2, Orientation.North) == mainColour2 &&
      card.colourAt(0, 0, Orientation.North) == cornerColour1 &&
      card.colourAt(0, 3, Orientation.North) == cornerColour2)
    if (!maybeCard) {
      throw new Error('[Deck#findCard] card not found')
    }
    return maybeCard
  }

  private shuffle(): void {
    // TODO: shuffle this.cards
  }
}
