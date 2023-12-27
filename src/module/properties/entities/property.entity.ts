import { Member } from 'src/module/member/entities/member.entity';
import { PropertyFeature } from 'src/module/property-feature/entities/property-feature.entity';
import { Token } from 'src/module/token/entities/token.entity';
import { User } from 'src/module/users/entities/user.entity';
import { PropertyConstructStatus, PropertyStatus } from 'src/shared/enum/types';
import { BaseEntity } from 'src/shared/models/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

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

  @Column({ name: 'amount_sold', nullable: true })
  amountSold: string;

  @Column({
    type: 'enum',
    enum: PropertyStatus,
  })
  status: PropertyStatus;

  @Column({
    type: 'enum',
    enum: PropertyConstructStatus,
    nullable: true,
    default: PropertyConstructStatus.INCOMPLETE,
    name: 'construction_status',
  })
  constructionStatus: PropertyConstructStatus;

  @Column({ nullable: true, type: 'timestamptz', name: 'start_presale' })
  startPresale: Date;

  @Column({ nullable: true, type: 'timestamptz' })
  deadline: Date;

  @Column({ name: 'favorite', nullable: true })
  favorite: number;

  @Column({ name: 'Owners', nullable: true })
  Owners: string;

  @Column({ nullable: true })
  fragment: number;

  @Column({ name: 'link_doc', nullable: true })
  linkDoc: string;

  @Column({ name: 'about', nullable: true })
  about: string;

  @Column({ name: 'start_building', nullable: true, type: 'timestamptz' })
  startBuilding: Date;

  @Column({ name: 'end_building', nullable: true, type: 'timestamptz' })
  endBuilding: Date;

  @Column({ type: 'decimal', name: 'latitude', nullable: true })
  latitude: number;

  @Column({ type: 'decimal', name: 'longitude', nullable: true })
  longitude: number;

  @Column({ name: 'location_name', nullable: true })
  locationName: string;

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

  @Column({ name: 'token_price', nullable: true })
  tokenPrice: number;

  @Column()
  category: string;

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
