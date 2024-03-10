/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { base as mainBase } from "../../base";
import { UpdateDataArtistDto } from './dto/update-data-artist.dto';
import { CreateArtistDto } from './dto/create-artist.dto';


const artists = mainBase.Artists
const checkUUID = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

@Injectable()
export class ArtistService {
    getAllArtists() {
        return artists
    }

    getArtistById(id: string) {

        if (!checkUUID.test(id)) {
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
            throw new HttpException("This artist doesn't exist", HttpStatus.BAD_REQUEST)
        }
    }

    createArtist(CreateArtistDto: CreateArtistDto) {
        /* const users = mainBase.Users */
        if((Object.keys(CreateArtistDto)).length >= 3 || !CreateArtistDto.name && !CreateArtistDto.grammy || typeof CreateArtistDto.name !== "string" ||
            typeof CreateArtistDto.grammy !== "boolean"){
            throw new HttpException('Incorrect dates types', HttpStatus.BAD_REQUEST);
        }

        const artist = ({
            ...CreateArtistDto,
            id: uuidv4(),
        })

        artists.push(artist)
        return artist
    }

    updateArtistById(UpdateDataArtistDto:UpdateDataArtistDto,id: string) {

        if (!checkUUID.test(id)) {
            throw new HttpException('Incorrect id', HttpStatus.BAD_REQUEST);
        }

        if((Object.keys(UpdateDataArtistDto)).length >= 3 || !UpdateDataArtistDto.name && !UpdateDataArtistDto.grammy ||
            typeof UpdateDataArtistDto.name !== "string" || typeof UpdateDataArtistDto.grammy !== "boolean" ){
            throw new HttpException('Incorrect dates types', HttpStatus.FORBIDDEN);
        }

        const res = artists.find(p => {
            if (p?.id === id) {
                return true
            }else{
                return false
            }
        })

        if (res) {
            return "The artist was successful changed!"
        } else {
            throw new HttpException("This artist doesn't exist", HttpStatus.BAD_REQUEST)
        }

       /*  return this.products.find(p => p.id === id) */
    }

     deleteArtist(id: string) {

        if (!checkUUID.test(id)) {
            throw new HttpException('Incorrect id', HttpStatus.BAD_REQUEST);
        }

        const res = artists.findIndex(p => p?.id === id);


        if (res !== -1) {
            artists.splice(res, 1);
            return 'Artist has been deleted';
        } else {
            throw new HttpException("This artist doesn't exist", HttpStatus.BAD_REQUEST);
        }
    }
}
