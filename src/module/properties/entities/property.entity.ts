import { Member } from 'src/module/member/entities/member.entity';
import { PropertyFeature } from 'src/module/property-feature/entities/property-feature.entity';
import { Token } from 'src/module/token/entities/token.entity';
import { User } from 'src/module/users/entities/user.entity';
import { PropertyStatus } from 'src/shared/enum/types';
import { BaseEntity } from 'src/shared/models/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Financial } from './financial.entity';
import { NearLocation } from './near_location.entity';

@Entity({ name: 'property' })
export class Property extends BaseEntity {
  @Column({ nullable: true })
  propertyName: string;

  @Column({ name: 'user_id', nullable: true })
  userId: string;

  @Column('text', {
    array: true,
    default: {},
  })
  img: string[];

  @Column()
  issuer: string;

  @Column({ name: 'underlying_asset', nullable: true })
  underlyingAsset: string;

  @OneToOne(() => Financial, (financial) => financial.property)
  @JoinColumn({ name: 'financial_id', referencedColumnName: 'id' })
  financial: Financial;

  @Column({
    type: 'enum',
    enum: PropertyStatus,
  })
  status: PropertyStatus;

  @Column({ name: 'total_raise', nullable: true })
  totalRaise: number;

  @Column({ nullable: true, type: 'timestamptz', name: 'start_presale' })
  startPresale: Date;

  @Column({ name: 'total_supply', nullable: true })
  totalSupply: number;

  @Column({ name: 'link_doc', nullable: true })
  linkDoc: string;

  @Column({ name: 'detail', nullable: true })
  detail: string;

  @Column({ type: 'decimal', name: 'latitude', nullable: true })
  latitude: number;

  @Column({ type: 'decimal', name: 'longitude', nullable: true })
  longitude: number;

  @Column({ name: 'location_name', nullable: true })
  locationName: string;

  @OneToMany(() => NearLocation, (id) => id.property)
  nearLocation: NearLocation[];

  @Column({ name: 'onchain_id', nullable: true })
  onchainId: string;

  @Column({ nullable: true })
  note: string;

  @Column({ name: 'address_property', nullable: true })
  addressProperty: string;

  @Column({ name: 'city', nullable: true })
  city: string;

  @Column({ name: 'country', nullable: true })
  country: string;

  @Column({ name: 'token_price', nullable: true }) //price_per_token
  tokenPrice: number;

  @OneToMany(() => PropertyFeature, (id) => id.property)
  propertyFeatures: PropertyFeature[];

  @ManyToOne(() => Token)
  @JoinColumn({ name: 'token_id', referencedColumnName: 'id' })
  token: Token;

  @OneToMany(() => Member, (id) => id.property)
  member: Member[];

  @ManyToMany(
    () => User,
    (user) => user.properties, //optional
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinTable({
    name: 'propperty_subscribe',
    joinColumn: {
      name: 'property_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users?: User[];
}
