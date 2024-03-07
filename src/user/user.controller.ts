/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password-user.dto';

@Controller('user')
export class UserController {

    @Get()
    getAll(){
        return 'All Users'
    }


    @Get(':id')
    getUserById(@Param('id') userId:string){
        return 'UserById ' + userId
    }

    @Post()
        createUser(@Body() CreateUserDto:CreateUserDto){
           return CreateUserDto
        }

    @Put(':id')
        updateUserById(@Body() UpdatePasswordDto: UpdatePasswordDto, @Param('id') userId:string){
        return UpdatePasswordDto
    }

    @Delete(':id')
        removeUser(@Param('id') userId:string){
        return 'remove ' + userId
    }


}
