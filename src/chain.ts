import { Cell } from './cell'

export class Chain {

  public static readonly empty = new Chain([])

  public constructor(public readonly cells: readonly Cell[]) {
  }

  public get length(): number {
    return this.cells.length
  }

  public get isCycle(): boolean {
    if (this.length < 4) return false
    const firstCell = this.cells[0]
    const lastCell = this.cells.slice(-1)[0]
    const rowDiff = Math.abs(firstCell.row - lastCell.row)
    const colDiff = Math.abs(firstCell.col - lastCell.col)
    const manhattanDistance = rowDiff + colDiff
    return manhattanDistance == 1
  }

  public containsCell(cellToFind: Cell): boolean {
    return this.cells.findIndex(cell => cell.equals(cellToFind)) >= 0
  }
}
