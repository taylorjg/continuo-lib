import {
  Board,
  Cell,
  Colour,
  Deck,
  Direction,
  Orientation,
  PlacedCard
} from '../src'

describe('Board tests', () => {

  describe('canPlaceCardAt', () => {

    it('can place card when board is empty', () => {
      const board = Board.empty
      expect(board.canPlaceCardAt(0, 0)).toBe(true)
    })

    it('can place card when board is non-empty and there is no overlap', () => {
      const deck = new Deck()
      const card = deck.nextCard()
      const placedCard = new PlacedCard(card, 0, 0, Orientation.NorthSouth)
      const board1 = Board.empty
      const board2 = board1.placeCard(placedCard)
      expect(board2.canPlaceCardAt(0, 4)).toBe(true)
    })

    it('cannot place card (full overlap)', () => {
      const deck = new Deck()
      const card = deck.nextCard()
      const placedCard = new PlacedCard(card, 0, 0, Orientation.NorthSouth)
      const board1 = Board.empty
      const board2 = board1.placeCard(placedCard)
      expect(board2.canPlaceCardAt(0, 0)).toBe(false)
    })

    it('cannot place card (partial overlap)', () => {
      const deck = new Deck()
      const card = deck.nextCard()
      const placedCard = new PlacedCard(card, 3, 3, Orientation.NorthSouth)
      const board1 = Board.empty
      const board2 = board1.placeCard(placedCard)
      expect(board2.canPlaceCardAt(0, 0)).toBe(false)
    })
  })

  describe('findAvailableCardPositions', () => {

    it('with no cards placed', () => {
      const availableCardPositions = Board.empty.findAvailableCardPositions()
      expect(availableCardPositions).toHaveLength(1)
      expect(availableCardPositions[0].equals(new Cell(0, 0))).toBe(true)
    })

    it('with one card placed', () => {
      const [card, orientation] = Deck.findCard(Colour.Blue, Colour.Green, Colour.Green, Colour.Blue)
      const placedCard = new PlacedCard(card, 0, 0, orientation)
      const board = Board.empty.placeCard(placedCard)
      const availableCardPositions = board.findAvailableCardPositions()
      expect(availableCardPositions).toHaveLength(28)
    })
  })

  describe('followChain', () => {

    let board: Board

    const setup = () => {
      const [card1, orientation1] = Deck.findCard(Colour.Blue, Colour.Green, Colour.Green, Colour.Blue)
      const [card2, orientation2] = Deck.findCard(Colour.Blue, Colour.Green, Colour.Red, Colour.Blue)
      const placedCard1 = new PlacedCard(card1, 0, 0, orientation1)
      const placedCard2 = new PlacedCard(card2, -1, 4, orientation2)
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
