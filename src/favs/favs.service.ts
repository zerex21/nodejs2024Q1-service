/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { base as mainBase } from "../../base";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavsAlbum } from './entities/favsAlbum.entity';
import { FavsArtist } from './entities/favsArtist';
import { FavsTrack } from './entities/favsTrack';

/* const favs = mainBase.Favorites
const artists = mainBase.Artists
const albums = mainBase.Albums
const tracks = mainBase.Tracks */

const checkUUID = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

@Injectable()
export class FavsService {

    constructor(
        @InjectRepository(FavsAlbum)
        private readonly favAlbumRepository: Repository<FavsAlbum>,
        @InjectRepository(FavsArtist)
        private readonly favArtistRepository: Repository<FavsArtist>,
        @InjectRepository(FavsTrack)
        private readonly favTrackRepository: Repository<FavsTrack>,
      ) {}

    /* addItemInFavs(item,id,type,name){
        const res = item.find(p => {
            if (p?.id === id) {
                 favs[type].push(p)
                 return JSON.stringify({message:`sdf ${name}:${p} was add in favorites ${name}`})
            }
        })

        if (res) {
            return res
        } else {
            throw new HttpException(`This ${name} doesn't exist`, HttpStatus.UNPROCESSABLE_ENTITY)
        }
    }
 */
   async removeItemFromFavs(item,id,name){

    let favs;

    switch(item){
        case "track":
            favs = this.favTrackRepository.delete({ trackId: id });
        break
        case "album":
            favs = this.favAlbumRepository.delete({ albumId: id });;
        break
        case "artist":
            favs = this.favArtistRepository.create({ artistId: id });
        break
    }

    const { affected } = await favs

    if (!affected) {
        throw new HttpException(`Record with id doesn't exist in ${name}`, HttpStatus.NOT_FOUND);
    }
    return;

    }

    async getAllFavs() {
        const getAlbums = await this.favAlbumRepository.find({
            relations: { album: true },
          });
          const albums = getAlbums.reduce((res, curr) => {
            res.push(curr.album);
            return res;
          }, []);

          const geArtists = await this.favArtistRepository.find({
            relations: { artist: true },
          });
          const artists = geArtists.reduce((res, curr) => {
            res.push(curr.artist);
            return res;
          }, []);

          const getTracks = await this.favTrackRepository.find({
            relations: { track: true },
          });
          const tracks = getTracks.reduce((res, curr) => {
            res.push(curr.track);
            return res;
          }, []);

          return { albums, artists, tracks };
    }

   async addFavsById(type:string ,id: string) {
        if (!checkUUID.test(id)) {
            throw new HttpException('Incorrect id', HttpStatus.BAD_REQUEST);
        }

        switch (type){
            case "track":
                const track = this.favTrackRepository.create({ trackId: id });
                try {
                  return await this.favTrackRepository.save(track);
                } catch (error) {
                  throw new HttpException(`Record with id doesn't exist`, HttpStatus.UNPROCESSABLE_ENTITY);
                }
            case "album":
                const album = this.favAlbumRepository.create({ albumId: id });
                try {
                  return await this.favAlbumRepository.save(album);
                } catch (error) {
                  throw new HttpException(`Record with id doesn't exist`, HttpStatus.UNPROCESSABLE_ENTITY);
                }
            case "artist":
                const artist = this.favArtistRepository.create({ artistId: id });
                try {
                  return await this.favArtistRepository.save(artist);
                } catch (error) {
                  throw new HttpException(`Record with id doesn't exist`, HttpStatus.UNPROCESSABLE_ENTITY);
                }
            default:
                throw new HttpException('Incorrect path', HttpStatus.BAD_REQUEST);
        }
    }

    deleteFavsById(type:string,id: string) {

/*         if (!checkUUID.test(id)) {
            throw new HttpException('Incorrect id', HttpStatus.BAD_REQUEST);
        } */

        switch (type){
            case "track":
                return this.removeItemFromFavs("track",id,"tracks")
            case "album":
                return this.removeItemFromFavs("album",id,"albums")
            case "artist":
                return this.removeItemFromFavs("artist",id,"artists")
            default:
                throw new HttpException('Incorrect path', HttpStatus.BAD_REQUEST);
        }
    }
}
