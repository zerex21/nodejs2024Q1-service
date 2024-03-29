import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artist')
export class Artist {
  @ApiProperty({ description: 'uuid v4', format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'artist name', example: 'Freddie Mercury' })
  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @ApiProperty({ description: 'artist has Grammy', example: 'false' })
  @Column({ name: 'grammy', type: 'boolean' })
  grammy: boolean;
}
