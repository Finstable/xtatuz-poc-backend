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

  @CreateDateColumn({ name: 'createdAt', type: 'timestamptz' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamptz' })
  updatedAt?: Date;
}
