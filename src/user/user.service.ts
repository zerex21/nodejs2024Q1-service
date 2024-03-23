import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { createHash } from 'node:crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    return await this.userRepository.find();
  }

  async getUserById(id: string) {
    const res = await this.userRepository.findOneBy({ id });

    if (res) {
      return res;
    }
    throw new HttpException(
      `Record with id === ${id} doesn't exist`,
      HttpStatus.NOT_FOUND,
    );
    /*  throw new HttpException("This user doesn't exist", HttpStatus.NOT_FOUND) */
  }

  async createUser({ login, password }: CreateUserDto): Promise<User> {
    if (!login || !password) {
      throw new HttpException(`Record error`, HttpStatus.BAD_REQUEST);
    }

    const hashPassword = this.hashPassword(password);
    if (!hashPassword) {
      throw new Error('Error bcrypt');
    }
    password = hashPassword;
    const newUser = this.userRepository.create({ login, password });
    return await this.userRepository.save(newUser);
  }

  async updateUserById(
    { oldPassword, newPassword }: UpdatePasswordDto,
    id: string,
  ) {
    if (!oldPassword || !newPassword) {
      throw new HttpException(`Record error`, HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(
        `Record with id === ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    const isEquals = this.hashPassword(oldPassword) === user.password;
    if (!isEquals) {
      throw new HttpException(`oldPassword is wrong`, HttpStatus.FORBIDDEN);
    }

    const hashNewPassword = this.hashPassword(newPassword);
    await this.userRepository.update(id, { password: hashNewPassword });
    return await this.userRepository.findOneBy({ id });
  }

  async deleteUser(id: string) {
    const { affected } = await this.userRepository.delete(id);

    if (!affected) {
      throw new HttpException(
        `Record with id === ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  private hashPassword = (password: string): string =>
    createHash('sha256').update(password).digest('hex');
}
