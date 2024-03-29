import { UserService } from './user.service';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  Header,
  ParseUUIDPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password-user.dto';
import { UserEntity } from './entities/userEntity';
import { JwtAccessAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import {
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@UseGuards(JwtAccessAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [UserEntity] })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  async getAll() {
    const users = await this.userService.getAllUsers();
    const usersOnePassword = users.map((user) => new UserEntity(user));
    return usersOnePassword;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get the user by id' })
  @ApiResponse({ status: 200, type: UserEntity })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  async getUserById(
    @Param('id', new ParseUUIDPipe()) userId: string,
  ): Promise<UserEntity> {
    const user = await this.userService.getUserById(userId);
    return new UserEntity(user);
  }

  @Post()
  @ApiOperation({ summary: 'Create the user' })
  @ApiResponse({ status: 201, type: UserEntity })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async createUser(@Body() CreateUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.userService.createUser(CreateUserDto);
    return new UserEntity(user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update the user by id' })
  @ApiResponse({ status: 201, type: UserEntity })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  async updateUserById(
    @Body() UpdatePasswordDto: UpdatePasswordDto,
    @Param('id', new ParseUUIDPipe()) userId: string,
  ): Promise<UserEntity> {
    const user = await this.userService.updateUserById(
      UpdatePasswordDto,
      userId,
    );
    return new UserEntity(user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete the user by id' })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Content-Type', 'application/json')
  async removeUser(@Param('id', new ParseUUIDPipe()) userId: string) {
    await this.userService.deleteUser(userId);
  }
}
