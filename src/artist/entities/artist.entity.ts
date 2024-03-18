import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('artist')
export class Artist{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column()
    grammy: boolean

}