import { User } from 'src/module/users/entities/user.entity';
import { BaseEntity } from 'src/shared/models/base.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity({ name: 'profile' })
export class Profile extends BaseEntity {
  @Column({ name: 'userName', nullable: true })
  userName: string;

  @Column({ name: 'email', type: 'text', nullable: true })
  email: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
