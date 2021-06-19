import { Colour, Orientation } from './enums'

export class Card {

  private static readonly colourIndices: readonly number[][] = [
    [2, 0, 1, 3],
    [0, 0, 1, 1],
    [1, 1, 0, 0],
    [3, 1, 0, 2]
  ]

  private readonly colours: readonly Colour[]

  public constructor(mainColour1: Colour, mainColour2: Colour, cornerColour1: Colour, cornerColour2: Colour) {
    this.colours = [mainColour1, mainColour2, cornerColour1, cornerColour2]
  }

  public colourAt(rowWithinCard: number, colWithinCard: number, orientation: Orientation): Colour {
    // Due to card symmetry, North is same as South and East is same as West
    const rotated = orientation == Orientation.East || orientation == Orientation.West
    const adjustedRowWithinCard = rotated ? colWithinCard : rowWithinCard
    const adjustedColWithinCard = rotated ? 3 - rowWithinCard : colWithinCard
    const colourIndex = Card.colourIndices[adjustedRowWithinCard][adjustedColWithinCard]
    return this.colours[colourIndex]
  }
}
