import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class UpdatePasswordDto {
  @ApiProperty({ description: 'uuid v4', format: 'uuid' })
  @IsString()
  oldPassword: string;

  @ApiProperty({ description: 'uuid v4', format: 'uuid' })
  @IsString()
  newPassword: string;
}
