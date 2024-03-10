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
            throw new HttpException("This track doesn't exist", HttpStatus.BAD_REQUEST)
        }
    }

    createTrack(CreateTrackDto: CreateTrackDto) {
        /* const users = mainBase.Users */
        if((Object.keys(CreateTrackDto)).length >= 5 || !CreateTrackDto.name && !CreateTrackDto.artistId &&
            !CreateTrackDto.albumId && !CreateTrackDto.duration || typeof CreateTrackDto.name !== "string" ||
            typeof CreateTrackDto.artistId !== "string" || typeof CreateTrackDto.artistId !== null ||
            typeof CreateTrackDto.albumId !== "string" || typeof CreateTrackDto.albumId !== null ||
            typeof CreateTrackDto.duration !== "number" ){
            throw new HttpException('Incorrect dates types', HttpStatus.BAD_REQUEST);
        }

        const track = ({
            ...CreateTrackDto,
            id: uuidv4(),
        })

        tracks.push(track)
        return track
    }

    updateTrackById(UpdateDataTrackDto:UpdateDataTrackDto,id: string) {

        if (!checkUUID.test(id)) {
            throw new HttpException('Incorrect id', HttpStatus.BAD_REQUEST);
        }

        if((Object.keys(UpdateDataTrackDto)).length >= 5 || !UpdateDataTrackDto.name && !UpdateDataTrackDto.artistId ||
            !UpdateDataTrackDto.albumId && !UpdateDataTrackDto.duration ||typeof UpdateDataTrackDto.name !== "string" ||
            typeof UpdateDataTrackDto.artistId !== "string" || typeof UpdateDataTrackDto.artistId !== null ||
            typeof UpdateDataTrackDto.albumId !== "string" || typeof UpdateDataTrackDto.albumId !== null ||
            typeof UpdateDataTrackDto.duration !== "number"){
            throw new HttpException('Incorrect dates types', HttpStatus.FORBIDDEN);
        }

        const res = tracks.find(p => {
            if (p?.id === id) {
                return true
            }else{
                return false
            }
        })

        if (res) {
            return "Your track was successful changed!"
        } else {
            throw new HttpException("This track doesn't exist", HttpStatus.BAD_REQUEST)
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
            return 'Track has been deleted';
        } else {
            throw new HttpException("This track doesn't exist", HttpStatus.BAD_REQUEST);
        }
    }

}
