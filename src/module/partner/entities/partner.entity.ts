import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'partner',
})
export class Partner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'image_url' })
  imageUrl: string;
}
