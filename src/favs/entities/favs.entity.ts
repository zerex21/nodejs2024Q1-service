import { Album } from "src/album/entities/album.entity";
import { Artist } from "src/artist/entities/artist.entity";
import { Track } from "src/track/entities/track.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity('favs')
export class Favs{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToMany(() => Artist)
    @JoinTable()
    artists: Artist[];

    @ManyToMany(() => Album)
    @JoinTable()
    albums: Album[];

    @ManyToMany(() => Track)
    @JoinTable()
    tracks: Track[];

}