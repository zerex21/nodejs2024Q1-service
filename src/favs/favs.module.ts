/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FavoritesController } from './favs.controller';
import { FavoritesService } from './favs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavsAlbum } from './entities/favsAlbum.entity';
import { FavsArtist } from './entities/favsArtist.entity';
import { FavsTrack } from './entities/favsTrack.entity';

@Module({
    imports: [TypeOrmModule.forFeature([FavsAlbum, FavsArtist, FavsTrack]),],
    controllers:[FavoritesController],
    providers:[FavoritesService]
})
export class FavsModule {}
