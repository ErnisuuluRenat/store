import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialUsersMigration1786619774657 implements MigrationInterface {
    name = 'InitialUsersMigration1786619774657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("user_id" SERIAL NOT NULL, "username" character varying(100) NOT NULL, "email" character varying(150) NOT NULL, "hashedPassword" character varying(200) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "role" character varying(20) NOT NULL DEFAULT 'customer', CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "CHK_6c2f497ceb0326f0f1669e3613" CHECK ("role" in ('customer', 'admin')), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
