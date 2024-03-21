import { IsString } from 'class-validator';
export class CreateUserDto{
  /*  readonly login: string;
   readonly password: string; */
   @IsString()
   readonly login: string;

   @IsString()
   readonly password: string;

}
