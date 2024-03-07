/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password-user.dto';

@Controller('user')
export class UserController {

    @Get()
    @HttpCode(HttpStatus.OK)
    getAll(){
        return 'All Users'
    }


    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getUserById(@Param('id') userId:string){
        return 'UserById ' + userId
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
        createUser(@Body() CreateUserDto:CreateUserDto){
           return CreateUserDto
        }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
        updateUserById(@Body() UpdatePasswordDto: UpdatePasswordDto, @Param('id') userId:string){
        return UpdatePasswordDto
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
        removeUser(@Param('id') userId:string){
        return 'remove ' + userId
    }


}
