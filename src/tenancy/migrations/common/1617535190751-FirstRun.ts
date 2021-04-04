import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstRun1617535190751 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.user (
        id SERIAL PRIMARY KEY,
        username VARCHAR NOT NULL
      );
    `);

    await queryRunner.query(`
      CREATE TABLE tenant (
        id SERIAL PRIMARY KEY,
        code VARCHAR NOT NULL,
        host VARCHAR NOT NULL,
        port VARCHAR NOT NULL,
        username VARCHAR NOT NULL,
        password VARCHAR NOT NULL,
        database VARCHAR NOT NULL
      );
    `);

    await queryRunner.query(`
      INSERT INTO tenant (
        code,
        host,
        port,
        username,
        password,
        database
      )  VALUES (
        '1fe1e39e-4015-4303-a719-6c91d32dd1aa',
        'localhost',
        5433,
        'username',
        'password',
        'T-1fe1e39e-4015-4303-a719-6c91d32dd1aa'
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('// TODO: FirstRun-DOWN');
  }
}
