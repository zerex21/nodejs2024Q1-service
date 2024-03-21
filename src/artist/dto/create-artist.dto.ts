import { IsBoolean, IsString, IsUUID } from "class-validator";


export class CreateArtistDto{
   /* @IsUUID(4)
   readonly id: string; */

   @IsString()
   readonly name: string;

   @IsBoolean()
   readonly grammy: boolean;
}