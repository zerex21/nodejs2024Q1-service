import { Artist } from 'src/artist/entities/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('favorites_artist')
export class FavsArtist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  artistId: string | null;

  @ManyToOne(() => Artist, { onDelete: 'CASCADE' })
  @JoinColumn()
  artist: Artist;
}