import { Injectable, NotFoundException } from '@nestjs/common';

import { ForecastRepository } from './forecast.repository';
import { Forecast } from './forecast.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateForecastDto } from './dtos/create-forecast.dto';

@Injectable()
export class ForecastsService {
    constructor(
        @InjectRepository(ForecastRepository)
        private forecastRepository: ForecastRepository) {
    }

    async getLastForecast() {
        const forecast = await this.forecastRepository.createQueryBuilder('forecasts').leftJoinAndSelect("forecasts.city", "city").orderBy({
            'forecasts.id': 'DESC'
        }).getOne();

        if (!forecast) {
            throw new NotFoundException('No forecast can be found');
        }

        return forecast
    }
    

    async getSingleForecast(id: number): Promise<Forecast> {
        const forecast = await this.forecastRepository.findOne(id);

        if (!forecast) {
            throw new NotFoundException('Forecast with ID ' + id + ' not found');
        }

        return forecast;
    }

    async deleteForecast(id: number): Promise<void>  {
       const result = this.forecastRepository.delete(id);
       
       if (!result) {
        throw new NotFoundException('Forecast with ID ' + id + ' not found');
       }
    }
   
}