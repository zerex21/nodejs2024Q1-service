import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { FavsModule } from './favs/favs.module';
import { TrackModule } from './track/track.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'dataSetting/dataSetting';
import { config } from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { LoggerModule } from './app-logger/logger.module';
import { AllExceptionsFilter } from './app-logger/all_exeption.filter';
import { MyLogger } from './app-logger/logger.service';
import { LoggerMiddleware } from './app-logger/logger.middleware';

config();

@Module({
  imports: [
    UserModule,
    AlbumModule,
    ArtistModule,
    FavsModule,
    TrackModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private myLogger: MyLogger) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');

    process.on('uncaughtException', (err) => {
      this.myLogger.error(
        `Uncaught Exception ... name ${err.name}, message ${err.message} For more enable debug`,
      );
      this.myLogger.debug(`Uncaught Exception ... ${err.stack}`);
    });

    process.on('unhandledRejection', (err: Error) => {
      this.myLogger.error(
        `Unhandled Rejection ... name ${err.name}, message ${err.message} For more enable debug`,
      );
      this.myLogger.debug(`Unhandled Rejection ... ${err.stack}`);
    });
  }
}
