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
exports.CreateMusicaDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateMusicaDto {
}
exports.CreateMusicaDto = CreateMusicaDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Título da música',
        example: 'O Senhor é Bom',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMusicaDto.prototype, "titulo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Artista ou compositor da música',
        example: 'Ministério Zoe',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMusicaDto.prototype, "artista", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Link para a cifra da música',
        example: 'https://www.cifraclub.com.br/ministerio-zoe/o-senhor-e-bom/',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateMusicaDto.prototype, "link_cifra", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Link para o vídeo no YouTube',
        example: 'https://www.youtube.com/watch?v=example',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({}, { message: 'Link do YouTube deve ser uma URL válida' }),
    __metadata("design:type", String)
], CreateMusicaDto.prototype, "link_youtube", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(10, { message: 'Tom deve ter no máximo 10 caracteres' }),
    __metadata("design:type", String)
], CreateMusicaDto.prototype, "tom", void 0);
//# sourceMappingURL=create-musica.dto.js.map