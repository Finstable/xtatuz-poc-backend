import { Member } from 'src/module/member/entities/member.entity';
import { PropertyFeature } from 'src/module/property-feature/entities/property-feature.entity';
import { Token } from 'src/module/token/entities/token.entity';
import { User } from 'src/module/users/entities/user.entity';
import {
  PropertyConstructStatus,
  PropertyStatus,
  PropertyType,
} from 'src/shared/enum/types';
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

  @Column({ name: 'userId', nullable: true })
  userId: string;

  @Column('text', {
    array: true,
    default: {},
  })
  img: string[];

  @Column({ nullable: true })
  issuer: string;

  @Column({ name: 'underlyingAsset', nullable: true })
  underlyingAsset: string;

  @OneToOne(() => Financial, (financial) => financial.property)
  @JoinColumn({ name: 'financialId', referencedColumnName: 'id' })
  financial: Financial;

  @Column({
    type: 'enum',
    enum: PropertyStatus,
  })
  status: PropertyStatus;

  @Column({ name: 'totalRaise', nullable: true })
  totalRaise: number;

  @Column({ nullable: true, type: 'timestamptz', name: 'startPresale' })
  startPresale: Date;

  @Column({ name: 'totalSupply', nullable: true })
  totalSupply: number;

  @Column({ name: 'linkDoc', nullable: true })
  linkDoc: string;

  @Column({ name: 'detail', nullable: true })
  detail: string;

  @Column({ type: 'decimal', name: 'latitude', nullable: true })
  latitude: number;

  @Column({ type: 'decimal', name: 'longitude', nullable: true })
  longitude: number;

  @Column({ name: 'locationName', nullable: true })
  locationName: string;

  @OneToMany(() => NearLocation, (id) => id.property)
  nearLocation: NearLocation[];

  @Column({ name: 'onchainId', nullable: true })
  onchainId: string;

  @Column({ nullable: true })
  note: string;

  @Column({ name: 'addressProperty', nullable: true })
  addressProperty: string;

  @Column({ name: 'city', nullable: true })
  city: string;

  @Column({ name: 'country', nullable: true })
  country: string;

  @Column({ nullable: true })
  type: PropertyType;

  @Column({ nullable: true })
  propertyConstructStatus: PropertyConstructStatus;

  @Column({ name: 'tokenPrice', nullable: true }) //price_per_token
  tokenPrice: number;

  @OneToMany(() => PropertyFeature, (id) => id.property)
  propertyFeatures: PropertyFeature[];

  @ManyToOne(() => Token)
  @JoinColumn({ name: 'tokenId', referencedColumnName: 'id' })
  token: Token;

  @OneToMany(() => Member, (id) => id.property)
  member: Member[];

  @ManyToMany(
    () => User,
    (user) => user.properties, //optional
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinTable({
    name: 'proppertySubscribe',
    joinColumn: {
      name: 'propertyId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
  })
  users?: User[];
}
