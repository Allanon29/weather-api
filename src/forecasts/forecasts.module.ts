import { Module } from '@nestjs/common';
import { ForecastsController } from './forecasts.controller';
import { ForecastsService } from './forecasts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForecastRepository } from './forecast.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([ForecastRepository])
    ],
    controllers: [ForecastsController],
    providers: [ForecastsService]
})
export class ForecastsModule {
    
}