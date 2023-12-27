import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  name: string;

  @Column()
  symbol: string;

  @Column()
  imageUrl: string;

  @Column({ default: false })
  isActive: boolean;

  @Column()
  chainId: number;

  @Column()
  decimal: number;

  @Column()
  minimum: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
