import { Injectable, NotFoundException, NotAcceptableException } from '@nestjs/common';

import { CityRepository } from './city.repository';
import { City } from './city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCityDto } from './dtos/create-city.dto';
import { CreateForecastDto } from '../forecasts/dtos/create-forecast.dto';
import { ForecastType } from '../forecasts/forecast-type.enum';
import { Forecast } from '../forecasts/forecast.entity';

@Injectable()
export class CitiesService {
    constructor(
        @InjectRepository(CityRepository)
        private cityRepository: CityRepository) {
    }

    async getAllCities() {
        const cities = await this.cityRepository.createQueryBuilder('cities').leftJoinAndSelect("cities.forecasts", "forecasts", "forecasts.from IS NOT NULL").orderBy({
            'forecasts.id': 'DESC'
        }).getMany();

        cities.map(function(cty){
            cty.forecasts.splice(1,cty.forecasts.length);
        });

        return cities
    }

    async getSingleCity(id: number): Promise<City> {
        const city = await this.cityRepository.createQueryBuilder('cities').leftJoinAndSelect("cities.forecasts", "forecasts", "forecasts.from IS NOT NULL").where("cities.id = :id", { id: id }).orderBy({
            'forecasts.id': 'DESC'
        }).getOne();

        if (!city) {
            throw new NotFoundException('City with ID ' + id + ' not found');
        }

        return city;
    }

    async createCity(createCityDto: CreateCityDto): Promise<City> {
        return this.cityRepository.createCity(createCityDto);
    }

    async deleteCity(id: number): Promise<void>  {
       const city = await this.getSingleCity(id);

       if (city && city.locked) {
            throw new NotAcceptableException('City cannot be deleted as its locked!');
       } else {
        const result = this.cityRepository.delete(id);
        if (!result) {
            throw new NotFoundException('City with ID ' + id + ' not found');
        }
       }
       
    }

    async updateCity(id: number, createCityDto ) {
        const city = await this.getSingleCity(id);

        if (city && !city.locked) {
            const { name, timezone } = createCityDto;
            city.name = name;
            city.timezone = timezone;
            await city.save();
        } else {
            throw new NotAcceptableException('City cannot be updated as its locked!');
        }
       
        return city;
    }

    async addNewForeCastToCity( id: number, createForecastDto: CreateForecastDto ) {
        const city = await this.getSingleCity(id);
        
        const { forecast, from, to } = createForecastDto;

        if (new Date(from) > new Date(to)) {
            throw new NotAcceptableException('Forecast from date cannot be bigger than to date!');
        }
        const newForecast = new Forecast();
        newForecast.city = city;
        newForecast.forecast = ForecastType[forecast];
        newForecast.from = from;
        newForecast.to = to;
        city.forecasts.push(newForecast); 
        await city.save();
        return city;
    }

    async lockCity(id: number) {
        const city = await this.getSingleCity(id);
        if (city && city.locked) {
            throw new NotAcceptableException('City with ID ' + id + ' is already locked or not found!');
        } else {
            city.locked = true;
            city.locked_at = new Date();
            city.save();
        }
        return city
    }

    async unlockCity(id: number) {
        const city = await this.getSingleCity(id);
        let tenMinutesAdded = new Date(city.locked_at.getTime() + 10*60000); 
        if (city && city.locked && tenMinutesAdded > new Date() ) {
            throw new NotAcceptableException('City cannot be unlocked yet!');
        } else {
            city.locked = false;
            city.save();
        }
    }

    async getLockedCities() {
        const cities = await this.cityRepository.createQueryBuilder('cities').where("cities.locked = :locked", {locked: true}).select(["cities.id", "cities.name"]).getMany();

        return cities
    }

    async deleteLastForecast(id: number) {
        const city = await this.getSingleCity(id);

        await this.cityRepository.createQueryBuilder().relation(City, 'forecasts').of(id).remove(city.forecasts[0].id);
        
        return null
    }

}