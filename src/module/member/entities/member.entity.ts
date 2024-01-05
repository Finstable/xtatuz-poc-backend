import { Property } from 'src/module/properties/entities/property.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  amount: string;

  @Column()
  propertiesId: string;

  @ManyToOne(() => Property, (property) => property.id)
  @JoinColumn({ name: 'propertyId', referencedColumnName: 'id' })
  property: Property;
}
