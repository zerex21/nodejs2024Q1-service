/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { base as mainBase } from "../../base";
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateDataAlbumDto } from './dto/update-data-ulbum.dto';

const albums = mainBase.Albums
const checkUUID = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i


@Injectable()
export class AlbumService {
    getAllAlbums() {
        return albums
    }

    getAlbumById(id: string) {

        if (!checkUUID.test(id)) {
            throw new HttpException('Incorrect id', HttpStatus.BAD_REQUEST);
        }

       const res = albums.find(p => {
            if (p?.id === id) {
                return p
            }
        })

        if (res) {
            return res
        } else {
            throw new HttpException("This album doesn't exist", HttpStatus.NOT_FOUND)
        }
    }

    createAlbum(CreateAlbumDto: CreateAlbumDto) {
        /* const users = mainBase.Users */
        if((Object.keys(CreateAlbumDto)).length >= 4 || (!CreateAlbumDto.hasOwnProperty('name') ||
        !CreateAlbumDto.hasOwnProperty('year') || !CreateAlbumDto.hasOwnProperty('artistId')) ||
        (typeof CreateAlbumDto.name !== 'string' || typeof CreateAlbumDto.year !== 'number' ||
        typeof CreateAlbumDto.artistId !== 'string' && CreateAlbumDto.artistId !== null )){
            throw new HttpException('Incorrect dates types', HttpStatus.BAD_REQUEST);
        }

        const album = ({
            id: uuidv4(),
            ...CreateAlbumDto,
        })

        albums.push(album)
        return album
    }

    updateAlbumById(UpdateDataAlbumDto:UpdateDataAlbumDto,id: string) {
        const allowedKeys = ['name', 'artistId', 'year'];
        const keys = Object.keys(UpdateDataAlbumDto);

        if (!checkUUID.test(id)) {
            throw new HttpException('Incorrect id', HttpStatus.BAD_REQUEST);
        }

        for (const key of keys) {
            if (!allowedKeys.includes(key) || (typeof UpdateDataAlbumDto.name !== 'string' ||
                typeof UpdateDataAlbumDto.year !== 'number' ||
                typeof UpdateDataAlbumDto.artistId !== 'string' && UpdateDataAlbumDto.artistId !== null )) {
                throw new HttpException('Incorrect dates types', HttpStatus.BAD_REQUEST);
            }
        }

        /* if((Object.keys(UpdateDataAlbumDto)).length >= 3 || !UpdateDataAlbumDto.name && !UpdateDataAlbumDto.artistId ||
            !UpdateDataAlbumDto.year ||typeof UpdateDataAlbumDto.name !== "string" ||
            typeof UpdateDataAlbumDto.artistId !== "string" || typeof UpdateDataAlbumDto.artistId !== null ||
            typeof UpdateDataAlbumDto.year !== "number"){
            throw new HttpException('Incorrect dates types', HttpStatus.BAD_REQUEST);
        } */

        /* const res = albums.find(p => {
            if (p?.id === id) {
                return true
            }else{
                return false
            }
        }) */
        const res = albums.find(p => {
            if (p?.id === id) {
                for (const key in p) {
                    for (const key2 in UpdateDataAlbumDto) {
                        if (key === key2) {
                            p[key] = UpdateDataAlbumDto[key2]
                        }
                    }
                }
                return true
            }else{
                return false
            }
        })
        if (res) {
            return JSON.stringify({message:"Your album was successful changed!"}) /* "Your album was successful changed!" */
        } else {
            throw new HttpException("This album doesn't exist", HttpStatus.NOT_FOUND)
        }

       /*  return this.products.find(p => p.id === id) */
    }

     deleteAlbum(id: string) {

        if (!checkUUID.test(id)) {
            throw new HttpException('Incorrect id', HttpStatus.BAD_REQUEST);
        }

        const res = albums.findIndex(p => p?.id === id);


        if (res !== -1) {
            albums.splice(res, 1);
            return 'Album has been deleted';
        } else {
            throw new HttpException("This album doesn't exist", HttpStatus.NOT_FOUND);
        }
    }
}
