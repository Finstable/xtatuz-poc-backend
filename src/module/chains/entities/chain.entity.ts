import { Token } from 'src/module/token/entities/token.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'chains',
})
export class Chain {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'chainName' })
  chainName: string;

  @Column({ name: 'chainId' })
  chainId: string;

  @Column({ name: 'rpc' })
  rpc: string;

  @OneToMany(() => Token, (token) => token.chain, {
    cascade: true,
  })
  token: Token[];
}
