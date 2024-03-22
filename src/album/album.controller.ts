import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, Header, ParseUUIDPipe, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateDataAlbumDto } from './dto/update-data-ulbum.dto';


@UseInterceptors(ClassSerializerInterceptor)
@Controller('album')
export class AlbumController {
    constructor(private readonly albumService: AlbumService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/json')
    async getAll(){
        return await this.albumService.getAllAlbums()
    }


    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/json')
    async getAlbumById(@Param('id', new ParseUUIDPipe()) userId:string){
        return await this.albumService.getAlbumById(userId)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Content-Type', 'application/json')
    async createAlbum(@Body() CreateAlbumDto:CreateAlbumDto){
        return await this.albumService.createAlbum(CreateAlbumDto)
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/json')
    async updateAlbumById(@Body() UpdateDataAlbumDto: UpdateDataAlbumDto, @Param('id', new ParseUUIDPipe()) userId:string){
        return await this.albumService.updateAlbumById(UpdateDataAlbumDto,userId)
    }


    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Header('Content-Type', 'application/json')
    async removeAlbum(@Param('id', new ParseUUIDPipe()) userId:string){
        return await (this.albumService.deleteAlbum(userId))
    }
}
