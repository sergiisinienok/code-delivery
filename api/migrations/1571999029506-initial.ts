import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable-next-line: class-name
export class initial1571999029506 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "hero" ("id" SERIAL NOT NULL,
                                                    "name" character varying(80) NOT NULL,
                                                    "alterEgo" character varying(100) NOT NULL,
                                                    "likes" integer NOT NULL DEFAULT 0,
                                                    "default" boolean NOT NULL DEFAULT false,
                                                    "avatarUrl" character varying NOT NULL DEFAULT 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_KL8OOftRUpPHj4lDJct_VG_6fj0eW8u6iZjFlxDK_blpkROj&s',
                                                    "avatarBlurredUrl" character varying NOT NULL DEFAULT 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_KL8OOftRUpPHj4lDJct_VG_6fj0eW8u6iZjFlxDK_blpkROj&s',
                                                    "avatarThumbnailUrl" character varying NOT NULL DEFAULT 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_KL8OOftRUpPHj4lDJct_VG_6fj0eW8u6iZjFlxDK_blpkROj&s', CONSTRAINT "PK_313d51d6899322b85f2df99ccde" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "hero"`);
    }

}
