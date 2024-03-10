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
    createdAt: string,
    updatedAt: string
}

const users = mainBase.Users
const checkUUID = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

@Injectable()
export class UserService {


    getCurrentDate(){
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; // Месяцы начинаются с 0, поэтому добавляем 1
        const year = currentDate.getFullYear();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();

        // Форматирование чисел меньше 10 для добавления ведущего нуля
        const formattedDay = day < 10 ? `0${day}` : `${day}`;
        const formattedMonth = month < 10 ? `0${month}` : `${month}`;
        const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

        // Сборка строки с датой в нужном формате
        const formattedDate = `${formattedDay}.${formattedMonth}.${year} ${formattedHours}:${formattedMinutes}`;

        return `${formattedDate}`;
      }

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
            id: uuidv4(),
            ...CreateUserDto,
            version: 1,
            createdAt: this.getCurrentDate(),
            updatedAt: ''

        })

        users.push(user)
        const userShow = {...user}
        delete userShow.id
        return userShow
    }

    updateUserById(UpdatePasswordDto:UpdatePasswordDto,id: string) {

        if (!checkUUID.test(id)) {
            throw new HttpException('Incorrect id', HttpStatus.BAD_REQUEST);
        }

        if((Object.keys(UpdatePasswordDto)).length >= 3 || !UpdatePasswordDto.newPassword && !UpdatePasswordDto.oldPassword ||
            typeof UpdatePasswordDto.newPassword !== "string" || typeof UpdatePasswordDto.oldPassword !== "string" ||
            UpdatePasswordDto.oldPassword === UpdatePasswordDto.newPassword ){
            throw new HttpException('Incorrect dates,passwords should be different and type string', HttpStatus.FORBIDDEN);
        }

        const res = users.find(p => {
            if (p?.id === id) {
                if(p.password !== UpdatePasswordDto.newPassword && p.password === UpdatePasswordDto.oldPassword){
                    p.password = UpdatePasswordDto.newPassword
                    p.version++
                    p.updatedAt= this.getCurrentDate()
                    return true
                }else{
                    throw new HttpException('Check correct your passwords', HttpStatus.FORBIDDEN);
                }
            }
        })

        if (res) {
            return "Your password was successful changed!"
        } else {
            throw new HttpException("This user doesn't exist", HttpStatus.BAD_REQUEST)
        }

       /*  return this.products.find(p => p.id === id) */
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
