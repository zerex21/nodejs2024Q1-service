import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateDataArtistDto{
   @IsOptional()
   @IsString()
   readonly name: string;

   @IsOptional()
   @IsBoolean()
   readonly grammy: boolean;
}