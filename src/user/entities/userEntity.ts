import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserEntity {
  @ApiProperty({ description: 'uuid v4', format: 'uuid' })
  id: string;

  @ApiProperty({ description: 'user login', example: 'TestUser' })
  login: string;

  @ApiProperty({ description: 'increments on update', example: 1 })
  version: number;

  @ApiProperty({ description: 'timestamp of creation', example: 1655000000 })
  createdAt: number;

  @ApiProperty({ description: 'timestamp of last update', example: 1655000000 })
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
