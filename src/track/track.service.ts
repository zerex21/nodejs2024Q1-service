import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateDataTrackDto } from './dto/update-data-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { Repository } from 'typeorm';


@Injectable()
export class TrackService {
    constructor(
        @InjectRepository(Track)
        private readonly trackRepository: Repository<Track>,
      ) {}


    async getAllTracks() {
        return await this.trackRepository.find()
    }

    async getTrackById(id: string) {

        const res = await this.trackRepository.findOneBy({id})

        if(!res){
            /* throw new HttpException("This user doesn't exist", HttpStatus.NOT_FOUND) */
            throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
        }
        return res
    }

   async createTrack(CreateTrackDto: CreateTrackDto) {
        try {
            const newTrack = await this.trackRepository.create(CreateTrackDto);
            return await this.trackRepository.save(newTrack);
          } catch (error) {
            /* throw new HttpException("Artist or Album doesn't exist", HttpStatus.NOT_FOUND); */
            throw new HttpException(
                `May be artist or album with passed id doesn't exist`,
                404,
              );
          }
    }

   async updateTrackById(CreateTrackDto: CreateTrackDto,id: string) {
        const entity = await this.trackRepository.findOneBy({ id });
        if (!entity) {
            throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
        }
        for (const key in CreateTrackDto) {
            if (Object.prototype.hasOwnProperty.call(CreateTrackDto, key)) {
                const element = CreateTrackDto[key];
                entity[key] = element;
            }
        }
        try {
            await this.trackRepository.update({ id }, CreateTrackDto);
        } catch (error) {
           /*  throw new HttpException("Artist or Album doesn't exist", HttpStatus.NOT_FOUND); */
           throw new HttpException(
            `May be artist or album with passed id doesn't exist`,
            404,
          );
    }
        return entity;
    }

    async deleteTrack(id: string) {
        const { affected } = await this.trackRepository.delete(id)

        if (!affected){
            throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
            /* throw new HttpException("This user doesn't track", HttpStatus.NOT_FOUND); */
        }
        return
    }

}
