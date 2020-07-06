import { Forecast } from './forecast.entity';
import { EntityRepository, Repository, createConnection } from "typeorm";

@EntityRepository(Forecast)
export class ForecastRepository extends Repository<Forecast> {
    

  
   
}