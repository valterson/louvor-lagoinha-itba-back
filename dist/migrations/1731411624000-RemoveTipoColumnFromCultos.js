"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveTipoColumnFromCultos1731411624000 = void 0;
class RemoveTipoColumnFromCultos1731411624000 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "cultos" DROP COLUMN "tipo"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "cultos" ADD "tipo" character varying(255) NOT NULL`);
    }
}
exports.RemoveTipoColumnFromCultos1731411624000 = RemoveTipoColumnFromCultos1731411624000;
//# sourceMappingURL=1731411624000-RemoveTipoColumnFromCultos.js.map