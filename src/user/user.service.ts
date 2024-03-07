/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4} from 'uuid';
@Injectable()
export class UserService {
    private products = []

    getAllUsers() {
        return this.products
    }

    getUserById(id:string){
        return this.products.find(p => p.id === id)
    }

    createUser(CreateUserDto:CreateUserDto){
        const user = this.products.push({
            ...CreateUserDto,
            id:uuidv4()
        })
        return user

    }

    deleteUser(id:string){
        return this.products.find(p => p.id === id)
    }

    updateUserById(id:string){
        return this.products.find(p => p.id === id)
    }
}
