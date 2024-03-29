import { ApiProperty } from '@nestjs/swagger';
import { Artist } from 'src/artist/entities/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('album')
export class Album {
  @ApiProperty({ description: 'uuid v4', format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'album name', example: 'Innuendo' })
  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @ApiProperty({ description: 'released', example: 1990 })
  @Column({ name: 'year', type: 'int' })
  year: number;

  @ApiProperty({ description: 'refers to Artist', format: 'uuid' })
  @Column({ name: 'artist_id', type: 'uuid', default: null })
  artistId: string | null;

  @ManyToOne(() => Artist, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artist_id', referencedColumnName: 'id' })
  artist: Artist;
}
