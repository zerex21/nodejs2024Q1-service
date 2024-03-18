import { Artist } from "src/artist/entities/artist.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('album')
export class Album{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column()
    year: number

    @Column()
    artistId: string | null;

    @ManyToOne(() => Artist, { onDelete: 'SET NULL' })
    @JoinColumn()
    artist: Artist;

}