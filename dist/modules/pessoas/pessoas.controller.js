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
exports.PessoasController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pessoas_service_1 = require("./pessoas.service");
const create_pessoa_dto_1 = require("./dto/create-pessoa.dto");
const update_pessoa_dto_1 = require("./dto/update-pessoa.dto");
const pessoa_entity_1 = require("./entities/pessoa.entity");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let PessoasController = class PessoasController {
    pessoasService;
    constructor(pessoasService) {
        this.pessoasService = pessoasService;
    }
    create(createPessoaDto) {
        return this.pessoasService.create(createPessoaDto);
    }
    findAll() {
        return this.pessoasService.findAll();
    }
    findOne(id) {
        return this.pessoasService.findOne(id);
    }
    findByInstrumento(instrumento) {
        return this.pessoasService.findByInstrumento(instrumento);
    }
    findVocalistas() {
        return this.pessoasService.findVocalistas();
    }
    findByHabilidade(habilidade) {
        return this.pessoasService.findByHabilidade(habilidade);
    }
    update(id, updatePessoaDto) {
        return this.pessoasService.update(id, updatePessoaDto);
    }
    remove(id) {
        return this.pessoasService.remove(id);
    }
};
exports.PessoasController = PessoasController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar uma nova pessoa' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Pessoa criada com sucesso',
        type: pessoa_entity_1.Pessoa,
    }),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pessoa_dto_1.CreatePessoaDto]),
    __metadata("design:returntype", Promise)
], PessoasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todas as pessoas' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de pessoas', type: [pessoa_entity_1.Pessoa] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PessoasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar pessoa por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pessoa encontrada', type: pessoa_entity_1.Pessoa }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pessoa não encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PessoasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('instrumento/:instrumento'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar pessoas por instrumento' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de pessoas', type: [pessoa_entity_1.Pessoa] }),
    __param(0, (0, common_1.Param)('instrumento')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PessoasController.prototype, "findByInstrumento", null);
__decorate([
    (0, common_1.Get)('vocalistas'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar vocalistas' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de vocalistas',
        type: [pessoa_entity_1.Pessoa],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PessoasController.prototype, "findVocalistas", null);
__decorate([
    (0, common_1.Get)('habilidade/:habilidade'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar pessoas por habilidade de mídia' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de pessoas', type: [pessoa_entity_1.Pessoa] }),
    __param(0, (0, common_1.Param)('habilidade')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PessoasController.prototype, "findByHabilidade", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar pessoa' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Pessoa atualizada com sucesso',
        type: pessoa_entity_1.Pessoa,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pessoa não encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_pessoa_dto_1.UpdatePessoaDto]),
    __metadata("design:returntype", Promise)
], PessoasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Deletar pessoa' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pessoa deletada com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pessoa não encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PessoasController.prototype, "remove", null);
exports.PessoasController = PessoasController = __decorate([
    (0, swagger_1.ApiTags)('pessoas'),
    (0, common_1.Controller)('pessoas'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [pessoas_service_1.PessoasService])
], PessoasController);
//# sourceMappingURL=pessoas.controller.js.map