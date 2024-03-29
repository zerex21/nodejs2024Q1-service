import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateDataArtistDto {
  @ApiProperty({ description: 'artist has Grammy', example: 'true' })
  @IsOptional()
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'artist has Grammy', example: 'false' })
  @IsOptional()
  @IsBoolean()
  readonly grammy: boolean;
}
