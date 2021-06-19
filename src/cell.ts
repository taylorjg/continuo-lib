import { Direction } from './enums'

export class Cell {

  public constructor(
    public readonly row: number,
    public readonly col: number) {
  }

  public equals(other: Cell) {
    return this.row == other.row && this.col == other.col
  }

  public moveInDirection = (direction: Direction): Cell => {
    switch (direction) {
      case Direction.Up: return new Cell(this.row - 1, this.col)
      case Direction.Down: return new Cell(this.row + 1, this.col)
      case Direction.Left: return new Cell(this.row, this.col - 1)
      case Direction.Right: return new Cell(this.row, this.col + 1)
    }
  }

  public toString(): string {
    return `(${this.row},${this.col})`
  }
}
