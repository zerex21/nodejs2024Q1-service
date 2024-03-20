import { IsBoolean, IsString, IsUUID } from "class-validator";


export class CreateArtistDto{
   @IsUUID(4)
   readonly id: string; // uuid v4

   @IsString()
   readonly name: string;

   @IsBoolean()
   readonly grammy: boolean;
}