import { Artist } from "src/artist/entities/artist.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('album')
export class Album{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ name: 'name', type: 'varchar' })
    name: string

    @Column({ name: 'year', type: 'int' })
    year: number

    @Column({ name: 'artist_id', type: 'uuid', default: null })
    artistId: string | null;

    @ManyToOne(() => Artist, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'artist_id', referencedColumnName: 'id' })
    artist: Artist;

}