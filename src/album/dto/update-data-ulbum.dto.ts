import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateDataAlbumDto{
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsUUID()
  readonly artistId: string | null; // refers to Artist

  @IsOptional()
  @IsInt()
  readonly year: number; // integer number
}