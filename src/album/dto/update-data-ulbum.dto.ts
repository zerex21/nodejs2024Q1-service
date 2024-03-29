import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateDataAlbumDto {
  @ApiProperty({ description: 'album name', example: 'Innuendo' })
  @IsOptional()
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'released', example: 1990 })
  @IsOptional()
  @IsUUID()
  readonly artistId: string | null; // refers to Artist

  @ApiProperty({ description: 'refers to Artist', format: 'uuid' })
  @IsOptional()
  @IsInt()
  readonly year: number; // integer number
}
