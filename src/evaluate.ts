import { Board } from './board'
import { Card } from './card'
import { Cell } from './cell'
import { Chain } from './chain'
import { Direction, Orientation } from './enums'
import { PlacedCard } from './placedCard'
import { PossibleMove } from './possibleMove'

// A..B
// .EF.
// .GH.
// C..D
const startingPoints = [
  // Corner cells: A, B, C, D
  { rowWithinCard: 0, colWithinCard: 0, forwardDirection: Direction.Up, backwardDirection: Direction.Left },
  { rowWithinCard: 0, colWithinCard: 3, forwardDirection: Direction.Up, backwardDirection: Direction.Right },
  { rowWithinCard: 3, colWithinCard: 0, forwardDirection: Direction.Down, backwardDirection: Direction.Left },
  { rowWithinCard: 3, colWithinCard: 3, forwardDirection: Direction.Down, backwardDirection: Direction.Right },
  // Centre cells: E, F, G, H
  { rowWithinCard: 1, colWithinCard: 1, forwardDirection: Direction.Up, backwardDirection: Direction.Left },
  { rowWithinCard: 1, colWithinCard: 2, forwardDirection: Direction.Up, backwardDirection: Direction.Right },
  { rowWithinCard: 2, colWithinCard: 1, forwardDirection: Direction.Down, backwardDirection: Direction.Left },
  { rowWithinCard: 2, colWithinCard: 2, forwardDirection: Direction.Down, backwardDirection: Direction.Right }
]

export const evaluatePlacedCard = (board: Board, placedCard: PlacedCard): PossibleMove => {
  const newBoard = board.placeCard(placedCard)
  const chains: Chain[] = []
  for (const startingPoint of startingPoints) {
    const { rowWithinCard, colWithinCard, forwardDirection, backwardDirection } = startingPoint
    const row = placedCard.row + rowWithinCard
    const col = placedCard.col + colWithinCard
    const cell = new Cell(row, col)
    if (chains.some(chain => chain.containsCell(cell))) {
      continue
    }
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
  const availableCardPositions = board.findAvailableCardPositions()
  const possibleMoves = availableCardPositions.flatMap(cell => {
    const placedCard1 = new PlacedCard(card, cell.row, cell.col, Orientation.NorthSouth)
    const placedCard2 = new PlacedCard(card, cell.row, cell.col, Orientation.EastWest)
    const possibleMove1 = evaluatePlacedCard(board, placedCard1)
    const possibleMove2 = evaluatePlacedCard(board, placedCard2)
    return [possibleMove1, possibleMove2]
  })
  return possibleMoves.sort((pm1, pm2) => {
    return pm1.score == pm2.score
      ? pm2.longestChainLength - pm1.longestChainLength
      : pm2.score - pm1.score
  })
}
