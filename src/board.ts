import { Colour } from './enums'
import { PlacedCard } from './placedCard'

export class Board {

  static readonly empty = new Board(new Map<string, Colour>())

  private constructor(private readonly cellMap: Map<string, Colour>) {
  }

  canPlaceCardAt(proposedRow: number, proposedCol: number): boolean {
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

  placeCard(placedCard: PlacedCard): Board {
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

  private static makeCellMapKey(row: number, col: number): string {
    return `${row}:${col}`
  }
}
