import { IsNotEmpty, IsISO8601, IsEnum } from 'class-validator';

import { ForecastType } from '../forecast.entity';

export class CreateForecastDto {
  
  @IsNotEmpty()
  @IsEnum(ForecastType)
  forecast: ForecastType;
  
  @IsISO8601()
  from: Date;

  @IsISO8601()
  to: Date;

}