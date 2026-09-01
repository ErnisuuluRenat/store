import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'alpha',
  database: 'store',
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/db/migrations/*.ts'],
});

export default AppDataSource;