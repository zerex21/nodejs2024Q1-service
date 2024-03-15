import { IsUUID } from "class-validator";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity('artist')
export class Artist{
    @PrimaryGeneratedColumn()
    @IsUUID(4)
    id: string

    @Column()
    name: string

    @Column()
    grammy: boolean

}