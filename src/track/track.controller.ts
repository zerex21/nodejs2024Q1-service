import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  Header,
  ParseUUIDPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateDataTrackDto } from './dto/update-data-track.dto';
import { JwtAccessAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import {
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Track } from './entities/track.entity';

@UseGuards(JwtAccessAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({ status: 200, type: [Track] })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  async getAll() {
    return await this.trackService.getAllTracks();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get the track by id' })
  @ApiResponse({ status: 200, type: Track })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  async getTrackById(@Param('id', new ParseUUIDPipe()) userId: string) {
    return await this.trackService.getTrackById(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create the track' })
  @ApiResponse({ status: 201, type: Track })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async createTrack(@Body() CreateTrackDto: CreateTrackDto) {
    return await this.trackService.createTrack(CreateTrackDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update the track by id' })
  @ApiResponse({ status: 200, type: Track })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  async updateTrackById(
    @Body() CreateTrackDto: CreateTrackDto,
    @Param('id', new ParseUUIDPipe()) userId: string,
  ) {
    return await this.trackService.updateTrackById(CreateTrackDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete the track by id' })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Content-Type', 'application/json')
  async removeTrack(@Param('id', new ParseUUIDPipe()) userId: string) {
    return await this.trackService.deleteTrack(userId);
  }
}
