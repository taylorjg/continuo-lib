import { Board } from '../src/board'
import { Deck } from '../src/deck'
import { Colour, Orientation } from '../src/enums'
import { evaluatePlacedCard } from '../src/misc'
import { PlacedCard } from '../src/placedCard'

describe('Misc tests', () => {
  it('numCardsLeft after calling nextCard()', () => {
    const card1 = Deck.findCard(Colour.Blue, Colour.Green, Colour.Green, Colour.Blue)
    const card2 = Deck.findCard(Colour.Blue, Colour.Green, Colour.Red, Colour.Blue)
    const placedCard1 = new PlacedCard(card1, 0, 0, Orientation.North)
    const placedCard2 = new PlacedCard(card2, -1, 4, Orientation.North)
    const board1 = Board.empty.placeCard(placedCard1)
    const possibleMove = evaluatePlacedCard(board1, placedCard2)
    expect(possibleMove.chains).toHaveLength(3)
    expect(possibleMove.score).toBe(999)
  })
})
