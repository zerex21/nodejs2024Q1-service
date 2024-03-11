/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { base as mainBase } from "../../base";

const favs = mainBase.Favorites
const artists = mainBase.Artists
const albums = mainBase.Albums
const tracks = mainBase.Tracks

const checkUUID = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

@Injectable()
export class FavsService {

    addItemInFavs(item,id,type,name){
        const res = item.find(p => {
            if (p?.id === id) {
                favs[type].push(p)
                return (`This ${name}:${p} was add in favorites ${name}`)
            }
        })

        if (res) {
            return res
        } else {
            throw new HttpException(`This ${name} doesn't exist`, HttpStatus.UNPROCESSABLE_ENTITY)
        }
    }

    removeItemFromFavs(item,id,type,name){
        const res = item.findIndex(p => p?.id === id);


        if (res !== -1) {
            favs[type].splice(res, 1);
            return (`This ${name}:${res} was delete from favorites ${name}`)
        } else {
            throw new HttpException(`This ${name} doesn't exist`, HttpStatus.NOT_FOUND);
        }
    }

    getAllFavs() {
        return favs
    }

    addFavsById(type:string ,id: string) {
        if (!checkUUID.test(id)) {
            throw new HttpException('Incorrect id', HttpStatus.BAD_REQUEST);
        }

        switch (type){
            case "track":
                this.addItemInFavs(tracks,id,"tracks","track")
            break
            case "album":
                this.addItemInFavs(albums,id,"albums","album")
            break
            case "artist":
                this.addItemInFavs(artists,id,"artists","artist")
            break
            default:
                throw new HttpException('Incorrect path', HttpStatus.BAD_REQUEST);

        }

    }

    deleteFavsById(type:string,id: string) {

        if (!checkUUID.test(id)) {
            throw new HttpException('Incorrect id', HttpStatus.BAD_REQUEST);
        }

        switch (type){
            case "track":
                this.removeItemFromFavs(tracks,id,"tracks","track")
            break
            case "album":
                this.removeItemFromFavs(albums,id,"albums","album")
            break
            case "artist":
                this.removeItemFromFavs(artists,id,"artists","artist")
            break
            default:
                throw new HttpException('Incorrect path', HttpStatus.BAD_REQUEST);

        }

    }

    /* createArtist(CreateArtistDto: CreateArtistDto) {

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
    } */

    /* updateArtistById(UpdateDataArtistDto:UpdateDataArtistDto,id: string) {
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
        } */

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
        /* const res = artists.find(p => {
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
            return "The artist was successful changed!"
        } else {
            throw new HttpException("This artist doesn't exist", HttpStatus.NOT_FOUND)
        }


    } */


}
