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

  @Column({ name: 'iconPath' })
  iconPath: string;

  @Column({ name: 'nativeName' })
  nativeName: string;

  @Column({ name: 'nativeSymbol' })
  nativeSymbol: string;

  @Column({ name: 'nativeDecimal' })
  nativeDecimals: string;

  @Column({ name: 'blockExplorerUrls' })
  blockExplorerUrls: string;
}
