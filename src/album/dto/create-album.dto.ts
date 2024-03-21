import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
export class CreateAlbumDto{
   /* readonly id: string;
   readonly name: string;
   readonly year: number;
   readonly artistId: string | null;  */
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsUUID()
  readonly artistId: string | null; // refers to Artist

  @IsInt()
  readonly year: number; // integer number
}