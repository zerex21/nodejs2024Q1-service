import {
  ConflictException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserEntity } from 'src/user/entities/userEntity';
import { UserService } from 'src/user/user.service';
import { IToken } from './interfaces/IToken';
import { JsonWebTokenError } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService);
  /* throw new HttpException("This user doesn't exist", HttpStatus.NOT_FOUND) */
  async login(userDto: CreateUserDto): Promise<IToken> {
    const { id, login } = await this.userService.checkPassword(userDto);
    const tokens = await this.generateToken(id, login);
    return tokens;
  }

  async signUp(userDto: CreateUserDto): Promise<UserEntity> {
    let user: User;
    try {
      user = await this.userService.createUser(userDto);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Conflict. Login already exists');
      }
      throw new InternalServerErrorException('Internal Server Error');
    }
    /* return this.generateToken(user) */
    return user;
  }

  async refresh(refreshToken: string): Promise<IToken> {
    try {
      const { sub, login } = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        ignoreExpiration: false,
      });

      const tokens = await this.generateToken(sub, login);
      return tokens;
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw new ForbiddenException(`Not allowed access`);
      }
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async generateToken(userId: string, login: string): Promise<IToken> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          login,
        },
        {
          secret: process.env.JWT_SECRET_KEY,
          expiresIn: process.env.TOKEN_EXPIRE_TIME,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          login,
        },
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }
}
