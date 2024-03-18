import { IsUUID } from "class-validator";
import { Album } from "src/album/entities/album.entity";
import { Artist } from "src/artist/entities/artist.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity('track')
export class Track{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column()
    artistId: string | null;

    @Column()
    albumId: string | null

    @Column()
    duration: number

    @ManyToOne(() => Artist, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'artist_id', referencedColumnName: 'id' })
    artist: Artist;

    @ManyToOne(() => Album, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'album_id', referencedColumnName: 'id' })
    album: Album;

}