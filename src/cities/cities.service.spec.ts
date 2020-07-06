import { Test } from '@nestjs/testing'
import { CitiesService } from './cities.service'
import { CityRepository } from './city.repository';

const mockCityRepository = () => ({
   
});

describe('City service', () => {
    let citiesService;
    let cityRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                CitiesService,
                { provide: CityRepository, useFactory: mockCityRepository }
            ]
        }).compile();

        citiesService = await module.get<CitiesService>(CitiesService);
        cityRepository = await module.get<CityRepository>(CityRepository);
    });

    
})