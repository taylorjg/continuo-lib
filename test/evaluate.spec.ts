import {
  Board,
  Colour,
  Deck,
  Orientation,
  PlacedCard,
  evaluateCard,
  evaluatePlacedCard
} from '../src'

describe('Evaluate tests', () => {

  describe('evaluatePlacedCard', () => {

    it('without cycles', () => {
      const [card1] = Deck.findCard(Colour.Blue, Colour.Green, Colour.Green, Colour.Blue)
      const [card2] = Deck.findCard(Colour.Blue, Colour.Green, Colour.Red, Colour.Blue)
      const placedCard1 = new PlacedCard(card1, 0, 0, Orientation.NorthSouth)
      const placedCard2 = new PlacedCard(card2, -1, 4, Orientation.NorthSouth)
      const board = Board.empty.placeCard(placedCard1)
      const possibleMove = evaluatePlacedCard(board, placedCard2)
      expect(possibleMove.chains).toHaveLength(3)
      expect(possibleMove.score).toBe(14)
    })

    it('with cycles', () => {
      const [card1] = Deck.findCard(Colour.Blue, Colour.Green, Colour.Green, Colour.Blue)
      const placedCard1 = new PlacedCard(card1, 0, 0, Orientation.NorthSouth)
      const placedCard2 = new PlacedCard(card1, 0, 4, Orientation.EastWest)
      const placedCard3 = new PlacedCard(card1, 4, 4, Orientation.NorthSouth)
      const placedCard4 = new PlacedCard(card1, 4, 0, Orientation.EastWest)
      const board = Board.empty
        .placeCard(placedCard1)
        .placeCard(placedCard2)
        .placeCard(placedCard3)
      const possibleMove = evaluatePlacedCard(board, placedCard4)
      expect(possibleMove.chains).toHaveLength(6)
      expect(possibleMove.score).toBe(32)
    })

    it('don\'t double count chains', () => {
      const [card1, orientation1] = Deck.findCard(Colour.Yellow, Colour.Red, Colour.Red, Colour.Yellow)
      const [card2, orientation2] = Deck.findCard(Colour.Red, Colour.Blue, Colour.Yellow, Colour.Yellow)
      const [card3, orientation3] = Deck.findCard(Colour.Blue, Colour.Yellow, Colour.Red, Colour.Red)
      const placedCard1 = new PlacedCard(card1, 0, 0, orientation1)
      const placedCard2 = new PlacedCard(card2, 0, 4, orientation2)
      const placedCard3 = new PlacedCard(card3, -4, 2, orientation2)
      const board = Board.empty
        .placeCard(placedCard1)
        .placeCard(placedCard2)
      const possibleMove = evaluatePlacedCard(board, placedCard3)
      expect(possibleMove.chains).toHaveLength(2)
      expect(possibleMove.score).toBe(13)
    })
  })

  describe('evaluateCard', () => {
    it('with one card placed', () => {
      const [card1] = Deck.findCard(Colour.Blue, Colour.Green, Colour.Green, Colour.Blue)
      const [card2] = Deck.findCard(Colour.Blue, Colour.Green, Colour.Red, Colour.Blue)
      const placedCard1 = new PlacedCard(card1, 0, 0, Orientation.NorthSouth)
      const board = Board.empty.placeCard(placedCard1)
      const possibleMoves = evaluateCard(board, card2)
      expect(possibleMoves).toHaveLength(28 * 2)
      expect(possibleMoves[0].chains).toHaveLength(3)
      expect(possibleMoves[0].score).toBe(14)
    })
  })
})
