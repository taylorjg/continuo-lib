import { Cell } from './cell'
import { Colour, Direction, notBackwards } from './enums'
import { Chain } from './chain'
import { PlacedCard } from './placedCard'

export class Board {

  public static readonly empty = new Board(new Map<string, Colour>(), [])

  private constructor(
    private readonly cellMap: Map<string, Colour>,
    private readonly placedCards: readonly PlacedCard[]) {
  }

  public canPlaceCardAt(proposedRow: number, proposedCol: number): boolean {
    for (const rowWithinCard of [0, 1, 2, 3]) {
      for (const colWithinCard of [0, 1, 2, 3]) {
        const row = proposedRow + rowWithinCard
        const col = proposedCol + colWithinCard
        const key = Board.makeCellMapKey(row, col)
        if (this.cellMap.has(key)) {
          return false
        }
      }
    }
    return true
  }

  public placeCard(placedCard: PlacedCard): Board {
    const newCellMap = new Map<string, Colour>(this.cellMap)
    for (const rowWithinCard of [0, 1, 2, 3]) {
      for (const colWithinCard of [0, 1, 2, 3]) {
        const row = placedCard.row + rowWithinCard
        const col = placedCard.col + colWithinCard
        const key = Board.makeCellMapKey(row, col)
        const value = placedCard.colourAt(rowWithinCard, colWithinCard)
        newCellMap.set(key, value)
      }
    }
    const newPlacedCards = this.placedCards.slice()
    newPlacedCards.push(placedCard)
    return new Board(newCellMap, newPlacedCards)
  }

  public findAvailableCardPositions(): Cell[] {
    if (this.placedCards.length == 0) return [new Cell(0, 0)]
    const offsets = [-3, -2, -1, 0, 1, 2, 3]
    const availableCardPositions: Cell[] = []
    for (const placedCard of this.placedCards) {
      for (const offset of offsets) {
        availableCardPositions.push(new Cell(placedCard.row - 4, placedCard.col + offset))
        availableCardPositions.push(new Cell(placedCard.row + 4, placedCard.col + offset))
        availableCardPositions.push(new Cell(placedCard.row + offset, placedCard.col - 4))
        availableCardPositions.push(new Cell(placedCard.row + offset, placedCard.col + 4))
      }
    }
    return availableCardPositions.filter(cell => this.canPlaceCardAt(cell.row, cell.col))
  }

  public followChain(initialCell: Cell, initialDirection: Direction): Chain {
    const cells: Cell[] = [initialCell]
    const chainColour = this.lookupCell(initialCell)
    if (chainColour == undefined) {
      throw new Error(`[Board#followChain] failed to find initial cell (${initialCell.row}, ${initialCell.col})`)
    }
    let currentCell = initialCell
    let nextDirections = [initialDirection]
    for (; ;) {
      let nextCell: Cell | undefined
      for (const direction of nextDirections) {
        const cell = currentCell.moveInDirection(direction)
        const colour = this.lookupCell(cell)
        if (colour == chainColour) {
          nextCell = cell
          nextDirections = notBackwards(direction)
          break
        }
      }
      if (!nextCell) break
      currentCell = nextCell
      if (cells.some(cell => cell.equals(currentCell))) break
      cells.push(nextCell)
    }
    return new Chain(cells)
  }

  private lookupCell(cell: Cell): Colour | undefined {
    const key = Board.makeCellMapKey(cell.row, cell.col)
    return this.cellMap.get(key)
  }

  private static makeCellMapKey(row: number, col: number): string {
    return `${row}:${col}`
  }
}
