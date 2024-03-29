import arrayShuffle from 'array-shuffle'
import { Card } from './card'
import { Colour, Orientation } from './enums'

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

  public static readonly originalCards: readonly Card[] = makeCards()

  private cards: Card[]

  public constructor() {
    this.cards = arrayShuffle(Deck.originalCards)
  }

  public reset(): void {
    this.cards = arrayShuffle(Deck.originalCards)
  }

  public nextCard(): Card {
    const maybeCard = this.cards.shift()
    if (!maybeCard) {
      throw new Error('[Deck#nextCard] deck is empty')
    }
    return maybeCard
  }

  public get numCardsLeft() {
    return this.cards.length
  }

  public static findCard(
    mainColour1: Colour,
    mainColour2: Colour,
    cornerColour1: Colour,
    cornerColour2: Colour): [Card, Orientation] {

    const maybeCard1 = Deck.findCardInternal(mainColour1, mainColour2, cornerColour1, cornerColour2, Orientation.NorthSouth)
    if (maybeCard1) {
      return [maybeCard1, Orientation.NorthSouth]
    }

    const maybeCard2 = Deck.findCardInternal(mainColour1, mainColour2, cornerColour1, cornerColour2, Orientation.EastWest)
    if (maybeCard2) {
      return [maybeCard2, Orientation.EastWest]
    }

    throw new Error('[Deck.findCard] card not found')
  }

  private static findCardInternal(
    mainColour1: Colour,
    mainColour2: Colour,
    cornerColour1: Colour,
    cornerColour2: Colour,
    orientation: Orientation): Card | undefined {
    return Deck.originalCards.find(card =>
      card.colourAt(0, 1, orientation) == mainColour1 &&
      card.colourAt(0, 2, orientation) == mainColour2 &&
      card.colourAt(0, 0, orientation) == cornerColour1 &&
      card.colourAt(0, 3, orientation) == cornerColour2)
  }
}
