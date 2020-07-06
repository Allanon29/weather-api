import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CitiesModule } from './cities/cities.module';
import { ForecastsModule } from './forecasts/forecasts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CitiesModule,
    ForecastsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
