/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Delete, Param, HttpCode, HttpStatus, Header } from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
        constructor(private readonly favsService: FavsService){}

        @Get()
        @HttpCode(HttpStatus.OK)
        @Header('Content-Type', 'application/json')
        getAll(){
            return this.favsService.getAllFavs()
        }

        @Post(':type/:id')
        @HttpCode(HttpStatus.CREATED)
        @Header('Content-Type', 'application/json')
        addFavsById(@Param('type') type:string,@Param('id') userId:string){
            return this.favsService.addFavsById(type,userId )
        }

        @Delete(':type/:id')
        @HttpCode(HttpStatus.NO_CONTENT)
        @Header('Content-Type', 'application/json')
        removeFavsById(@Param('type') type:string,@Param('id') userId:string){
            return (this.favsService.deleteFavsById(type,userId))
        }
}
