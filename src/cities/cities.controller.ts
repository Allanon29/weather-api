import { Controller, Post, Body, Get, Param, Patch, Delete, UsePipes, ValidationPipe, ParseIntPipe, Query } from '@nestjs/common';

import { CitiesService } from './cities.service';
import { City } from './city.entity';
import { Forecast } from '../forecasts/forecast.entity';
import { ForecastType } from '../forecasts/forecast-type.enum';
import { CreateCityDto } from './dtos/create-city.dto';
import { CreateForecastDto } from '../forecasts/dtos/create-forecast.dto';

@Controller('cities')
export class CitiesController {
    
    constructor(private readonly citiesService: CitiesService) {}

    @Get()
    getAllCities() {
        return this.citiesService.getAllCities();
    }

    @Get('/locked')
    lockedCities() {
        return this.citiesService.getLockedCities();
    }

    @Get('/:id')
    getCity(@Param('id', ParseIntPipe) id: number): Promise<City> {
        return this.citiesService.getSingleCity(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createCity(@Body() createCityDto: CreateCityDto): Promise<City> {
        return this.citiesService.createCity(createCityDto);
    }

    @Patch('/:id')
    updateCity(@Param('id', ParseIntPipe) cityId: number, 
    createCityDto: CreateCityDto) {
        this.citiesService.updateCity(cityId, createCityDto);
        return null;
    }

    @Patch('/:id/add-forecast')
    addNewForecastToCity(@Param('id', ParseIntPipe) cityId: number, 
    @Body() createForecastDto: CreateForecastDto) {
        
        this.citiesService.addNewForeCastToCity(cityId, createForecastDto);
        return null;
    }

    @Patch('/:id/lock')
    lockCity(@Param('id', ParseIntPipe) cityId: number) {
        
        this.citiesService.lockCity(cityId);
        return null;
    }

    @Patch('/:id/unlock')
    unlockCity(@Param('id', ParseIntPipe) cityId: number) {
        
        this.citiesService.unlockCity(cityId);
        return null;
    }

    @Delete('/:id')
    deleteCity(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.citiesService.deleteCity(id);
    }

    @Delete('/:id/last-forecast')
    deleteLastForecast(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.citiesService.deleteLastForecast(id);
    }

    
}