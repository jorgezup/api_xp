import { MigrationInterface, QueryRunner } from "typeorm";

export class default1658091648196 implements MigrationInterface {
    name = 'default1658091648196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`clients\` (\`id\` int NOT NULL AUTO_INCREMENT, \`codClient\` int NOT NULL, \`name\` text NOT NULL, \`surname\` text NOT NULL, \`email\` text NOT NULL, \`password\` text NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_b243c6db8951e0d1ad0704af01\` (\`codClient\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`accounts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`codClient\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`client_id\` int NULL, UNIQUE INDEX \`IDX_1969ee7b2f504d6dcccd5fe83e\` (\`codClient\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`accounts\` ADD CONSTRAINT \`FK_099611aae88727aaa8369983f02\` FOREIGN KEY (\`client_id\`) REFERENCES \`clients\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`accounts\` DROP FOREIGN KEY \`FK_099611aae88727aaa8369983f02\``);
        await queryRunner.query(`DROP INDEX \`IDX_1969ee7b2f504d6dcccd5fe83e\` ON \`accounts\``);
        await queryRunner.query(`DROP TABLE \`accounts\``);
        await queryRunner.query(`DROP INDEX \`IDX_b243c6db8951e0d1ad0704af01\` ON \`clients\``);
        await queryRunner.query(`DROP TABLE \`clients\``);
    }

}
