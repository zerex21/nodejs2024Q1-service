/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { base as mainBase } from "../../base";
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';



interface IUser {
    id: string,
    login: string,
    password: string,
    version: number,
    createdAt: string,
    updatedAt: string
}

const users = mainBase.Users
const checkUUID = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      ) {}

    getAllUsers() {
        return this.userRepository.find()
    }

    getUserById(id: string) {
        const res = this.userRepository.findOneBy({id})

        if(res){
            return res
        }

        throw new HttpException("This user doesn't exist", HttpStatus.NOT_FOUND)

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

    createUser({login, password}:CreateUserDto/* CreateUserDto: CreateUserDto */) {
       /*  if((Object.keys(CreateUserDto)).length >= 3 || !CreateUserDto.login && !CreateUserDto.password ||
            typeof CreateUserDto.login !== "string" || typeof CreateUserDto.password !== "string" ){
            throw new HttpException('Incorrect dates, should be "login"(type string) and "password"(type string)', HttpStatus.BAD_REQUEST);
        }
 */
        const newUser = this.userRepository.create( {login,password})
        return this.userRepository.save(newUser)
       /*  const user = ({
            id: uuidv4(),
            ...CreateUserDto,
            version: 1,
            createdAt: Date.now(),
            updatedAt: 0

        })

        users.push(user)
        const userShow = {...user}
        delete userShow.id
        return userShow */
    }

    updateUserById(UpdatePasswordDto:UpdatePasswordDto,id: string) {

        if (!checkUUID.test(id)) {
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
        }
    }

    async deleteUser(id: string) {
        const deleteResult = await this.userRepository.delete(id)

        if(deleteResult.affected === 0){
            throw new HttpException("This user doesn't exist", HttpStatus.NOT_FOUND);
        }
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


}
