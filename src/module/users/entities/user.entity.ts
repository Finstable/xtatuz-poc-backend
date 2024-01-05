import { Profile } from 'src/module/profile/entities/profile.entity';
import { Property } from 'src/module/properties/entities/property.entity';
import { Role } from 'src/module/role/entities/role.entity';
import { Seller } from 'src/module/seller/entities/seller.entity';
import { BaseEntity } from 'src/shared/models/base.entity';
import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ name: 'walletAddress' })
  walletAddress: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn({ name: 'profileId', referencedColumnName: 'id' })
  profile: Profile;

  @OneToOne(() => Seller, (seller) => seller.user)
  @JoinColumn({ name: 'sellerId', referencedColumnName: 'id' })
  seller: Seller;

  @ManyToMany(() => Role)
  @JoinTable({ name: 'userRole' })
  role: Role[];

  @ManyToMany(() => Property, (property) => property.users)
  properties?: Property[];
}
