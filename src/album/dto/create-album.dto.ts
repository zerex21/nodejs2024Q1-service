import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
export class CreateAlbumDto {
  @ApiProperty({ description: 'album name', example: 'Innuendo' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'released', example: 1990 })
  @IsOptional()
  @IsUUID()
  readonly artistId: string | null; // refers to Artist

  @ApiProperty({ description: 'refers to Artist', format: 'uuid' })
  @IsInt()
  readonly year: number; // integer number
}
