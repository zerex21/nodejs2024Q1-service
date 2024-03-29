import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('track')
export class Track {
  @ApiProperty({ description: 'uuid v4', format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'track name', example: 'The Show Must Go On' })
  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @ApiProperty({ description: 'refers to Artist', format: 'uuid' })
  @Column({ name: 'duration', type: 'int' })
  duration: number;

  @ApiProperty({ description: 'refers to Album', format: 'uuid' })
  @Column({ name: 'artist_id', type: 'uuid', default: null })
  artistId: string | null;

  @ApiProperty({ description: 'track duration', example: 262 })
  @Column({ name: 'album_id', type: 'uuid', default: null })
  albumId: string | null;

  @ManyToOne(() => Artist, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artist_id', referencedColumnName: 'id' })
  artist: Artist;

  @ManyToOne(() => Album, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'album_id', referencedColumnName: 'id' })
  album: Album;
}
