import { User } from 'src/module/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'seller',
})
export class Seller {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'sellerType', nullable: false })
  sellerType: string;

  @Column({ name: 'country', nullable: false })
  country: string;

  @Column({ name: 'countryProperty', nullable: false })
  countryProperty: string;

  @Column({ name: 'email', type: 'text', nullable: false })
  email: string;

  @Column({ name: 'mobileNumber', type: 'text', nullable: false })
  mobileNumber: string;

  @OneToOne(() => User, (user) => user.seller)
  user: User;

  @CreateDateColumn({ name: 'createdAt', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamptz' })
  updatedAt: Date;
}
