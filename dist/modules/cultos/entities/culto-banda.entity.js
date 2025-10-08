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
exports.CultoBanda = exports.TipoBanda = void 0;
const typeorm_1 = require("typeorm");
const culto_entity_1 = require("./culto.entity");
const pessoa_entity_1 = require("../../pessoas/entities/pessoa.entity");
var TipoBanda;
(function (TipoBanda) {
    TipoBanda["INSTRUMENTO"] = "instrumento";
    TipoBanda["VOZ"] = "voz";
})(TipoBanda || (exports.TipoBanda = TipoBanda = {}));
let CultoBanda = class CultoBanda {
};
exports.CultoBanda = CultoBanda;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CultoBanda.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'culto_id', nullable: false }),
    __metadata("design:type", String)
], CultoBanda.prototype, "cultoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pessoa_id', nullable: false }),
    __metadata("design:type", String)
], CultoBanda.prototype, "pessoaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: TipoBanda, nullable: false }),
    __metadata("design:type", String)
], CultoBanda.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], CultoBanda.prototype, "instrumento", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => culto_entity_1.Culto, (culto) => culto.banda),
    (0, typeorm_1.JoinColumn)({ name: 'culto_id' }),
    __metadata("design:type", culto_entity_1.Culto)
], CultoBanda.prototype, "culto", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pessoa_entity_1.Pessoa),
    (0, typeorm_1.JoinColumn)({ name: 'pessoa_id' }),
    __metadata("design:type", pessoa_entity_1.Pessoa)
], CultoBanda.prototype, "pessoa", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], CultoBanda.prototype, "createdAt", void 0);
exports.CultoBanda = CultoBanda = __decorate([
    (0, typeorm_1.Entity)('cultos_banda')
], CultoBanda);
//# sourceMappingURL=culto-banda.entity.js.map