import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import {City} from "../cities/city.entity";

export enum ForecastType {
    Sunny = 'Sunny',
    Cloudy = 'Cloudy',
    Stormy = 'Stormy'
}

@Entity()
export class Forecast extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    forecast: ForecastType;

    @Column()
    from: Date;

    @Column()
    to: Date;

    @ManyToOne(type => City, city => city.forecasts, { 
        onDelete: 'CASCADE'
     })
    city: City;
}

