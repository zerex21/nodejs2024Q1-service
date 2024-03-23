import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
export class CreateAlbumDto {
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsUUID()
  readonly artistId: string | null; // refers to Artist

  @IsInt()
  readonly year: number; // integer number
}
