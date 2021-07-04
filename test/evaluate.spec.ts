import { Board } from '../src/board'
import { Deck } from '../src/deck'
import { Colour, Orientation } from '../src/enums'
import { evaluatePlacedCard, evaluateCard } from '../src/evaluate'
import { PlacedCard } from '../src/placedCard'

describe('Evaluate tests', () => {

  describe('evaluatePlacedCard', () => {

    it('without cycles', () => {
      const [card1] = Deck.findCard(Colour.Blue, Colour.Green, Colour.Green, Colour.Blue)
      const [card2] = Deck.findCard(Colour.Blue, Colour.Green, Colour.Red, Colour.Blue)
      const placedCard1 = new PlacedCard(card1, 0, 0, Orientation.North)
      const placedCard2 = new PlacedCard(card2, -1, 4, Orientation.North)
      const board = Board.empty.placeCard(placedCard1)
      const possibleMove = evaluatePlacedCard(board, placedCard2)
      expect(possibleMove.chains).toHaveLength(3)
      expect(possibleMove.score).toBe(14)
    })

    it('with cycles', () => {
      const [card1] = Deck.findCard(Colour.Blue, Colour.Green, Colour.Green, Colour.Blue)
      const placedCard1 = new PlacedCard(card1, 0, 0, Orientation.North)
      const placedCard2 = new PlacedCard(card1, 0, 4, Orientation.East)
      const placedCard3 = new PlacedCard(card1, 4, 4, Orientation.North)
      const placedCard4 = new PlacedCard(card1, 4, 0, Orientation.East)
      const board = Board.empty
        .placeCard(placedCard1)
        .placeCard(placedCard2)
        .placeCard(placedCard3)
      const possibleMove = evaluatePlacedCard(board, placedCard4)
      expect(possibleMove.chains).toHaveLength(6)
      expect(possibleMove.score).toBe(32)
    })
  })

  describe('evaluateCard', () => {
    it('with one card placed', () => {
      const [card1] = Deck.findCard(Colour.Blue, Colour.Green, Colour.Green, Colour.Blue)
      const [card2] = Deck.findCard(Colour.Blue, Colour.Green, Colour.Red, Colour.Blue)
      const placedCard1 = new PlacedCard(card1, 0, 0, Orientation.North)
      const board = Board.empty.placeCard(placedCard1)
      const possibleMoves = evaluateCard(board, card2)
      expect(possibleMoves).toHaveLength(28 * 2)
      expect(possibleMoves[0].chains).toHaveLength(3)
      expect(possibleMoves[0].score).toBe(14)
    })
  })
})
