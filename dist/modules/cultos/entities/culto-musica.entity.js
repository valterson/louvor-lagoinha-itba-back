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
exports.CultoMusica = exports.MomentoMusica = void 0;
const typeorm_1 = require("typeorm");
const culto_entity_1 = require("./culto.entity");
const musica_entity_1 = require("../../musicas/entities/musica.entity");
var MomentoMusica;
(function (MomentoMusica) {
    MomentoMusica["INICIO"] = "inicio";
    MomentoMusica["DIZIMO"] = "dizimo";
    MomentoMusica["CRIANCAS"] = "criancas";
    MomentoMusica["FINAL"] = "final";
})(MomentoMusica || (exports.MomentoMusica = MomentoMusica = {}));
let CultoMusica = class CultoMusica {
};
exports.CultoMusica = CultoMusica;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CultoMusica.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'culto_id', nullable: false }),
    __metadata("design:type", String)
], CultoMusica.prototype, "cultoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'musica_id', nullable: false }),
    __metadata("design:type", String)
], CultoMusica.prototype, "musicaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: MomentoMusica, nullable: false }),
    __metadata("design:type", String)
], CultoMusica.prototype, "momento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], CultoMusica.prototype, "ordem", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => culto_entity_1.Culto, (culto) => culto.musicas),
    (0, typeorm_1.JoinColumn)({ name: 'culto_id' }),
    __metadata("design:type", culto_entity_1.Culto)
], CultoMusica.prototype, "culto", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => musica_entity_1.Musica),
    (0, typeorm_1.JoinColumn)({ name: 'musica_id' }),
    __metadata("design:type", musica_entity_1.Musica)
], CultoMusica.prototype, "musica", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], CultoMusica.prototype, "createdAt", void 0);
exports.CultoMusica = CultoMusica = __decorate([
    (0, typeorm_1.Entity)('cultos_musicas')
], CultoMusica);
