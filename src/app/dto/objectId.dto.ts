import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId } from 'class-validator';

export class ObjectIdDto {
  @ApiProperty({ example: 'uuid example' })
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}
