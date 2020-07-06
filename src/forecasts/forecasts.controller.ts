import { Controller, Post, Body, Get, Param, Delete, UsePipes, ValidationPipe, ParseIntPipe, NotAcceptableException } from '@nestjs/common';

import { ForecastsService } from './forecasts.service';
import { Forecast } from './forecast.entity';

@Controller('forecasts')
export class ForecastsController {
    
    constructor(
        private readonly forecastsService: ForecastsService,
    ) {}

    @Get('/latest')
    getLatestForecast(): Promise<Forecast> {
        return this.forecastsService.getLastForecast();
    }

    @Get('/:id')
    getForecast(@Param('id', ParseIntPipe) id: number): Promise<Forecast> {
        return this.forecastsService.getSingleForecast(id);
    }

    @Delete('/:id')
    deleteForecast(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.forecastsService.deleteForecast(id);
    }

}