import { MigrationInterface, QueryRunner } from "typeorm";

export class default1658260550318 implements MigrationInterface {
  name = "default1658260550318";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`account_transactions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`value\` decimal(7,2) NOT NULL, \`type\` enum ('deposit', 'withdraw') NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`accountId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`clients\` (\`codClient\` int NOT NULL, \`name\` text NOT NULL, \`surname\` text NOT NULL, \`email\` varchar(100) NOT NULL, \`password\` text NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_b48860677afe62cd96e1265948\` (\`email\`), PRIMARY KEY (\`codClient\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`stocks\` (\`codStock\` int NOT NULL, \`name\` text NOT NULL, \`value\` decimal(7,2) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`codStock\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`stocks_transactions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`value\` decimal(7,2) NOT NULL, \`type\` enum ('buy', 'sell') NOT NULL, \`quantity\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`codStock\` int NULL, \`accountId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`accounts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`codClient\` int NULL, UNIQUE INDEX \`REL_1969ee7b2f504d6dcccd5fe83e\` (\`codClient\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`account_transactions\` ADD CONSTRAINT \`FK_97a62f457a481122e4d262e3884\` FOREIGN KEY (\`accountId\`) REFERENCES \`accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`stocks_transactions\` ADD CONSTRAINT \`FK_16dd9d06128412325c2d35de176\` FOREIGN KEY (\`codStock\`) REFERENCES \`stocks\`(\`codStock\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`stocks_transactions\` ADD CONSTRAINT \`FK_ccc7a18392a5cf36c76b81288ec\` FOREIGN KEY (\`accountId\`) REFERENCES \`accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`accounts\` ADD CONSTRAINT \`FK_1969ee7b2f504d6dcccd5fe83e8\` FOREIGN KEY (\`codClient\`) REFERENCES \`clients\`(\`codClient\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`accounts\` DROP FOREIGN KEY \`FK_1969ee7b2f504d6dcccd5fe83e8\``
    );
    await queryRunner.query(
      `ALTER TABLE \`stocks_transactions\` DROP FOREIGN KEY \`FK_ccc7a18392a5cf36c76b81288ec\``
    );
    await queryRunner.query(
      `ALTER TABLE \`stocks_transactions\` DROP FOREIGN KEY \`FK_16dd9d06128412325c2d35de176\``
    );
    await queryRunner.query(
      `ALTER TABLE \`account_transactions\` DROP FOREIGN KEY \`FK_97a62f457a481122e4d262e3884\``
    );
    await queryRunner.query(
      `DROP INDEX \`REL_1969ee7b2f504d6dcccd5fe83e\` ON \`accounts\``
    );
    await queryRunner.query(`DROP TABLE \`accounts\``);
    await queryRunner.query(`DROP TABLE \`stocks_transactions\``);
    await queryRunner.query(`DROP TABLE \`stocks\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_b48860677afe62cd96e1265948\` ON \`clients\``
    );
    await queryRunner.query(`DROP TABLE \`clients\``);
    await queryRunner.query(`DROP TABLE \`account_transactions\``);
  }
}
