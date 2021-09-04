import { Deck } from '../src'

describe('Deck tests', () => {

  it('numCardsLeft after construction', () => {
    const deck = new Deck()
    expect(deck.numCardsLeft).toBe(42)
  })

  it('numCardsLeft after calling nextCard()', () => {
    const deck = new Deck()
    deck.nextCard()
    expect(deck.numCardsLeft).toBe(41)
  })
})
