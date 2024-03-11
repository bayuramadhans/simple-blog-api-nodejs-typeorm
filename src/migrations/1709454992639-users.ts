import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1709454992639 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE users(
                "id" SERIAL PRIMARY KEY,
                "name" varchar(50) NOT NULL,
                "email" varchar(50) NOT NULL,
                "password" text NOT NULL,
                "role" varchar(50) NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
            )`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`)
    }

}
