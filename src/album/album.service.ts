import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateDataAlbumDto } from './dto/update-data-ulbum.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';

@Injectable()
export class AlbumService {

    constructor(
        @InjectRepository(Album)
        private readonly albumRepository: Repository<Album>,
        @InjectRepository(Artist)
        private readonly artistRepository: Repository<Artist>,
      ) {}


    async getAllAlbums() {
        return await this.albumRepository.find()
    }

    async getAlbumById(id: string) {

        const res = await this.albumRepository.findOneBy({id})

        if(!res){
            throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
          /*   throw new HttpException("This album doesn't exist", HttpStatus.NOT_FOUND) */

        }
        return res
    }

    async createAlbum(CreateAlbumDto: CreateAlbumDto) {

        try {
            const newAlbum = this.albumRepository.create(CreateAlbumDto);
            return await this.albumRepository.save(newAlbum);
          } catch (error) {
            throw new HttpException(`May be artist with id === ${CreateAlbumDto.artistId} doesn't exist`,404,);
            /* throw new HttpException("This artist with id doesn't exist", HttpStatus.NOT_FOUND); */
          }
    }

    async updateAlbumById(UpdateDataAlbumDto:UpdateDataAlbumDto,id: string) {
       const entity = await this.albumRepository.findOneBy({ id });
    if (!entity) {
        throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
       /*  throw new HttpException("This artist with id doesn't exist", HttpStatus.NOT_FOUND); */
    }
    for (const key in UpdateDataAlbumDto) {
      if (Object.prototype.hasOwnProperty.call(UpdateDataAlbumDto, key)) {
        const element = UpdateDataAlbumDto[key];
        entity[key] = element;
      }
    }
    try {
      await this.albumRepository.update({ id }, UpdateDataAlbumDto);
    } catch (error) {
        throw new HttpException(
            `May be artist with passed id doesn't exist`,
            404,
          );
        /* throw new HttpException("This artist with id doesn't exist", HttpStatus.NOT_FOUND); */
    }
    return entity;

    }

    async deleteAlbum(id: string) {
        const { affected } = await this.albumRepository.delete(id)

        if (!affected){
            throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
          /*   throw new HttpException("This album doesn't track", HttpStatus.NOT_FOUND); */
        }
        return
    }
}
