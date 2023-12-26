import {
  CreateDateColumn,
  UpdateDateColumn,
  //   DeleteDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity as BaseEntityTypeOrm,
} from 'typeorm';

export abstract class BaseEntity extends BaseEntityTypeOrm {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}
