/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { base as mainBase } from "../../base";
import { UpdateDataArtistDto } from './dto/update-data-artist.dto';
import { CreateArtistDto } from './dto/create-artist.dto';

const tracks = mainBase.Tracks;
const albums = mainBase.Albums;
const favs = mainBase.Favorites.artists

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
            throw new HttpException("This artist doesn't exist", HttpStatus.NOT_FOUND)
        }
    }

    createArtist(CreateArtistDto: CreateArtistDto) {
        /* const users = mainBase.Users */
        if((Object.keys(CreateArtistDto)).length >= 3 || !CreateArtistDto.name ||
            !CreateArtistDto.grammy || typeof CreateArtistDto.name !== "string" ||
            typeof CreateArtistDto.grammy !== "boolean"){
            throw new HttpException('Incorrect dates types', HttpStatus.BAD_REQUEST);
        }

        const artist = ({
            id: uuidv4(),
            ...CreateArtistDto,
        })

        artists.push(artist)
        return artist
    }

    updateArtistById(UpdateDataArtistDto:UpdateDataArtistDto,id: string) {
        const allowedKeys = ['name', 'grammy'];
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

       /*  if((Object.keys(UpdateDataArtistDto)).length >= 3 || !UpdateDataArtistDto.name && !UpdateDataArtistDto.grammy ||
            typeof UpdateDataArtistDto.name !== "string" || typeof UpdateDataArtistDto.grammy !== "boolean" ){
            throw new HttpException('Incorrect dates types', HttpStatus.FORBIDDEN);
        } */

     /*    const res = artists.find(p => {
            if (p?.id === id) {
                return true
            }else{
                return false
            }
        }) */
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
            /* return res */ /* "The artist was successful changed!" */
        } else {
            throw new HttpException("This artist doesn't exist", HttpStatus.NOT_FOUND)
        }

       /*  return this.products.find(p => p.id === id) */
    }

     deleteArtist(id: string) {

        if (!checkUUID.test(id)) {
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
           /*  artists.splice(res, 1);
            return JSON.stringify({message:'Artist has been deleted'})
            return 'Artist has been deleted'; */
        } else {
            throw new HttpException("This artist doesn't exist", HttpStatus.NOT_FOUND);
        }
    }
}
