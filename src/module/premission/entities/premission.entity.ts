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

  @Column({ name: 'permission_name', nullable: true })
  permissionName: string;

  @ManyToOne(() => Role, (role) => role, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: Role;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
