import { MigrationInterface, QueryRunner } from "typeorm";

export class default1658602218985 implements MigrationInterface {
    name = 'default1658602218985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."account_transactions_type_enum" AS ENUM('deposit', 'withdraw', 'buy-stock', 'sell-stock')`);
        await queryRunner.query(`CREATE TABLE "account_transactions" ("id" SERIAL NOT NULL, "value" numeric(7,2) NOT NULL, "type" "public"."account_transactions_type_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "accountId" integer, CONSTRAINT "PK_bcfbf02d6acfb8fe417296f010d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("codClient" integer NOT NULL, "name" text NOT NULL, "surname" text NOT NULL, "email" character varying(100) NOT NULL, "password" text NOT NULL, "isAdmin" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b48860677afe62cd96e12659482" UNIQUE ("email"), CONSTRAINT "PK_b243c6db8951e0d1ad0704af016" PRIMARY KEY ("codClient"))`);
        await queryRunner.query(`CREATE TABLE "stocks" ("codStock" integer NOT NULL, "name" text NOT NULL, "value" numeric(7,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_95c71dc612f72e5fdf7cf23ed63" PRIMARY KEY ("codStock"))`);
        await queryRunner.query(`CREATE TYPE "public"."stocks_transactions_type_enum" AS ENUM('buy', 'sell')`);
        await queryRunner.query(`CREATE TABLE "stocks_transactions" ("id" SERIAL NOT NULL, "value" numeric(7,2) NOT NULL, "type" "public"."stocks_transactions_type_enum" NOT NULL, "quantity" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "codStock" integer, "accountId" integer, CONSTRAINT "PK_5d095fa943d42ba07e3a0f8221c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "codClient" integer, CONSTRAINT "REL_1969ee7b2f504d6dcccd5fe83e" UNIQUE ("codClient"), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "account_transactions" ADD CONSTRAINT "FK_97a62f457a481122e4d262e3884" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stocks_transactions" ADD CONSTRAINT "FK_16dd9d06128412325c2d35de176" FOREIGN KEY ("codStock") REFERENCES "stocks"("codStock") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stocks_transactions" ADD CONSTRAINT "FK_ccc7a18392a5cf36c76b81288ec" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_1969ee7b2f504d6dcccd5fe83e8" FOREIGN KEY ("codClient") REFERENCES "clients"("codClient") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_1969ee7b2f504d6dcccd5fe83e8"`);
        await queryRunner.query(`ALTER TABLE "stocks_transactions" DROP CONSTRAINT "FK_ccc7a18392a5cf36c76b81288ec"`);
        await queryRunner.query(`ALTER TABLE "stocks_transactions" DROP CONSTRAINT "FK_16dd9d06128412325c2d35de176"`);
        await queryRunner.query(`ALTER TABLE "account_transactions" DROP CONSTRAINT "FK_97a62f457a481122e4d262e3884"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`DROP TABLE "stocks_transactions"`);
        await queryRunner.query(`DROP TYPE "public"."stocks_transactions_type_enum"`);
        await queryRunner.query(`DROP TABLE "stocks"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "account_transactions"`);
        await queryRunner.query(`DROP TYPE "public"."account_transactions_type_enum"`);
    }

}
