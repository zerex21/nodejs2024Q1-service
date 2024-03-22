import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, Header, ParseUUIDPipe, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateDataArtistDto } from './dto/update-data-artist.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('artist')
export class ArtistController {
    constructor(private readonly artistService: ArtistService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/json')
    async getAll(){
        return this.artistService.getAllArtists()
    }


    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/json')
    async getArtistById(@Param('id', new ParseUUIDPipe()) userId:string){
        return await this.artistService.getArtistById(userId)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Content-Type', 'application/json')
    async createArtist(@Body() CreateArtistDto:CreateArtistDto){
        return await this.artistService.createArtist(CreateArtistDto)
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/json')
    async updateArtistById(@Body() UpdateDataArtistDto: UpdateDataArtistDto, @Param('id', new ParseUUIDPipe()) userId:string){
        return await this.artistService.updateArtistById(UpdateDataArtistDto,userId)
    }


    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Header('Content-Type', 'application/json')
    async removeArtist(@Param('id', new ParseUUIDPipe()) userId:string){
        return await (this.artistService.deleteArtist(userId))
    }
}
