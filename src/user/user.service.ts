/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { base as mainBase } from "../../base";


interface IUser {
    id: string,
    login: string,
    password: string,
    version: number,
    createdAt: number,
    updatedAt: number
}

const users = mainBase.Users
const checkUUID = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

@Injectable()
export class UserService {
    private products = []

    getAllUsers() {
        return users
    }

    getUserById(id: string) {

        if (!checkUUID.test(id)) {
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
            throw new HttpException("This user doesn't exist", HttpStatus.BAD_REQUEST)
        }
    }

    createUser(CreateUserDto: CreateUserDto) {
        /* const users = mainBase.Users */
        if((Object.keys(CreateUserDto)).length >= 3 || !CreateUserDto.login && !CreateUserDto.password ||
            typeof CreateUserDto.login !== "string" || typeof CreateUserDto.password !== "string" ){
            throw new HttpException('Incorrect dates, should be "login"(type string) and "password"(type string)', HttpStatus.BAD_REQUEST);
        }

        const user = ({
            ...CreateUserDto,
            id: uuidv4(),
            version: 1,
            createdAt: 0,
            updatedAt: 1

        })

        users.push(user)
        return user
    }

    updateUserById(UpdatePasswordDto:UpdatePasswordDto,id: string) {
        return this.products.find(p => p.id === id)
    }

     deleteUser(id: string) {

        if (!checkUUID.test(id)) {
            throw new HttpException('Incorrect id', HttpStatus.BAD_REQUEST);
        }

        const res = users.findIndex(p => p?.id === id);


        if (res !== -1) {
            users.splice(res, 1);
            return 'User has been deleted';
        } else {
            throw new HttpException("This user doesn't exist", HttpStatus.BAD_REQUEST);
        }
    }


}
