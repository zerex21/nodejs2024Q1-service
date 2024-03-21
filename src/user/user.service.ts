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
        return await this.userRepository.find()
    }

    async getUserById(id: string) {
        const res = await this.userRepository.findOneBy({id})

        if(res){
            return res
        }
        throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
       /*  throw new HttpException("This user doesn't exist", HttpStatus.NOT_FOUND) */

       /*  if (!checkUUID.test(id)) {
            throw new HttpException('Incorrect id', HttpStatus.BAD_REQUEST);
        }

       const res = users.find(p => {
            if (p?.id === id) {
                return p
            }
        })

        if (res) {
            return res
        } else {
            throw new HttpException("This user doesn't exist", HttpStatus.NOT_FOUND)
        } */
    }

    async createUser({login, password}:CreateUserDto/* CreateUserDto: CreateUserDto */): Promise<User> {
       /*  if((Object.keys(CreateUserDto)).length >= 3 || !CreateUserDto.login && !CreateUserDto.password ||
            typeof CreateUserDto.login !== "string" || typeof CreateUserDto.password !== "string" ){
            throw new HttpException('Incorrect dates, should be "login"(type string) and "password"(type string)', HttpStatus.BAD_REQUEST);
        }
 */     const hashPassword = this.hashPassword(password);
        if (!hashPassword) {
            throw new Error('Error bcrypt');
        }
        password = hashPassword;
        const newUser = this.userRepository.create({ login, password });
        return await this.userRepository.save(newUser);
        /* const newUser = this.userRepository.create( {login,password}) */
      /*   const newUser = ({
            id: uuidv4(),
            login,
            password,
            version: 1,
            createdAt: Date.now(),
            updatedAt: Date.now()

        }) */

        /* users.push(user)
        const userShow = {...user}
        delete userShow.id
        return userShow */

        /* return this.userRepository.save(newUser) */

    }

    async updateUserById({ oldPassword, newPassword }:UpdatePasswordDto,id: string) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
          throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
        }

        const isEquals = this.hashPassword(oldPassword) === user.password;
        if (!isEquals) {
          throw new HttpException(`oldPassword is wrong`, 403);
        }

        const hashNewPassword = this.hashPassword(newPassword);
        await this.userRepository.update(id, { password: hashNewPassword });
        return await this.userRepository.findOneBy({ id });
        /* const user = await this.userRepository.findOneBy({ id });
        if (!user) {
          throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
        }

        const isEquals = user.password;
        if (!isEquals) {
          throw new HttpException(`oldPassword is wrong`, 403);
        }
        await this.userRepository.update(id, { password: newPassword });
        return await this.userRepository.findOneBy({ id }); */
      /*   const hashNewPassword = this.hashPassword(newPassword); */

       /*  if (!checkUUID.test(id)) {
            throw new HttpException('Incorrect id', HttpStatus.BAD_REQUEST);
        }

        if((Object.keys(UpdatePasswordDto)).length >= 3 || !UpdatePasswordDto.newPassword && !UpdatePasswordDto.oldPassword ||
            typeof UpdatePasswordDto.newPassword !== "string" || typeof UpdatePasswordDto.oldPassword !== "string" ||
            UpdatePasswordDto.oldPassword === UpdatePasswordDto.newPassword ){
            throw new HttpException('Incorrect dates,passwords should be different and type string', HttpStatus.BAD_REQUEST);
        }

        const res = users.find(p => {
            if (p?.id === id) {
                if(p.password !== UpdatePasswordDto.newPassword && p.password === UpdatePasswordDto.oldPassword){
                    p.password = UpdatePasswordDto.newPassword
                    p.version++
                    p.updatedAt= Date.now()
                    return true
                }else{
                    throw new HttpException('Check correct your passwords', HttpStatus.BAD_REQUEST);
                }
            }
        })

        if (res) {
            return JSON.stringify({message:"Your password was successful changed!"})
            return "Your password was successful changed!"
        } else {
            throw new HttpException("This user doesn't exist", HttpStatus.NOT_FOUND)
        } */
    }

    async deleteUser(id: string) {
        const { affected } = await this.userRepository.delete(id)

        if (!affected) {
            throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
          }
        /* if(deleteResult.affected === 0){
            throw new HttpException("This user doesn't exist", HttpStatus.NOT_FOUND);
        } */
        return
       /*  if (!checkUUID.test(id)) {
            throw new HttpException('Incorrect id', HttpStatus.BAD_REQUEST);
        }

        const res = users.findIndex(p => p?.id === id);


        if (res !== -1) {
            users[res] = null

            return JSON.stringify({message:'User has been deleted'})
        } else {
            throw new HttpException("This user doesn't exist", HttpStatus.NOT_FOUND);
        } */
    }

    private hashPassword = (password: string): string =>
    createHash('sha256').update(password).digest('hex');

}
