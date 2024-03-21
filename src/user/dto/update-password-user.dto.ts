import { IsString } from 'class-validator';
export class UpdatePasswordDto{
   /* readonly oldPassword: string;
   readonly newPassword: string; */
   @IsString()
   oldPassword: string; // previous password
   @IsString()
   newPassword: string; // new password
}