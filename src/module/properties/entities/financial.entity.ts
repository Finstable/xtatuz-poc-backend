import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Property } from './property.entity';

@Entity({ name: 'financial' })
export class Financial {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', name: 'grossRentPerYear', nullable: true })
  grossRentPerYear: number;

  @Column({ type: 'decimal', name: 'grossRentPerMonth', nullable: true })
  grossRentPerMonth: number;

  @Column({ type: 'decimal', name: 'monthlyCosts', nullable: true })
  monthlyCosts: number;

  @Column({ type: 'decimal', name: 'netRentPerYear', nullable: true })
  netRentPerYear: number;

  @Column({ type: 'decimal', name: 'netRentPerMonth', nullable: true })
  netRentPerMonth: number;

  @Column({ type: 'decimal', name: 'totalPrice', nullable: true })
  totalPrice: number;

  @Column({ type: 'decimal', name: 'expectedIncome', nullable: true })
  expectedIncome: number;

  @CreateDateColumn({ name: 'createdAt', type: 'timestamptz' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamptz' })
  updatedAt?: Date;

  @OneToOne(() => Property, (property) => property.financial)
  property: Property;
}
