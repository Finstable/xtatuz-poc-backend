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

  @Column({ name: 'seller_type', nullable: false })
  sellerType: string;

  @Column({ name: 'country', nullable: false })
  country: string;

  @Column({ name: 'country_property', nullable: false })
  countryProperty: string;

  @Column({ name: 'email', type: 'text', nullable: false })
  email: string;

  @Column({ name: 'mobile_number', type: 'text', nullable: false })
  mobileNumber: string;

  @OneToOne(() => User, (user) => user.seller)
  user: User;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
