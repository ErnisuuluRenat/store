import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialCategoryAndProducts1788010213563 implements MigrationInterface {
    name = 'InitialCategoryAndProducts1788010213563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("product_id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "price" numeric(10,2) NOT NULL, "quantity" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "description" character varying(500) NOT NULL, "category_id" integer NOT NULL, CONSTRAINT "CHK_4116e455ddd76b4c0ce10dcf48" CHECK ("quantity" >= 0), CONSTRAINT "CHK_ba339f178553051542254ef21d" CHECK ("price" > 0), CONSTRAINT "PK_a8940a4bf3b90bd7ac15c8f4dd9" PRIMARY KEY ("product_id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("category_id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "parent_id" integer, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_51615bef2cea22812d0dcab6e18" PRIMARY KEY ("category_id"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_88cea2dc9c31951d06437879b40" FOREIGN KEY ("parent_id") REFERENCES "categories"("category_id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_88cea2dc9c31951d06437879b40"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
