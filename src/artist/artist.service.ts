import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateDataArtistDto } from './dto/update-data-artist.dto';
import { CreateArtistDto } from './dto/create-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async getAllArtists() {
    return await this.artistRepository.find();
  }

  async getArtistById(id: string) {
    const res = await this.artistRepository.findOneBy({ id });

    if (!res) {
      throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
      /* throw new HttpException("This artist doesn't exist", HttpStatus.NOT_FOUND) */
    }
    return res;
  }

  async createArtist(CreateArtistDto: CreateArtistDto) {
    const { name, grammy } = { ...CreateArtistDto };

    if (!name || !grammy) {
      throw new HttpException(`Record error`, HttpStatus.BAD_REQUEST);
    }

    const newArtist = this.artistRepository.create(CreateArtistDto);
    return await this.artistRepository.save(newArtist);
  }

  async updateArtistById(UpdateDataArtistDto: UpdateDataArtistDto, id: string) {
    const allowedKeys = ['name', 'grammy'];
    const keys = Object.keys(UpdateDataArtistDto);
    for (const key of keys) {
      if (
        !allowedKeys.includes(key) ||
        typeof UpdateDataArtistDto.name !== 'string' ||
        typeof UpdateDataArtistDto.grammy !== 'boolean'
      ) {
        throw new HttpException(
          'Incorrect dates types',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const entity = await this.artistRepository.findOneBy({ id });
    if (!entity) {
      throw new HttpException(
        `Record with id === ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    for (const key in UpdateDataArtistDto) {
      if (Object.prototype.hasOwnProperty.call(UpdateDataArtistDto, key)) {
        const element = UpdateDataArtistDto[key];
        entity[key] = element;
      }
    }
    await this.artistRepository.update({ id }, UpdateDataArtistDto);
    return entity;
  }

  async deleteArtist(id: string) {
    const { affected } = await this.artistRepository.delete(id);
    if (!affected) {
      throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
    }
    return;
  }
}
