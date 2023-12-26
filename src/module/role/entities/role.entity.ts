import { Permission } from 'src/module/premission/entities/premission.entity';
import { User } from 'src/module/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'roles',
})
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'role_name', nullable: true })
  roleName: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => Permission, (premission) => premission.role, {
    cascade: true,
  }) // specify inverse side as a second parameter
  premission: Permission[];

  @OneToMany(() => User, (user) => user.role) // specify inverse side as a second parameter
  user: User[];
}
