import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('artist')
export class Artist{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', type: 'varchar' } )
    name: string;

    @Column({ name: 'grammy', type: 'boolean' })
    grammy: boolean;

}