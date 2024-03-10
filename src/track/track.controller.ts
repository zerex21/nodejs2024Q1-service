/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateDataTrackDto } from './dto/update-data-track.dto';

@Controller('track')
export class TrackController {
    constructor(private readonly trackService: TrackService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    getAll(){
        return this.trackService.getAllTracks()
    }


    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getTrackById(@Param('id') userId:string){
        return  this.trackService.getTrackById(userId)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createTrack(@Body() CreateTrackDto:CreateTrackDto){
        return this.trackService.createTrack(CreateTrackDto)
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    updateTrackById(@Body() UpdateDataTrackDto: UpdateDataTrackDto, @Param('id') userId:string){
        return this.trackService.updateTrackById(UpdateDataTrackDto,userId)
    }


    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    removeTrack(@Param('id') userId:string){
        return (this.trackService.deleteTrack(userId))
    }
}

