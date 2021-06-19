import { Card } from './card'
import { Colour, Orientation } from './enums'
import { PlacedCard } from './placedCard'

const colourToString = (colour: Colour): string => {
  const ESC = '\x1B'
  const SET_COLOUR = (bg: number): string => `${ESC}[;${bg}m`
  const CLEAR_COLOUR = SET_COLOUR(49)
  switch (colour) {
    case Colour.Red: return `${SET_COLOUR(41)}  ${CLEAR_COLOUR}`
    case Colour.Green: return `${SET_COLOUR(42)}  ${CLEAR_COLOUR}`
    case Colour.Blue: return `${SET_COLOUR(44)}  ${CLEAR_COLOUR}`
    case Colour.Yellow: return `${SET_COLOUR(43)}  ${CLEAR_COLOUR}`
  }
}

export const printCard = (card: Card, orientation: Orientation = Orientation.North): void => {
  const lines = [0, 1, 2, 3].map(row =>
    [0, 1, 2, 3].map(col =>
      card.colourAt(row, col, orientation)).map(colourToString).join(''))
  lines.forEach(line => console.log(line))
}

export const printPlacedCard = (placedCard: PlacedCard): void => {
  const lines = [0, 1, 2, 3].map(row =>
    [0, 1, 2, 3].map(col =>
      placedCard.colourAt(row, col)).map(colourToString).join(''))
  lines.forEach(line => console.log(line))
}
