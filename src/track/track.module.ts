/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';

@Module({
    imports: [TypeOrmModule.forFeature([/* Album, Artist, */ Track])],
    controllers:[TrackController],
    providers:[TrackService]
})
export class TrackModule {}
