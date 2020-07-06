import { City } from './city.entity';
import { EntityRepository, Repository } from "typeorm";
import { CreateCityDto } from './dtos/create-city.dto';

@EntityRepository(City)
export class CityRepository extends Repository<City> {
    
    async createCity(createCityDto: CreateCityDto): Promise<City> {
        const { name, timezone, locked, locked_at } = createCityDto;

        const city = new City();
        city.name = name;
        city.timezone = timezone;
        if (locked) {
            city.locked = locked;
            city.locked_at = locked_at;
        }
       
        await city.save();

        return city
    }
}