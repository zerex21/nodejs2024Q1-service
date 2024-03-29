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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateDataAlbumDto } from './dto/update-data-ulbum.dto';
import { JwtAccessAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Album } from './entities/album.entity';
import {
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@UseGuards(JwtAccessAuthGuard)
/* @UseInterceptors(ClassSerializerInterceptor) */
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @ApiOperation({ summary: 'Get all albums' })
  @ApiResponse({ status: 200, type: [Album] })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  async getAll() {
    return await this.albumService.getAllAlbums();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get the album by id' })
  @ApiResponse({ status: 200, type: Album })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  async getAlbumById(@Param('id', new ParseUUIDPipe()) userId: string) {
    return await this.albumService.getAlbumById(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create the album' })
  @ApiResponse({ status: 201, type: Album })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async createAlbum(@Body() CreateAlbumDto: CreateAlbumDto) {
    return await this.albumService.createAlbum(CreateAlbumDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update the album by id' })
  @ApiResponse({ status: 200, type: Album })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  async updateAlbumById(
    @Body() UpdateDataAlbumDto: UpdateDataAlbumDto,
    @Param('id', new ParseUUIDPipe()) userId: string,
  ) {
    return await this.albumService.updateAlbumById(UpdateDataAlbumDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete the album by id' })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Content-Type', 'application/json')
  async removeAlbum(@Param('id', new ParseUUIDPipe()) userId: string) {
    return await this.albumService.deleteAlbum(userId);
  }
}
