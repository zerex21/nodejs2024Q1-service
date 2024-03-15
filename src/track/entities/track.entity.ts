import { IsUUID } from "class-validator";
import { Album } from "src/album/entities/album.entity";
import { Artist } from "src/artist/entities/artist.entity";
import { Column, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity('track')
export class Track{
    @PrimaryGeneratedColumn()
    @IsUUID(4)
    id: string

    @Column()
    name: string

    @OneToOne(() => Artist, (artist) => artist.id)
    artistId: string | null

    @OneToOne(() => Album, (album) => album.id)
    albumId: string | null

    @Column()
    duration: number

}