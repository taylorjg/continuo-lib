import { Cell } from './cell'
import { Colour, Direction, notBackwards } from './enums'
import { Chain } from './misc'
import { PlacedCard } from './placedCard'

export class Board {

  public static readonly empty = new Board(new Map<string, Colour>())

  private constructor(private readonly cellMap: Map<string, Colour>) {
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
    return new Board(newCellMap)
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

  // TODO: implement this
  public toString(): string {
    return '[Board] TODO'
  }

  private lookupCell(cell: Cell): Colour | undefined {
    const key = Board.makeCellMapKey(cell.row, cell.col)
    return this.cellMap.get(key)
  }

  private static makeCellMapKey(row: number, col: number): string {
    return `${row}:${col}`
  }
}
