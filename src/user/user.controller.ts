/* eslint-disable prettier/prettier */
import { UserService } from './user.service';

import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, Header } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password-user.dto';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/json')
    getAll(){
        return this.userService.getAllUsers()
    }


    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/json')
    async getUserById(@Param('id') userId:string){
        return  this.userService.getUserById(userId)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Content-Type', 'application/json')
    createUser(@Body() CreateUserDto:CreateUserDto){
        return this.userService.createUser(CreateUserDto)
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/json')
    updateUserById(@Body() UpdatePasswordDto: UpdatePasswordDto, @Param('id') userId:string){
        return this.userService.updateUserById(UpdatePasswordDto,userId)
    }


    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Header('Content-Type', 'application/json')
    removeUser(@Param('id') userId:string){
        return (this.userService.deleteUser(userId))
    }

}
