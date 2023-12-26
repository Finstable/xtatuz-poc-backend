import { Property } from 'src/module/properties/entities/property.entity';
import { CategoryStatus } from 'src/shared/enum/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({
  name: 'categories',
})
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'category_name', nullable: false })
  categoryName: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: CategoryStatus,
    nullable: false,
    default: CategoryStatus.ACTIVE,
  })
  status: CategoryStatus;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'image', nullable: false })
  image: string;

  @Column({ name: 'logo_img', nullable: true })
  logo_img: string;

  @Column({ name: 'cover_image', nullable: true })
  cover_image: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => Property, (property) => property.category) // specify inverse side as a second parameter
  property: Property[];
}
