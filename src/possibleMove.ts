import { Chain } from './chain'
import { PlacedCard } from './placedCard'

export class PossibleMove {

  public readonly score: number
  public readonly longestChainLength: number

  public constructor(
    public readonly placedCard: PlacedCard,
    public readonly chains: readonly Chain[]
  ) {
    this.score = chains.reduce((acc, chain) => acc + chain.length, 0)
    this.longestChainLength = Math.max(...chains.map(chain => chain.length))
  }
}
