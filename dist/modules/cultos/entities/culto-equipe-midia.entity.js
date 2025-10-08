"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CultoEquipeMidia = exports.TipoEquipeMidia = void 0;
const typeorm_1 = require("typeorm");
const culto_entity_1 = require("./culto.entity");
const pessoa_entity_1 = require("../../pessoas/entities/pessoa.entity");
var TipoEquipeMidia;
(function (TipoEquipeMidia) {
    TipoEquipeMidia["FOTOGRAFIA"] = "fotografia";
    TipoEquipeMidia["MESA_SOM"] = "mesa_som";
    TipoEquipeMidia["DATA_SHOW"] = "data_show";
})(TipoEquipeMidia || (exports.TipoEquipeMidia = TipoEquipeMidia = {}));
let CultoEquipeMidia = class CultoEquipeMidia {
};
exports.CultoEquipeMidia = CultoEquipeMidia;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CultoEquipeMidia.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'culto_id', nullable: false }),
    __metadata("design:type", String)
], CultoEquipeMidia.prototype, "cultoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pessoa_id', nullable: false }),
    __metadata("design:type", String)
], CultoEquipeMidia.prototype, "pessoaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: TipoEquipeMidia, nullable: false }),
    __metadata("design:type", String)
], CultoEquipeMidia.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => culto_entity_1.Culto, (culto) => culto.equipeMidia, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'culto_id' }),
    __metadata("design:type", culto_entity_1.Culto)
], CultoEquipeMidia.prototype, "culto", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pessoa_entity_1.Pessoa, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'pessoa_id' }),
    __metadata("design:type", pessoa_entity_1.Pessoa)
], CultoEquipeMidia.prototype, "pessoa", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], CultoEquipeMidia.prototype, "createdAt", void 0);
exports.CultoEquipeMidia = CultoEquipeMidia = __decorate([
    (0, typeorm_1.Entity)('cultos_equipe_midia')
], CultoEquipeMidia);
//# sourceMappingURL=culto-equipe-midia.entity.js.map