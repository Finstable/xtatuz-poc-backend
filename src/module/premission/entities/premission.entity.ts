import { Role } from 'src/module/role/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity({
  name: 'premissions',
})
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'permissionName', nullable: true })
  permissionName: string;

  @ManyToOne(() => Role, (role) => role, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'roleId', referencedColumnName: 'id' })
  role: Role;

  @CreateDateColumn({ name: 'createdAt', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamptz' })
  updatedAt: Date;
}
