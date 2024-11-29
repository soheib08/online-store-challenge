import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId } from 'class-validator';

export class ObjectIdDto {
  @ApiProperty({ example: 'objectId example' })
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}
