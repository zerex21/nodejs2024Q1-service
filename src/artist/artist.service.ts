/* eslint-disable prettier/prettier */
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
        return this.artistRepository.find()
    }

    async getArtistById(id: string) {

        const res = await this.artistRepository.findOneBy({id})

        if(!res){
            throw new HttpException("This artist doesn't exist", HttpStatus.NOT_FOUND)

        }
        return res

       /*  if (!checkUUID.test(id)) {
            throw new HttpException('Incorrect id', HttpStatus.BAD_REQUEST);
        }

       const res = artists.find(p => {
            if (p?.id === id) {
                return p
            }
        })

        if (res) {
            return res
        } else {
            throw new HttpException("This artist doesn't exist", HttpStatus.NOT_FOUND)
        } */
    }

    async createArtist(CreateArtistDto: CreateArtistDto) {

        const newArtist = this.artistRepository.create(CreateArtistDto);
        return await this.artistRepository.save(newArtist);
        /* if((Object.keys(CreateArtistDto)).length >= 3 || !CreateArtistDto.name ||
            !CreateArtistDto.grammy || typeof CreateArtistDto.name !== "string" ||
            typeof CreateArtistDto.grammy !== "boolean"){
            throw new HttpException('Incorrect dates types', HttpStatus.BAD_REQUEST);
        }

        const artist = ({
            id: uuidv4(),
            ...CreateArtistDto,
        })

        artists.push(artist)
        return artist */
    }

    async updateArtistById(UpdateDataArtistDto:UpdateDataArtistDto,id: string) {
        const entity = await this.artistRepository.findOneBy({ id });
    if (!entity) {
      throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
    }
    for (const key in UpdateDataArtistDto) {
      if (Object.prototype.hasOwnProperty.call(UpdateDataArtistDto, key)) {
        const element = UpdateDataArtistDto[key];
        entity[key] = element;
      }
    }
    await this.artistRepository.update({ id }, UpdateDataArtistDto);
    return entity;

        /* const allowedKeys = ['name', 'grammy'];
        const keys = Object.keys(UpdateDataArtistDto);

        if (!checkUUID.test(id)) {
            throw new HttpException('Incorrect id', HttpStatus.BAD_REQUEST);
        }

        for (const key of keys) {
            if (!allowedKeys.includes(key) || (typeof UpdateDataArtistDto.name !== 'string' ||
                typeof UpdateDataArtistDto.grammy !== 'boolean')) {
                throw new HttpException('Incorrect dates types', HttpStatus.BAD_REQUEST);
            }
        }

        const res = artists.find(p => {
            if (p?.id === id) {
                for (const key in p) {
                    for (const key2 in UpdateDataArtistDto) {
                        if (key === key2) {
                            p[key] = UpdateDataArtistDto[key2]
                        }
                    }
                }
                return true
            }else{
                return false
            }
        })

        if (res) {
            return JSON.stringify({message:"The artist was successful changed!"})

        } else {
            throw new HttpException("This artist doesn't exist", HttpStatus.NOT_FOUND)
        } */


    }

    async deleteArtist(id: string) {
        const { affected } = await this.artistRepository.delete(id);
        if (!affected) {
          throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
        }
        return;
        /* const deleteResult = await this.artistRepository.delete(id)

        if(deleteResult.affected === 0){
            throw new HttpException("This artist doesn't track", HttpStatus.NOT_FOUND);
        }
        return */
       /*  if (!checkUUID.test(id)) {
            throw new HttpException('Incorrect id', HttpStatus.BAD_REQUEST);
        }

        const res = artists.findIndex(p => p?.id === id);


        if (res !== -1) {
            tracks.forEach(track => {
                if (track.artistId === id) {
                    track.artistId = null;
                }
            });
            albums.forEach(album => {
                if (album.artistId === id) {
                    album.artistId = null;
                }
            });
            for (let i = 0; i < favs.length; i++) {
                if (favs[i]?.id === id) {
                    favs[i].id = null
                }
            }

            artists.splice(res, 1);

            return { message: 'Artist has been deleted' };
        } else {
            throw new HttpException("This artist doesn't exist", HttpStatus.NOT_FOUND);
        } */
    }
}
