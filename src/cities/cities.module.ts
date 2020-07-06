import { Module } from '@nestjs/common';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityRepository } from './city.repository';
import { ForecastRepository } from 'src/forecasts/forecast.repository';
import { ForecastsService } from 'src/forecasts/forecasts.service';
import { ForecastsModule } from 'src/forecasts/forecasts.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([CityRepository])
    ],
    controllers: [CitiesController],
    providers: [
        CitiesService
    ]
})
export class CitiesModule {
    
}