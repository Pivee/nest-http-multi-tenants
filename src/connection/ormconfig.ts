import { ConnectionOptions } from 'typeorm';

export const ormconfig: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
};
