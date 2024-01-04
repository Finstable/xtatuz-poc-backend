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

@Entity({ name: 'near_location' })
export class NearLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'location_name', nullable: true })
  locationName: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'decimal', nullable: true })
  distance: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt?: Date;

  @ManyToOne(() => Property, (property) => property.id) // specify inverse side as a second parameter
  @JoinColumn({ name: 'property_id', referencedColumnName: 'id' })
  property: Property;
}
