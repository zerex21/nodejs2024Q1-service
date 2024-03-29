import { ApiProperty } from '@nestjs/swagger';

export class UpdateDataTrackDto {
  @ApiProperty({ description: 'track name', example: 'Bohemian Rhapsody' })
  readonly name: string;

  @ApiProperty({ description: 'refers to Artist', format: 'uuid' })
  readonly artistId: string | null; // refers to Artist

  @ApiProperty({ description: 'refers to Album', format: 'uuid' })
  readonly albumId: string | null; // refers to Album

  @ApiProperty({ description: 'track duration', example: 262 })
  readonly duration: number;
}
