/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Delete, Param, HttpCode, HttpStatus, Header } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsEntity } from './entities/favsEntity';

@Controller('favs')
export class FavsController {
        constructor(private readonly favsService: FavsService){}

        @Get()
        @HttpCode(HttpStatus.OK)
        @Header('Content-Type', 'application/json')
        async getAll(){
            return await this.favsService.getAllFavs()
        }

        @Post(':type/:id')
        @HttpCode(HttpStatus.CREATED)
        @Header('Content-Type', 'application/json')
        async addFavsById(@Param('type') type:string,@Param('id') userId:string){
           const favs = await this.favsService.addFavsById(type,userId )
           return new FavsEntity(favs);
        }

        @Delete(':type/:id')
        @HttpCode(HttpStatus.NO_CONTENT)
        @Header('Content-Type', 'application/json')
        async removeFavsById(@Param('type') type:string,@Param('id') userId:string){
            return await (this.favsService.deleteFavsById(type,userId))
        }
}
