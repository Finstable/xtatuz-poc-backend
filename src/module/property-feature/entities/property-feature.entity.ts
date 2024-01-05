import { Property } from 'src/module/properties/entities/property.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class PropertyFeature {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  key: string;

  @Column()
  value: string;

  @Column()
  unit: string;

  @ManyToOne(() => Property, (property) => property.id) // specify inverse side as a second parameter
  @JoinColumn({ name: 'propertyId', referencedColumnName: 'id' })
  property: Property;
}
