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

@UseGuards(JwtAccessAuthGuard)
/* @UseInterceptors(ClassSerializerInterceptor) */
@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  async getAll() {
    return await this.favoritesService.getAll();
  }

  @Post('track/:id')
  async addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const favorite = await this.favoritesService.addTrack(id);
    return new FavsEntity(favorite);
  }

  @HttpCode(204)
  @Delete('track/:id')
  async deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.deleteTrack(id);
  }

  @Post('album/:id')
  async addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const favorite = await this.favoritesService.addAlbum(id);
    return new FavsEntity(favorite);
  }

  @HttpCode(204)
  @Delete('album/:id')
  async deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.deleteAlbum(id);
  }

  @Post('artist/:id')
  async addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const favorite = await this.favoritesService.addArtist(id);
    return new FavsEntity(favorite);
  }

  @HttpCode(204)
  @Delete('artist/:id')
  async deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.deleteArtist(id);
  }
}
