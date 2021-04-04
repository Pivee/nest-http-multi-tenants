import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstRun1617535726925 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE product (
      id SERIAL PRIMARY KEY,
      name VARCHAR NOT NULL
    );
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('// TODO: FirstRun-DOWN');
  }
}
