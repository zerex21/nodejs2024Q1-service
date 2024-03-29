import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ description: 'user login', example: 'TestUser' })
  @IsString()
  login: string;

  @ApiProperty({ description: 'uuid v4', format: 'uuid' })
  @IsString()
  password: string;
}
