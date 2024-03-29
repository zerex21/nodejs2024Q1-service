import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({ description: 'artist name', example: 'Freddie Mercury' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'artist has Grammy', example: 'false' })
  @IsBoolean()
  readonly grammy: boolean;
}
