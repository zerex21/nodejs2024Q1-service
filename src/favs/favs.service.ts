import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavsAlbum } from './entities/favsAlbum.entity';
import { FavsArtist } from './entities/favsArtist.entity';
import { FavsTrack } from './entities/favsTrack.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavsAlbum)
    private readonly favAlbumRepository: Repository<FavsAlbum>,
    @InjectRepository(FavsArtist)
    private readonly favArtistRepository: Repository<FavsArtist>,
    @InjectRepository(FavsTrack)
    private readonly favTrackRepository: Repository<FavsTrack>,
  ) {}

  async getAll() {
    const raw1 = await this.favAlbumRepository.find({
      relations: { album: true },
    });
    const albums = raw1.reduce((res, curr) => {
      res.push(curr.album);
      return res;
    }, []);

    const raw2 = await this.favArtistRepository.find({
      relations: { artist: true },
    });
    const artists = raw2.reduce((res, curr) => {
      res.push(curr.artist);
      return res;
    }, []);

    const raw3 = await this.favTrackRepository.find({
      relations: { track: true },
    });
    const tracks = raw3.reduce((res, curr) => {
      res.push(curr.track);
      return res;
    }, []);

    return { albums, artists, tracks };
  }

  async addTrack(id: string) {
    const track = this.favTrackRepository.create({ trackId: id });
    try {
      return await this.favTrackRepository.save(track);
    } catch (error) {
      throw new HttpException(`Record with id === ${id} doesn't exist`, 422);
    }
  }

  async deleteTrack(id: string) {
    const { affected } = await this.favTrackRepository.delete({ trackId: id });
    if (!affected) {
      throw new HttpException(
        `Record with id === ${id} doesn't exist in favorites`,
        404,
      );
    }
    return;
  }

  async addAlbum(id: string) {
    const album = this.favAlbumRepository.create({ albumId: id });
    try {
      return await this.favAlbumRepository.save(album);
    } catch (error) {
      throw new HttpException(`Record with id === ${id} doesn't exist`, 422);
    }
  }

  async deleteAlbum(id: string) {
    const { affected } = await this.favAlbumRepository.delete({ albumId: id });
    if (!affected) {
      throw new HttpException(
        `Record with id === ${id} doesn't exist in favorites`,
        404,
      );
    }
    return;
  }

  async addArtist(id: string) {
    const artist = this.favArtistRepository.create({ artistId: id });
    try {
      return await this.favArtistRepository.save(artist);
    } catch (error) {
      throw new HttpException(`Record with id === ${id} doesn't exist`, 422);
    }
  }

  async deleteArtist(id: string) {
    const { affected } = await this.favArtistRepository.delete({
      artistId: id,
    });
    if (!affected) {
      throw new HttpException(
        `Record with id === ${id} doesn't exist in favorites`,
        404,
      );
    }
    return;
  }
}