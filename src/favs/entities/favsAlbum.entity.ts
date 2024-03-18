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

    @Column()
    albumId: string | null;

    @ManyToOne(() => Album, { onDelete: 'CASCADE' })
    @JoinColumn()
    album: Album;
  }