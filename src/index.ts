import { Deck } from './deck'
import { printCard } from './cardUtils'

const main = (): void => {
  const deck = new Deck()
  console.log('deck.numCardsLeft:', deck.numCardsLeft)
  while (deck.numCardsLeft) {
    const card = deck.nextCard()
    printCard(card)
    console.log('-'.repeat(10))
  }
}

main()
