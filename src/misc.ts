import { Board } from './board'
import { Card } from './card'
import { Cell } from './cell'
import { Direction } from './enums'
import { PlacedCard } from './placedCard'

// TODO: extract to a separate file
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

// TODO: extract to a separate file
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
    const backwardChain = newBoard.followChain(cell, backwardDirection)
    const mergedChain = new Chain(backwardChain.cells.slice(1).reverse().concat(forwardChain.cells))
    // TODO: extract a method to check whether a board location lies within a placed card
    const chainIncludesAnotherCard = mergedChain.cells.some(cell => (
      cell.row < placedCard.row ||
      cell.row > placedCard.row + 3 ||
      cell.col < placedCard.col ||
      cell.col > placedCard.col + 3
    ))
    if (chainIncludesAnotherCard) {
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
