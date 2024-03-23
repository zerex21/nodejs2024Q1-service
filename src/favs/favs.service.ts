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
                 return JSON.stringify({message:`sdf ${name}:${p} was add in favorites ${name}`})
                 return true
               /*  return (`sdf ${name}:${p} was add in favorites ${name}`) */
            }
        })

        if (res) {
            return res
        } else {
            throw new HttpException(`This ${name} doesn't exist`, HttpStatus.UNPROCESSABLE_ENTITY)
        }
    }

    removeItemFromFavs(item,id,type,name){
        return favs[type] = favs[type].filter(track => track?.id !== id);/***************************************** */

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
                return this.addItemInFavs(tracks,id,"tracks","track")
            case "album":
                return this.addItemInFavs(albums,id,"albums","album")
            case "artist":
                return this.addItemInFavs(artists,id,"artists","artist")
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
                return this.removeItemFromFavs(tracks,id,"tracks","track")
            case "album":
                return this.removeItemFromFavs(albums,id,"albums","album")
            case "artist":
                return this.removeItemFromFavs(artists,id,"artists","artist")
            default:
                throw new HttpException('Incorrect path', HttpStatus.BAD_REQUEST);
        }
    }
}
