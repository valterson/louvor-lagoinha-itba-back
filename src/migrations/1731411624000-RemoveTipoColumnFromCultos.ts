import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveTipoColumnFromCultos1731411624000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cultos" DROP COLUMN "tipo"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cultos" ADD "tipo" character varying(255) NOT NULL`);
    }

}
