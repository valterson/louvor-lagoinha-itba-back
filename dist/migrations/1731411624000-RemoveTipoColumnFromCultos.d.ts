import { MigrationInterface, QueryRunner } from "typeorm";
export declare class RemoveTipoColumnFromCultos1731411624000 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
