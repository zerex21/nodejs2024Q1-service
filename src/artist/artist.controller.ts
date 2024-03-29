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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateDataArtistDto } from './dto/update-data-artist.dto';
import { JwtAccessAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import {
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Artist } from './entities/artist.entity';

@UseGuards(JwtAccessAuthGuard)
/* @UseInterceptors(ClassSerializerInterceptor) */
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({ status: 200, type: [Artist] })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  async getAll() {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get the artist by id' })
  @ApiResponse({ status: 200, type: Artist })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  async getArtistById(@Param('id', new ParseUUIDPipe()) userId: string) {
    return await this.artistService.getArtistById(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create the artist' })
  @ApiResponse({ status: 201, type: Artist })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async createArtist(@Body() CreateArtistDto: CreateArtistDto) {
    return await this.artistService.createArtist(CreateArtistDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update the artist by id' })
  @ApiResponse({ status: 200, type: Artist })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  async updateArtistById(
    @Body() UpdateDataArtistDto: UpdateDataArtistDto,
    @Param('id', new ParseUUIDPipe()) userId: string,
  ) {
    return await this.artistService.updateArtistById(
      UpdateDataArtistDto,
      userId,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete the artist by id' })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Content-Type', 'application/json')
  async removeArtist(@Param('id', new ParseUUIDPipe()) userId: string) {
    return await this.artistService.deleteArtist(userId);
  }
}
