/* eslint-disable prettier/prettier */
import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { base as mainBase } from "../../base"
interface IUser {
    id: string,
    login: string,
    password: string,
    version: number,
    createdAt: number,
    updatedAt: number
}
const checkUUID = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
@Injectable()
export class UserService {
    private products = []

    getAllUsers() {
        let users = mainBase.Users
        return users
    }

    getUserById(id: string) {
        let users = mainBase.Users
        if (!checkUUID.test(id)) {
            throw new HttpException('Incorrect id', HttpStatus.BAD_REQUEST);
        }
        /* for(let i = 0; i<users.length; i++){

        } */
        return users.find(p => {
            if (p.id === id) {
                return p
            } else {
                throw new HttpException("This user doesn't exist", HttpStatus.NOT_FOUND);
            }
        })
    }

    createUser(CreateUserDto: CreateUserDto) {
        let users = mainBase.Users
        if(CreateUserDto){

        }
        const user = users.push({
            ...CreateUserDto,
            id: uuidv4(),
            version: '',
            createdAt: '',
            updatedAt: ''
        })
        return user

    }

    deleteUser(id: string) {
        return this.products.find(p => p.id === id)
    }

    updateUserById(id: string) {
        return this.products.find(p => p.id === id)
    }
}
