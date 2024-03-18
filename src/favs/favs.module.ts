/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavsAlbum } from './entities/favsAlbum.entity';
import { FavsArtist } from './entities/favsArtist';
import { FavsTrack } from './entities/favsTrack';

@Module({
    imports: [TypeOrmModule.forFeature([FavsAlbum, FavsArtist, FavsTrack]),],
    controllers:[FavsController],
    providers:[FavsService]
})
export class FavsModule {}
