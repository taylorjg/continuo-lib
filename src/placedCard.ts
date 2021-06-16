import { Card } from './card'
import { Colour, Orientation } from './enums'

export class PlacedCard {

  constructor(
    public readonly card: Card,
    public readonly row: number,
    public readonly col: number,
    public readonly orientation: Orientation) {
  }

  colourAt(row: number, col: number): Colour {
    return this.card.colourAt(row, col, this.orientation)
  }
}
