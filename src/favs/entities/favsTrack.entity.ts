import { Track } from 'src/track/entities/track.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('favorites_track')
export class FavsTrack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'track_id', type: 'uuid' })
  trackId: string | null;

  @ManyToOne(() => Track, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'track_id', referencedColumnName: 'id' })
  track: Track;
}
