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
exports.CreateCultoDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const culto_entity_1 = require("../entities/culto.entity");
const culto_musica_entity_1 = require("../entities/culto-musica.entity");
const culto_banda_entity_1 = require("../entities/culto-banda.entity");
class CultoBandaDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID da pessoa',
        example: 'uuid-da-pessoa',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CultoBandaDto.prototype, "pessoa_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo (instrumento ou voz)',
        enum: culto_banda_entity_1.TipoBanda,
        example: culto_banda_entity_1.TipoBanda.INSTRUMENTO,
    }),
    (0, class_validator_1.IsEnum)(culto_banda_entity_1.TipoBanda),
    __metadata("design:type", String)
], CultoBandaDto.prototype, "tipo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Instrumento (se tipo for instrumento)',
        example: 'violao',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CultoBandaDto.prototype, "instrumento", void 0);
class CultoMusicaDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID da música',
        example: 'uuid-da-musica',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CultoMusicaDto.prototype, "musica_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Momento da música no culto',
        enum: culto_musica_entity_1.MomentoMusica,
        example: culto_musica_entity_1.MomentoMusica.INICIO,
    }),
    (0, class_validator_1.IsEnum)(culto_musica_entity_1.MomentoMusica),
    __metadata("design:type", String)
], CultoMusicaDto.prototype, "momento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ordem da música dentro do momento',
        example: 1,
    }),
    (0, class_validator_1.IsString)() // Note: será convertido para number no service
    ,
    __metadata("design:type", String)
], CultoMusicaDto.prototype, "ordem", void 0);
class CreateCultoDto {
}
exports.CreateCultoDto = CreateCultoDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Tipo do culto (calculado automaticamente baseado na data)',
        enum: culto_entity_1.TipoCulto,
        example: culto_entity_1.TipoCulto.DOMINGO,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(culto_entity_1.TipoCulto),
    __metadata("design:type", String)
], CreateCultoDto.prototype, "tipo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data do culto',
        example: '2024-12-29',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateCultoDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'IDs das pessoas responsáveis pela fotografia',
        example: ['uuid-da-pessoa-1', 'uuid-da-pessoa-2'],
        type: [String],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('all', { each: true }),
    __metadata("design:type", Array)
], CreateCultoDto.prototype, "fotografia_ids", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID da pessoa responsável pela mesa de som',
        example: 'uuid-da-pessoa',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateCultoDto.prototype, "mesa_som_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID da pessoa responsável pelo data show',
        example: 'uuid-da-pessoa',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateCultoDto.prototype, "data_show_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Banda do culto (instrumentos e vozes)',
        type: [CultoBandaDto],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CultoBandaDto),
    __metadata("design:type", Array)
], CreateCultoDto.prototype, "banda", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Músicas do culto',
        type: [CultoMusicaDto],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CultoMusicaDto),
    __metadata("design:type", Array)
], CreateCultoDto.prototype, "musicas", void 0);
