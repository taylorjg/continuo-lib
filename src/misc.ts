import { Board } from './board'
import { Card } from './card'
import { PlacedCard } from './placedCard'

export class Chain {
  constructor(public cells: readonly [number, number][]) {
  }

  public get length(): number {
    return this.cells.length
  }
}

export class PossibleMove {

  public readonly score: number

  constructor(
    public readonly placedCard: PlacedCard,
    public readonly chains: readonly Chain[]
  ) {
    this.score = chains.reduce((acc, chain) => acc + chain.length, 0)
  }
}

export const evaluatePlacedCard = (board: Board, placedCard: PlacedCard): PossibleMove => {
  // add the card to the board to get a new board
  // for each perimeter cell:
  //   follow the chain forward to the end => forwardChain
  //   - checking for cycles
  //   follow the chain backward to the end => backwardChain
  //   - checking for cycles
  //   merge forwardChain and backwardChain
  return new PossibleMove(placedCard, [])
}

export const evaluateCard = (board: Board, card: Card): PossibleMove[] => {
  // get a list of all valid board positions where a card can be placed
  // for each valid board position:
  //   create a placed card with Orientation.North and call evaluatePlacedCard
  //   create a placed card with Orientation.East and call evaluatePlacedCard
  return []
}
