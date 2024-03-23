import { Album } from 'src/album/entities/album.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('favorites_album')
export class FavsAlbum {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'album_id', type: 'uuid' })
  albumId: string | null;

  @ManyToOne(() => Album, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'album_id', referencedColumnName: 'id' })
  album: Album;
}
