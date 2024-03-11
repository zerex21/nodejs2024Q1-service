/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { base as mainBase } from "../../base";
import { UpdateDataTrackDto } from './dto/update-data-track.dto';


interface Track {
    id: string; // uuid v4
    name: string;
    artistId: string | null; // refers to Artist
    albumId: string | null; // refers to Album
    duration: number; // integer number
  }

const tracks = mainBase.Tracks
const checkUUID = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

@Injectable()
export class TrackService {

    getAllTracks() {
        return tracks
    }

    getTrackById(id: string) {

        if (!checkUUID.test(id)) {
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
        }
    }

    createTrack(CreateTrackDto: CreateTrackDto) {
        /* const users = mainBase.Users */
        if((Object.keys(CreateTrackDto)).length >= 5 || (!CreateTrackDto.hasOwnProperty('name') ||
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
        return track
    }

    updateTrackById(UpdateDataTrackDto:UpdateDataTrackDto,id: string) {
        const allowedKeys = ['name', 'artistId', 'albumId', 'duration'];
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

       /*  if((typeof UpdateDataTrackDto.name !== 'string' ||
            typeof UpdateDataTrackDto.artistId !== 'string' && UpdateDataTrackDto.artistId !== null ||
            typeof UpdateDataTrackDto.albumId !== 'string' && UpdateDataTrackDto.albumId !== null ||
            typeof UpdateDataTrackDto.duration !== 'number')){
            throw new HttpException('Incorrect dates types', HttpStatus.FORBIDDEN);
        } */

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
        }

       /*  return this.products.find(p => p.id === id) */
    }

     deleteTrack(id: string) {

        if (!checkUUID.test(id)) {
            throw new HttpException('Incorrect id', HttpStatus.BAD_REQUEST);
        }

        const res = tracks.findIndex(p => p?.id === id);


        if (res !== -1) {
            tracks.splice(res, 1);
            return JSON.stringify({message:'Track has been deleted'})
            return 'Track has been deleted';
        } else {
            throw new HttpException("This track doesn't exist", HttpStatus.NOT_FOUND);
        }
    }

}
