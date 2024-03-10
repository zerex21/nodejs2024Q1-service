/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateDataAlbumDto } from './dto/update-data-ulbum.dto';



@Controller('album')
export class AlbumController {
    constructor(private readonly albumService: AlbumService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    getAll(){
        return this.albumService.getAllAlbums()
    }


    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getAlbumById(@Param('id') userId:string){
        return  this.albumService.getAlbumById(userId)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createAlbum(@Body() CreateAlbumDto:CreateAlbumDto){
        return this.albumService.createAlbum(CreateAlbumDto)
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    updateAlbumById(@Body() UpdateDataAlbumDto: UpdateDataAlbumDto, @Param('id') userId:string){
        return this.albumService.updateAlbumById(UpdateDataAlbumDto,userId)
    }


    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    removeAlbum(@Param('id') userId:string){
        return (this.albumService.deleteAlbum(userId))
    }
}
