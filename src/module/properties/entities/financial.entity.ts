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

  @Column({ type: 'decimal', name: 'gross_rent_per_year', nullable: true })
  grossRentPerYear: number;

  @Column({ type: 'decimal', name: 'gross_rent_per_month', nullable: true })
  grossRentPerMonth: number;

  @Column({ type: 'decimal', name: 'monthly_costs', nullable: true })
  monthlyCosts: number;

  @Column({ type: 'decimal', name: 'net_rent_per_year', nullable: true })
  netRentPerYear: number;

  @Column({ type: 'decimal', name: 'net_rent_per_month', nullable: true })
  netRentPerMonth: number;

  @Column({ type: 'decimal', name: 'total_price', nullable: true })
  totalPrice: number;

  @Column({ type: 'decimal', name: 'expected_income', nullable: true })
  expectedIncome: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt?: Date;

  @OneToOne(() => Property, (property) => property.financial)
  property: Property;
}
