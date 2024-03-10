/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateDataArtistDto } from './dto/update-data-artist.dto';

@Controller('artist')
export class ArtistController {
    constructor(private readonly artistService: ArtistService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    getAll(){
        return this.artistService.getAllArtists()
    }


    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getArtistById(@Param('id') userId:string){
        return  this.artistService.getArtistById(userId)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createArtist(@Body() CreateArtistDto:CreateArtistDto){
        return this.artistService.createArtist(CreateArtistDto)
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    updateArtistById(@Body() UpdateDataArtistDto: UpdateDataArtistDto, @Param('id') userId:string){
        return this.artistService.updateArtistById(UpdateDataArtistDto,userId)
    }


    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    removeArtist(@Param('id') userId:string){
        return (this.artistService.deleteArtist(userId))
    }
}
