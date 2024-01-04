import {
  CreateDateColumn,
  UpdateDateColumn,
  //   DeleteDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity as BaseEntityTypeOrm,
} from 'typeorm';

export abstract class BaseEntity extends BaseEntityTypeOrm {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt?: Date;
}
