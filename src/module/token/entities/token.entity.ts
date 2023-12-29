import { Chain } from 'src/module/chains/entities/chain.entity';
import { BaseEntity } from 'src/shared/models/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Token extends BaseEntity {
  @Column({ name: 'token_address' })
  tokenAddress: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  symbol: string;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @Column({ default: false })
  isActive: boolean;

  @Column()
  decimal: number;

  @ManyToOne(() => Chain, (chain) => chain, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'chain_id', referencedColumnName: 'id' })
  chain: Chain;
}
