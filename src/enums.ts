export enum Colour {
  Red,
  Green,
  Blue,
  Yellow
}

export enum Orientation {
  NorthSouth,
  EastWest
}

export enum Direction {
  Up,
  Down,
  Left,
  Right
}

const allDirections = [
  Direction.Up,
  Direction.Down,
  Direction.Left,
  Direction.Right
]

export const oppositeDirectionTo = (direction: Direction): Direction => {
  switch (direction) {
    case Direction.Up: return Direction.Down
    case Direction.Down: return Direction.Up
    case Direction.Left: return Direction.Right
    case Direction.Right: return Direction.Left
  }
}

export const notBackwards = (directon: Direction): Direction[] => {
  const oppositeDirection = oppositeDirectionTo(directon)
  return allDirections.filter(otherDirection => otherDirection != oppositeDirection)
}
