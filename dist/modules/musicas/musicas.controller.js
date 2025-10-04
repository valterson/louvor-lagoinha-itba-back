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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicasController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const musicas_service_1 = require("./musicas.service");
const create_musica_dto_1 = require("./dto/create-musica.dto");
const update_musica_dto_1 = require("./dto/update-musica.dto");
const musica_entity_1 = require("./entities/musica.entity");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let MusicasController = class MusicasController {
    musicasService;
    constructor(musicasService) {
        this.musicasService = musicasService;
    }
    create(createMusicaDto) {
        return this.musicasService.create(createMusicaDto);
    }
    findAll() {
        return this.musicasService.findAll();
    }
    findOne(id) {
        return this.musicasService.findOne(id);
    }
    update(id, updateMusicaDto) {
        return this.musicasService.update(id, updateMusicaDto);
    }
    remove(id) {
        return this.musicasService.remove(id);
    }
};
exports.MusicasController = MusicasController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar uma nova música' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Música criada com sucesso',
        type: musica_entity_1.Musica,
    }),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_musica_dto_1.CreateMusicaDto]),
    __metadata("design:returntype", Promise)
], MusicasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todas as músicas' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de músicas', type: [musica_entity_1.Musica] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MusicasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar música por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Música encontrada', type: musica_entity_1.Musica }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Música não encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MusicasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar música' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Música atualizada com sucesso',
        type: musica_entity_1.Musica,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Música não encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_musica_dto_1.UpdateMusicaDto]),
    __metadata("design:returntype", Promise)
], MusicasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Deletar música' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Música deletada com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Música não encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MusicasController.prototype, "remove", null);
exports.MusicasController = MusicasController = __decorate([
    (0, swagger_1.ApiTags)('musicas'),
    (0, common_1.Controller)('musicas'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [musicas_service_1.MusicasService])
], MusicasController);
//# sourceMappingURL=musicas.controller.js.map