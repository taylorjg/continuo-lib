import { Chain } from './chain'
import { PlacedCard } from './placedCard'

export class PossibleMove {

  public readonly score: number

  public constructor(
    public readonly placedCard: PlacedCard,
    public readonly chains: readonly Chain[]
  ) {
    this.score = chains.reduce((acc, chain) => acc + chain.length, 0)
  }

  public toString(): string {
    const line1 = `  score: ${this.score}`
    const line2 = '  chains:\n' + this.chains.map(chain => `    ${chain}`).join('\n')
    return '\n' + [line1, line2].join('\n')
  }
}
