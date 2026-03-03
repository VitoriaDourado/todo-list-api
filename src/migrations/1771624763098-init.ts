import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1771624763098 implements MigrationInterface {
  name = 'Init1771624763098';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "todo_list"
      ADD "user_id" uuid
    `);

    await queryRunner.query(`
      ALTER TABLE "todo_list"
      ADD CONSTRAINT "FK_875f735cfedb1c34d69670b2869"
      FOREIGN KEY ("user_id")
      REFERENCES "users"("id")
      ON DELETE CASCADE
      ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "todo_list"
      DROP CONSTRAINT "FK_875f735cfedb1c34d69670b2869"
    `);

    await queryRunner.query(`
      ALTER TABLE "todo_list"
      DROP COLUMN "user_id"
    `);
  }
}