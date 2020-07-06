import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions =  {
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'dummy',
    password: 'dummy',
    database: 'weather',
    schema: 'public',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
}