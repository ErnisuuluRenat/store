import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialCartItemsCart1788266802569 implements MigrationInterface {
    name = 'InitialCartItemsCart1788266802569'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart_items" ("cart_item_id" SERIAL NOT NULL, "quantity" integer NOT NULL DEFAULT '1', "cart_id" integer NOT NULL, "product_id" integer NOT NULL, CONSTRAINT "UQ_dba960dbfd8636893d3c7acb18d" UNIQUE ("cart_id", "product_id"), CONSTRAINT "CHK_95a32d5da767e838c79c7da477" CHECK ("quantity" >= 1), CONSTRAINT "PK_136052dba9e33c62b93c6a291f8" PRIMARY KEY ("cart_item_id"))`);
        await queryRunner.query(`CREATE TABLE "carts" ("cart_id" SERIAL NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "REL_2ec1c94a977b940d85a4f498ae" UNIQUE ("user_id"), CONSTRAINT "PK_2fb47cbe0c6f182bb31c66689e9" PRIMARY KEY ("cart_id"))`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "FK_6385a745d9e12a89b859bb25623" FOREIGN KEY ("cart_id") REFERENCES "carts"("cart_id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "FK_30e89257a105eab7648a35c7fce" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_2ec1c94a977b940d85a4f498aea" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_2ec1c94a977b940d85a4f498aea"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "FK_30e89257a105eab7648a35c7fce"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "FK_6385a745d9e12a89b859bb25623"`);
        await queryRunner.query(`DROP TABLE "carts"`);
        await queryRunner.query(`DROP TABLE "cart_items"`);
    }

}
