import {MigrationInterface, QueryRunner} from "typeorm";

export class test1571671263702 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "hero" DROP COLUMN "test"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "hero" ADD "test" boolean NOT NULL DEFAULT false`);
    }

}
