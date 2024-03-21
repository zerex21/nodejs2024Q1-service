import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
export class CreateTrackDto{
   /* readonly id: string;
   readonly name: string;
   readonly artistId: string | null;
   readonly albumId: string | null;
   readonly duration: number; */
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