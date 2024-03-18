/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, Header } from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateDataTrackDto } from './dto/update-data-track.dto';

@Controller('track')
export class TrackController {
    constructor(private readonly trackService: TrackService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/json')
   async getAll(){
        return await this.trackService.getAllTracks()
    }


    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/json')
    async getTrackById(@Param('id') userId:string){
        return await this.trackService.getTrackById(userId)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Content-Type', 'application/json')
    async createTrack(@Body() CreateTrackDto:CreateTrackDto){
        return await this.trackService.createTrack(CreateTrackDto)
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/json')
    async updateTrackById(@Body() UpdateDataTrackDto: UpdateDataTrackDto, @Param('id') userId:string){
        return await this.trackService.updateTrackById(UpdateDataTrackDto,userId)
    }


    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Header('Content-Type', 'application/json')
    async removeTrack(@Param('id') userId:string){
        return await (this.trackService.deleteTrack(userId))
    }
}

