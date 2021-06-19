import { Board } from '../src/board'
import { Colour, Direction, Orientation } from '../src/enums'
import { Deck } from '../src/deck'
import { PlacedCard } from '../src/placedCard'
import { Cell } from '../src/cell'

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

  describe('followChain', () => {

    let board: Board

    const setup = () => {
      const card1 = Deck.findCard(Colour.Blue, Colour.Green, Colour.Green, Colour.Blue)
      const card2 = Deck.findCard(Colour.Blue, Colour.Green, Colour.Red, Colour.Blue)
      const placedCard1 = new PlacedCard(card1, 0, 0, Orientation.North)
      const placedCard2 = new PlacedCard(card2, -1, 4, Orientation.North)
      board = Board.empty
        .placeCard(placedCard1)
        .placeCard(placedCard2)
    }

    beforeEach(setup)

    it('forward', () => {
      const startingCell = new Cell(1, 4)
      const chain = board.followChain(startingCell, Direction.Left)
      expect(chain.length).toBe(4)
    })

    it('backward', () => {
      const startingCell = new Cell(1, 4)
      const chain = board.followChain(startingCell, Direction.Right)
      expect(chain.length).toBe(3)
    })
  })
})
