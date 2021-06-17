import { Board } from '../src/board'
import { Deck } from '../src/deck'
import { Orientation } from '../src/enums'
import { PlacedCard } from '../src/placedCard'

describe('Board tests', () => {

  describe('canPlaceCardAt', () => {

    it('can place card when board is empty', () => {
      const board = Board.empty
      expect(board.canPlaceCardAt(0, 0)).toBe(true)
    })

    it('can place card when board is non-empty and there is no overlap', () => {
      const deck = new Deck()
      const card = deck.nextCard()
      const placedCard = new PlacedCard(card, 0, 0, Orientation.North)
      const board1 = Board.empty
      const board2 = board1.placeCard(placedCard)
      expect(board2.canPlaceCardAt(0, 4)).toBe(true)
    })

    it('cannot place card (full overlap)', () => {
      const deck = new Deck()
      const card = deck.nextCard()
      const placedCard = new PlacedCard(card, 0, 0, Orientation.North)
      const board1 = Board.empty
      const board2 = board1.placeCard(placedCard)
      expect(board2.canPlaceCardAt(0, 0)).toBe(false)
    })

    it('cannot place card (partial overlap)', () => {
      const deck = new Deck()
      const card = deck.nextCard()
      const placedCard = new PlacedCard(card, 3, 3, Orientation.North)
      const board1 = Board.empty
      const board2 = board1.placeCard(placedCard)
      expect(board2.canPlaceCardAt(0, 0)).toBe(false)
    })
  })
})
