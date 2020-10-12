import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class User1601992259125 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'text',
            isNullable: true
          },
          {
            name: 'username',
            type: 'text',
            isNullable: false,
            isUnique: true
          },
          {
            name: 'password',
            type: 'char(60)',
            isNullable: false
          },
          {
            name: 'active',
            type: 'boolean',
            isNullable: false,
            default: true
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            isNullable: false
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            isNullable: false
          }
        ]
      }),
      true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users', true, true, true)
  }
}
