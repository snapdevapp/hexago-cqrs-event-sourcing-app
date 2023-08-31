import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class CreateClientsTable1693451104240 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.createTable(
      new Table({
        name: 'clients',
        columns: [
          new TableColumn({ name: 'id', type: 'uuid', isPrimary: true, isGenerated: true, generationStrategy: 'uuid' }),
          new TableColumn({ name: 'email', type: 'varchar', isNullable: false, isUnique: true }),
          new TableColumn({ name: 'firstname', type: 'varchar', isNullable: false }),
          new TableColumn({ name: 'lastname', type: 'varchar', isNullable: false }),
          new TableColumn({ name: 'gender', type: 'varchar', isNullable: false }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(`clients`);
  }
}
