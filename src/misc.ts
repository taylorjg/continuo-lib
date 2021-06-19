import { Board } from './board'
import { Card } from './card'
import { Cell } from './cell'
import { Direction } from './enums'
import { PlacedCard } from './placedCard'

export class Chain {

  public static readonly empty = new Chain([])

  public constructor(public readonly cells: readonly Cell[]) {
  }

  public get length(): number {
    return this.cells.length
  }

  public containsCell(cellToFind: Cell): boolean {
    return this.cells.findIndex(cell => cell.equals(cellToFind)) >= 0
  }

  public toString(): string {
    return '[' + this.cells.map(cell => `${cell}`).join(', ') + ']'
  }
}

export class PossibleMove {

  public readonly score: number

  public constructor(
    public readonly placedCard: PlacedCard,
    public readonly chains: readonly Chain[]
  ) {
    this.score = chains.reduce((acc, chain) => acc + chain.length, 0)
  }

  public toString(): string {
    const line1 = `  score: ${this.score}`
    const line2 = '  chains:\n' + this.chains.map(chain => `    ${chain}`).join('\n')
    return '\n' + [line1, line2].join('\n')
  }
}

const perimeterCells = [
  // corners
  { rowWithinCard: 0, colWithinCard: 0, forwardDirection: Direction.Up, backwardDirection: Direction.Left },
  { rowWithinCard: 0, colWithinCard: 3, forwardDirection: Direction.Up, backwardDirection: Direction.Right },
  { rowWithinCard: 3, colWithinCard: 3, forwardDirection: Direction.Down, backwardDirection: Direction.Right },
  { rowWithinCard: 3, colWithinCard: 0, forwardDirection: Direction.Down, backwardDirection: Direction.Left },
  // top middle
  { rowWithinCard: 0, colWithinCard: 1, forwardDirection: Direction.Up, backwardDirection: Direction.Down },
  { rowWithinCard: 0, colWithinCard: 2, forwardDirection: Direction.Up, backwardDirection: Direction.Down },
  // bottom middle
  { rowWithinCard: 3, colWithinCard: 1, forwardDirection: Direction.Down, backwardDirection: Direction.Up },
  { rowWithinCard: 3, colWithinCard: 2, forwardDirection: Direction.Down, backwardDirection: Direction.Up },
  // left middle
  { rowWithinCard: 1, colWithinCard: 0, forwardDirection: Direction.Left, backwardDirection: Direction.Right },
  { rowWithinCard: 2, colWithinCard: 0, forwardDirection: Direction.Left, backwardDirection: Direction.Right },
  // right middle
  { rowWithinCard: 1, colWithinCard: 3, forwardDirection: Direction.Right, backwardDirection: Direction.Left },
  { rowWithinCard: 2, colWithinCard: 3, forwardDirection: Direction.Right, backwardDirection: Direction.Left }
]

export const evaluatePlacedCard = (board: Board, placedCard: PlacedCard): PossibleMove => {
  const newBoard = board.placeCard(placedCard)
  const chains: Chain[] = []
  for (const perimeterCell of perimeterCells) {
    const { rowWithinCard, colWithinCard, forwardDirection, backwardDirection } = perimeterCell
    const row = placedCard.row + rowWithinCard
    const col = placedCard.col + colWithinCard
    const cell = new Cell(row, col)
    if (chains.some(chain => chain.containsCell(cell))) {
      continue
    }
    const forwardChain = newBoard.followChain(cell, forwardDirection)
    // console.log('forwardChain:', `${forwardChain}`)
    if (forwardChain.length > 1) {
      const backwardChain = newBoard.followChain(cell, backwardDirection, forwardChain)
      const mergedChain = new Chain(backwardChain.cells.slice(1).reverse().concat(forwardChain.cells))
      chains.push(mergedChain)
    }
  }
  return new PossibleMove(placedCard, chains)
}

export const evaluateCard = (board: Board, card: Card): PossibleMove[] => {
  // get a list of all valid board positions where a card can be placed
  // for each valid board position:
  //   create a placed card with Orientation.North and call evaluatePlacedCard
  //   create a placed card with Orientation.East and call evaluatePlacedCard
  return []
}
