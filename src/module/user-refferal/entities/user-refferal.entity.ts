import { User } from 'src/module/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserRefferal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'code', unique: true })
  code: string;

  @Column({ name: 'commission_rate' })
  commissionRate: string;

  @Column({ name: 'cashback_rate' })
  cashbackRate: string;

  @ManyToOne(() => User, (user) => user.userRefferal)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'partner_id', nullable: true })
  partnerId: string;
}
