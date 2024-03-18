/* eslint-disable prettier/prettier */
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
            throw new HttpException("This user doesn't exist", HttpStatus.NOT_FOUND)

        }
        return res
       /*  if (!checkUUID.test(id)) {
            throw new HttpException('Incorrect id', HttpStatus.BAD_REQUEST);
        }

       const res = tracks.find(p => {
            if (p?.id === id) {
                return p
            }
        })

        if (res) {
            return res
        } else {
            throw new HttpException("This track doesn't exist", HttpStatus.NOT_FOUND)
        } */
    }

   async createTrack(CreateTrackDto: CreateTrackDto) {
        try {
            const newTrack = await this.trackRepository.create(CreateTrackDto);
            return await this.trackRepository.save(newTrack);
          } catch (error) {
            throw new HttpException("Artist or Album doesn't exist", HttpStatus.NOT_FOUND);
          }

      /*   if((Object.keys(CreateTrackDto)).length >= 5 || (!CreateTrackDto.hasOwnProperty('name') ||
            !CreateTrackDto.hasOwnProperty('artistId') || !CreateTrackDto.hasOwnProperty('albumId') ||
            !CreateTrackDto.hasOwnProperty('duration')) || (typeof CreateTrackDto.name !== 'string' ||
            typeof CreateTrackDto.artistId !== 'string' && CreateTrackDto.artistId !== null ||
            typeof CreateTrackDto.albumId !== 'string' && CreateTrackDto.albumId !== null ||
            typeof CreateTrackDto.duration !== 'number')){
            throw new HttpException('Incorrect dates types', HttpStatus.BAD_REQUEST);
        }

        const track = ({
            id: uuidv4(),
            ...CreateTrackDto,

        })

        tracks.push(track)
        return track */
    }

   async updateTrackById(UpdateDataTrackDto:UpdateDataTrackDto,id: string) {
        const entity = await this.trackRepository.findOneBy({ id });
        if (!entity) {
            throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
        }
        for (const key in UpdateDataTrackDto) {
            if (Object.prototype.hasOwnProperty.call(UpdateDataTrackDto, key)) {
                const element = UpdateDataTrackDto[key];
                entity[key] = element;
            }
        }
        try {
            await this.trackRepository.update({ id }, UpdateDataTrackDto);
        } catch (error) {
            throw new HttpException("Artist or Album doesn't exist", HttpStatus.NOT_FOUND);
    }
        return entity;

        /* const allowedKeys = ['name', 'artistId', 'albumId', 'duration'];
        const keys = Object.keys(UpdateDataTrackDto);

        if (!checkUUID.test(id)) {
            throw new HttpException('Incorrect id', HttpStatus.BAD_REQUEST);
        }

        for (const key of keys) {
            if (!allowedKeys.includes(key) || (typeof UpdateDataTrackDto.name !== 'string' ||
            typeof UpdateDataTrackDto.artistId !== 'string' && UpdateDataTrackDto.artistId !== null ||
            typeof UpdateDataTrackDto.albumId !== 'string' && UpdateDataTrackDto.albumId !== null ||
            typeof UpdateDataTrackDto.duration !== 'number')) {
                throw new HttpException('Incorrect dates types', HttpStatus.BAD_REQUEST);
            }
        }

        const res = tracks.find(p => {
            if (p?.id === id) {
                for (const key in p) {
                    for (const key2 in UpdateDataTrackDto) {
                        if (key === key2) {
                            p[key] = UpdateDataTrackDto[key2]
                        }
                    }
                }
                return true
            }else{
                return false
            }
        })

        if (res) {
            return JSON.stringify({message:"Your track was successful changed!"})
            return "Your track was successful changed!"
        } else {
            throw new HttpException("This track doesn't exist", HttpStatus.NOT_FOUND)
        } */
    }

    async deleteTrack(id: string) {
        const deleteResult = await this.trackRepository.delete(id)

        if(deleteResult.affected === 0){
            throw new HttpException("This user doesn't track", HttpStatus.NOT_FOUND);
        }
        return
       /*  if (!checkUUID.test(id)) {
            throw new HttpException('Incorrect id', HttpStatus.BAD_REQUEST);
        }

        const res = tracks.findIndex(p => p?.id === id);


        if (res !== -1) {

            for (let i = 0; i < favs.length; i++) {
                if (favs[i]?.id === id) {
                    favs[i].id = null
                }
            }

            tracks.splice(res, 1);
            return JSON.stringify({message:'Track has been deleted'})
        } else {
            throw new HttpException("This track doesn't exist", HttpStatus.NOT_FOUND);
        } */
    }

}
