import { IsUUID } from "class-validator";
import { Artist } from "src/artist/entities/artist.entity";
import { Column, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity('album')
export class Album{
    @PrimaryGeneratedColumn()
    @IsUUID(4)
    id: string

    @Column()
    name: string

    @Column()
    year: number

    @OneToOne(() => Artist, (artist) => artist.id)
    artistId: string | null

}