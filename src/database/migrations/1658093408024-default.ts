import { MigrationInterface, QueryRunner } from "typeorm";

export class default1658093408024 implements MigrationInterface {
    name = 'default1658093408024'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`accounts\` DROP FOREIGN KEY \`FK_099611aae88727aaa8369983f02\``);
        await queryRunner.query(`ALTER TABLE \`accounts\` ADD UNIQUE INDEX \`IDX_099611aae88727aaa8369983f0\` (\`client_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_099611aae88727aaa8369983f0\` ON \`accounts\` (\`client_id\`)`);
        await queryRunner.query(`ALTER TABLE \`accounts\` ADD CONSTRAINT \`FK_099611aae88727aaa8369983f02\` FOREIGN KEY (\`client_id\`) REFERENCES \`clients\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`accounts\` DROP FOREIGN KEY \`FK_099611aae88727aaa8369983f02\``);
        await queryRunner.query(`DROP INDEX \`REL_099611aae88727aaa8369983f0\` ON \`accounts\``);
        await queryRunner.query(`ALTER TABLE \`accounts\` DROP INDEX \`IDX_099611aae88727aaa8369983f0\``);
        await queryRunner.query(`ALTER TABLE \`accounts\` ADD CONSTRAINT \`FK_099611aae88727aaa8369983f02\` FOREIGN KEY (\`client_id\`) REFERENCES \`clients\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
