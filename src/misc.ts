import { Board } from './board'
import { Card } from './card'
import { Cell } from './cell'
import { Chain } from './chain'
import { Direction } from './enums'
import { PlacedCard } from './placedCard'
import { PossibleMove } from './possibleMove'

const startingPoints = [
  // 4 corner cells: top left, top right, bottom right, bottom left
  { rowWithinCard: 0, colWithinCard: 0, forwardDirection: Direction.Up, backwardDirection: Direction.Left },
  { rowWithinCard: 0, colWithinCard: 3, forwardDirection: Direction.Up, backwardDirection: Direction.Right },
  { rowWithinCard: 3, colWithinCard: 3, forwardDirection: Direction.Down, backwardDirection: Direction.Right },
  { rowWithinCard: 3, colWithinCard: 0, forwardDirection: Direction.Down, backwardDirection: Direction.Left },
  // 4 centre cells: top left, top right, bottom right, bottom left
  { rowWithinCard: 1, colWithinCard: 1, forwardDirection: Direction.Up, backwardDirection: Direction.Left },
  { rowWithinCard: 1, colWithinCard: 2, forwardDirection: Direction.Up, backwardDirection: Direction.Right },
  { rowWithinCard: 2, colWithinCard: 2, forwardDirection: Direction.Down, backwardDirection: Direction.Right },
  { rowWithinCard: 2, colWithinCard: 1, forwardDirection: Direction.Down, backwardDirection: Direction.Left }
]

export const evaluatePlacedCard = (board: Board, placedCard: PlacedCard): PossibleMove => {
  const newBoard = board.placeCard(placedCard)
  const chains: Chain[] = []
  for (const startingPoint of startingPoints) {
    const { rowWithinCard, colWithinCard, forwardDirection, backwardDirection } = startingPoint
    const row = placedCard.row + rowWithinCard
    const col = placedCard.col + colWithinCard
    const cell = new Cell(row, col)
    const forwardChain = newBoard.followChain(cell, forwardDirection)
    if (forwardChain.isCycle) {
      chains.push(forwardChain)
    } else {
      const backwardChain = newBoard.followChain(cell, backwardDirection)
      const mergedChain = new Chain(backwardChain.cells.slice(1).reverse().concat(forwardChain.cells))
      const chainIncludesAnotherCard = !mergedChain.cells.every(cell => placedCard.isCellWithinCard(cell))
      if (chainIncludesAnotherCard) {
        chains.push(mergedChain)
      }
    }
  }
  return new PossibleMove(placedCard, chains)
}

export const evaluateCard = (board: Board, card: Card): PossibleMove[] => {
  // get a list of all valid board positions where a card can be placed
  // for each valid board position:
  //   create a placed card with Orientation.North and call evaluatePlacedCard
  //   create a placed card with Orientation.East and call evaluatePlacedCard
  // sort by highest score then by longest chain
  return []
}
