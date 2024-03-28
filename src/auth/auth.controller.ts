import { AuthService } from './auth.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  SetMetadata,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserEntity } from 'src/user/entities/userEntity';
import { IToken } from './interfaces/IToken';
import { ValidationRefreshPipe } from './validationRefreshPipe';
import { RefreshGuard } from './guard/refresh-auth.guard';

const IS_PUBLIC_KEY = 'isPublic';
const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@ApiTags('Authorization')
@UseGuards(RefreshGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() userDto: CreateUserDto): Promise<IToken> {
    return await this.authService.login(userDto);
  }

  @Public()
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
