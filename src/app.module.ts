import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { TrackController } from './track/track.controller';
import { ArtistController } from './artist/artist.controller';
import { AlbumController } from './album/album.controller';
import { FavsController } from './favs/favs.controller';
import { UserService } from './user/user.service';
import { AlbumService } from './album/album.service';
import { ArtistService } from './artist/artist.service';
import { FavsService } from './favs/favs.service';
import { TrackService } from './track/track.service';


@Module({
  imports: [],
  controllers: [AppController, UserController, TrackController, ArtistController, AlbumController, FavsController],
  providers: [AppService, UserService, AlbumService, ArtistService, FavsService, TrackService],
})
export class AppModule {}
