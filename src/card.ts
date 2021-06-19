import { Colour, Orientation } from './enums'

export class Card {

  private static readonly colourIndices: readonly number[][] = [
    [2, 0, 1, 3],
    [0, 0, 1, 1],
    [1, 1, 0, 0],
    [3, 1, 0, 2]
  ]

  private readonly colours: readonly Colour[]

  constructor(mainColour1: Colour, mainColour2: Colour, cornerColour1: Colour, cornerColour2: Colour) {
    this.colours = [mainColour1, mainColour2, cornerColour1, cornerColour2]
  }

  colourAt(row: number, col: number, orientation: Orientation): Colour {
    const rotated = orientation == Orientation.East || orientation == Orientation.West
    const adjustedRow = rotated ? col : row
    const adjustedCol = rotated ? 3 - row : col
    const colourIndex = Card.colourIndices[adjustedRow][adjustedCol]
    return this.colours[colourIndex]
  }
}
