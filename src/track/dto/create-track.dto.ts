import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
export class CreateTrackDto {
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsUUID()
  readonly artistId: string | null; // refers to Artist

  @IsOptional()
  @IsUUID()
  readonly albumId: string | null; // refers to Album

  @IsInt()
  readonly duration: number; // integer number
}
