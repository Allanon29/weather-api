import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCityDto {
  
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  timezone: string;

  @IsOptional()
  locked: boolean;
  locked_at: Date;

}