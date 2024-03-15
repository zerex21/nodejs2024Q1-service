import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity('favs')
export class Favs{
    @PrimaryColumn()

    artists: string[]

    @Column()
    albums: string[]

    @Column()
    tracks: string[]

}