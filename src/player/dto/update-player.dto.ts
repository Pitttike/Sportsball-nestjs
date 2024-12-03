import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerDto } from './create-player.dto';
import { IsNumber } from 'class-validator';
export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {
  @IsNumber()
    goalCount: number;
}
