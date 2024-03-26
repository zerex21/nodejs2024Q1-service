import { AuthService } from './auth.service';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserEntity } from 'src/user/entities/userEntity';
import { IToken } from './interfaces/IToken';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService);

  @Post('/login')
  async login(@Body() userDto: CreateUserDto): Promise<IToken> {
    return await this.authService.login(userDto);
  }

  @Post('/signup')
  async signUp(@Body() userDto: CreateUserDto): Promise<UserEntity> {
    const createdUser = await this.authService.signUp(userDto);
    return new UserEntity(createdUser);
  }

  @HttpCode(200)
  @Post('refresh')
  async refresh(
    /* @Body('refreshToken', new ValidationRefreshPipe()) */
    refreshToken: string,
  ): Promise<IToken> {
    const tokens = this.authService.refresh(refreshToken);
    return tokens;
  }
}
