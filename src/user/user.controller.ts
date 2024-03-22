import { UserService } from './user.service';
import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, Header, ParseUUIDPipe, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password-user.dto';
import { UserEntity } from './entities/userEntity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/json')
    async getAll(){
        const users = await this.userService.getAllUsers();
        const usersOnePassword = users.map((user) => new UserEntity(user));
        return usersOnePassword;
    }


    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/json')
    async getUserById(@Param('id', new ParseUUIDPipe()) userId:string): Promise<UserEntity>{
        const user = await this.userService.getUserById(userId)
        return new UserEntity(user)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Content-Type', 'application/json')
   async createUser(@Body() CreateUserDto:CreateUserDto): Promise<UserEntity>{
        const user = await this.userService.createUser(CreateUserDto)
        return new UserEntity(user)
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/json')
    async updateUserById(@Body() UpdatePasswordDto: UpdatePasswordDto, @Param('id', new ParseUUIDPipe()) userId:string): Promise<UserEntity> {
        const user = await this.userService.updateUserById(UpdatePasswordDto,userId)
        return new UserEntity(user)
    }


    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Header('Content-Type', 'application/json')
    async removeUser(@Param('id', new ParseUUIDPipe()) userId:string){
       await this.userService.deleteUser(userId)

    }

}
