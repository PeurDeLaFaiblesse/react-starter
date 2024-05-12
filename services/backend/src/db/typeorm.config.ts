import configuration from '@config/configuration';
import { DataSource, DataSourceOptions } from 'typeorm';

const config = configuration();
const database = config.database;

const DATABASE_CONFIG: DataSourceOptions = {
  type: 'postgres',
  host: database.host,
  port: database.port,
  username: database.username,
  password: database.password,
  database: database.db_name,
  entities: ['dist/src/**/*.entity{.ts,.js}'],
  migrations: ['dist/src/db/migrations/*{.ts,.js}'],
};

export default new DataSource(DATABASE_CONFIG);
