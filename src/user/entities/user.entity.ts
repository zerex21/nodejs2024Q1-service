import { IsUUID } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity('user')
export class User{
    @PrimaryGeneratedColumn()
    @IsUUID(4)
    id: string

    @Column()
    login: string

    @Column()
    password: string

    @Column()
    version: number

    @CreateDateColumn()
    createdAt: Data

    @CreateDateColumn()
    updatedAt: Data

}