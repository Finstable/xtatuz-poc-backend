import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Property } from './property.entity';

@Entity({ name: 'nearLocation' })
export class NearLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'locationName', nullable: true })
  locationName: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'numeric', nullable: true })
  distance: number;

  @CreateDateColumn({ name: 'createdAt', type: 'timestamptz' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: Date;

  @ManyToOne(() => Property, (property) => property.id) // specify inverse side as a second parameter
  @JoinColumn({ name: 'propertyId', referencedColumnName: 'id' })
  property: Property;
}
