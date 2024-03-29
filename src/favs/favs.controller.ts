import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  Header,
  ParseUUIDPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favs.service';
import { FavsEntity } from './entities/favsEntity';
import { JwtAccessAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@UseGuards(JwtAccessAuthGuard)
/* @UseInterceptors(ClassSerializerInterceptor) */
@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({ status: 200, type: [FavsEntity] })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  async getAll() {
    return await this.favoritesService.getAll();
  }

  @Post('track/:id')
  @ApiOperation({ summary: 'Add the track to favorites by id' })
  @ApiCreatedResponse({ description: 'Added successfully' })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  async addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const favorite = await this.favoritesService.addTrack(id);
    return new FavsEntity(favorite);
  }

  @Delete('track/:id')
  @ApiOperation({ summary: 'Delete the track from favorites by id' })
  @ApiCreatedResponse({ description: 'Deleted successfully' })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @HttpCode(204)
  async deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.deleteTrack(id);
  }

  @Post('album/:id')
  @ApiOperation({ summary: 'Add the album to favorites by id' })
  @ApiCreatedResponse({ description: 'Added successfully' })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  async addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const favorite = await this.favoritesService.addAlbum(id);
    return new FavsEntity(favorite);
  }

  @Delete('album/:id')
  @ApiOperation({ summary: 'Delete the album from favorites by id' })
  @ApiCreatedResponse({ description: 'Deleted successfully' })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @HttpCode(204)
  async deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.deleteAlbum(id);
  }

  @Post('artist/:id')
  @ApiOperation({ summary: 'Add the artist to favorites by id' })
  @ApiCreatedResponse({ description: 'Added successfully' })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  async addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const favorite = await this.favoritesService.addArtist(id);
    return new FavsEntity(favorite);
  }

  @Delete('artist/:id')
  @ApiOperation({ summary: 'Delete the artist from favorites by id' })
  @ApiCreatedResponse({ description: 'Deleted successfully' })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @HttpCode(204)
  async deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.deleteArtist(id);
  }
}
