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
exports.CreatePessoaDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const instrumentosValidos = [
    'bateria',
    'baixo',
    'violao',
    'guitarra',
    'teclado',
];
const habilidadesValidas = ['fotografia', 'mesa_som', 'data_show'];
class CreatePessoaDto {
    nome;
    telefone;
    instrumentos;
    is_vocalista;
    habilidades_midia;
}
exports.CreatePessoaDto = CreatePessoaDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome da pessoa',
        example: 'João Silva',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePessoaDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Telefone da pessoa',
        example: '(11) 99999-9999',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePessoaDto.prototype, "telefone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Instrumentos que a pessoa toca',
        example: ['violao', 'guitarra'],
        type: [String],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsIn)(instrumentosValidos, { each: true }),
    __metadata("design:type", Array)
], CreatePessoaDto.prototype, "instrumentos", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Se a pessoa é vocalista',
        example: true,
        default: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePessoaDto.prototype, "is_vocalista", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Habilidades em mídia',
        example: ['fotografia', 'mesa_som'],
        type: [String],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsIn)(habilidadesValidas, { each: true }),
    __metadata("design:type", Array)
], CreatePessoaDto.prototype, "habilidades_midia", void 0);
//# sourceMappingURL=create-pessoa.dto.js.map