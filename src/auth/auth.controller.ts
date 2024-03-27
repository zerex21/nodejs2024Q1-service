import { AuthService } from './auth.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  SetMetadata,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserEntity } from 'src/user/entities/userEntity';
import { IToken } from './interfaces/IToken';
import { ValidationRefreshPipe } from './validationRefreshPipe';

const IS_PUBLIC_KEY = 'isPublic';
const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Public()
@ApiTags('Authorization')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() userDto: CreateUserDto): Promise<IToken> {
    return await this.authService.login(userDto);
  }

  @Post('/signup')
  async signUp(@Body() userDto: CreateUserDto): Promise<UserEntity> {
    const createdUser = await this.authService.signUp(userDto);
    return new UserEntity(createdUser);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  async refresh(
    @Body('refreshToken', new ValidationRefreshPipe())
    refreshToken: string,
  ): Promise<IToken> {
    const tokens = this.authService.refresh(refreshToken);
    return tokens;
  }
}
