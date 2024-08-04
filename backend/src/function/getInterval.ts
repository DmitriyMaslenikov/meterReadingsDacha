// import { DataSource } from 'typeorm';
import { Year } from '../years/year.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';

export const GetInterval = async () => {
  const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER_NAME,
    password: process.env.DB_USER_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Year],
    synchronize: true,
    logging: true,
  });

  AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err);
    });

  const firstUser = await AppDataSource.getRepository(Year)
    .createQueryBuilder('year')
    // .where("user.id = :id", { id: 1 })
    .getOne();
};
