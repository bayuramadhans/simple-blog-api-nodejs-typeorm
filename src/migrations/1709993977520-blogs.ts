import { MigrationInterface, QueryRunner } from "typeorm";

export class Blogs1709993977520 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE blogs(
                "id" SERIAL PRIMARY KEY,
                "title" varchar(50) NOT NULL,
                "content" text NOT NULL,
                "userId" integer NOT NULL,
                "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
            )`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "blogs"`);
    }

}
