import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
export class CreateTrackDto {
  @ApiProperty({ description: 'track name', example: 'The Show Must Go On' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'refers to Artist', format: 'uuid' })
  @IsOptional()
  @IsUUID()
  readonly artistId: string | null; // refers to Artist

  @ApiProperty({ description: 'refers to Album', format: 'uuid' })
  @IsOptional()
  @IsUUID()
  readonly albumId: string | null; // refers to Album

  @ApiProperty({ description: 'track duration', example: 262 })
  @IsInt()
  readonly duration: number; // integer number
}
