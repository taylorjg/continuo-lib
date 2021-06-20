import { Card } from './card'
import { Cell } from './cell'
import { Colour, Orientation } from './enums'

export class PlacedCard {

  public constructor(
    public readonly card: Card,
    public readonly row: number,
    public readonly col: number,
    public readonly orientation: Orientation) {
  }

  public colourAt(row: number, col: number): Colour {
    return this.card.colourAt(row, col, this.orientation)
  }

  public isCellWithinCard(cell: Cell): boolean {
    return (
      cell.row >= this.row &&
      cell.row <= this.row + 3 &&
      cell.col >= this.col &&
      cell.col <= this.col + 3
    )
  }

  // TODO: finish implementing this
  public toString(): string {
    return '[PlacedCard] TODO'
  }
}
