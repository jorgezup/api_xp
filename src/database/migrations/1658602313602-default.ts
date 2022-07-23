import { MigrationInterface, QueryRunner } from "typeorm";

export class default1658602313602 implements MigrationInterface {
    name = 'default1658602313602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "isAdmin" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "isAdmin" DROP DEFAULT`);
    }

}
