import { Exclude } from 'class-transformer';

export class FavsEntity {
  albumId?: string;
  artistId?: string;
  trackId?: string;

  @Exclude()
  id: number;

  constructor(partial: Partial<FavsEntity>) {
    Object.assign(this, partial);
  }
}