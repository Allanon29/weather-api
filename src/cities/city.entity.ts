import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import {Forecast} from "../forecasts/forecast.entity";

@Entity()
export class City extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    timezone: string;

    @Column({
        name: 'Locked',
        type: 'boolean',
        nullable: true
    })
    locked: boolean;

    @Column({
        name: 'Locked at',
        type: 'boolean',
        nullable: true
    })
    locked_at: Date;

    @OneToMany(type => Forecast, forecast => forecast.city, { cascade: true })
    forecasts: Forecast[];
}