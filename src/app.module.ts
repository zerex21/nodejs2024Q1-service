import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { FavsModule } from './favs/favs.module';
import { TrackModule } from './track/track.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    AlbumModule,
    ArtistModule,
    FavsModule,
    TrackModule,
    /* ConfigModule.forRoot({isGlobal: true}), */
    TypeOrmModule.forRoot/* Async */({
      /* imports: [ConfigModule],
      useFactory: (configService:ConfigService) => ({ */
        type: 'postgres',
        host: 'localhost',
        port: 5343,
        username: 'postgres',
        password: '2109qQ',
        database:'databaseorm',
        synchronize: true,
        entities: [__dirname + '/../**/*.entity{.js, .ts}']
     /*  }),
      inject: [ConfigService], */
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
