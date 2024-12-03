import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  @IsNotEmpty()
  goalCount: number;
  @IsNotEmpty()
  birthDate: Date;
}
