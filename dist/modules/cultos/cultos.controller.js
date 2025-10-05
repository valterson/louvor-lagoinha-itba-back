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
exports.CultosController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cultos_service_1 = require("./cultos.service");
const create_culto_dto_1 = require("./dto/create-culto.dto");
const update_culto_dto_1 = require("./dto/update-culto.dto");
const culto_entity_1 = require("./entities/culto.entity");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let CultosController = class CultosController {
    constructor(cultosService) {
        this.cultosService = cultosService;
    }
    create(createCultoDto) {
        return this.cultosService.create(createCultoDto);
    }
    findAll(tipo, mes, ano) {
        return this.cultosService.findAll({
            tipo,
            mes: mes ? parseInt(mes) : undefined,
            ano: ano ? parseInt(ano) : undefined,
        });
    }
    findOne(id) {
        return this.cultosService.findOne(id);
    }
    findByMes(ano, mes) {
        return this.cultosService.findByMes(parseInt(ano), parseInt(mes));
    }
    getEscala(id) {
        return this.cultosService.getEscala(id);
    }
    update(id, updateCultoDto) {
        return this.cultosService.update(id, updateCultoDto);
    }
    remove(id) {
        return this.cultosService.remove(id);
    }
};
exports.CultosController = CultosController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Criar um novo culto' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Culto criado com sucesso',
        type: culto_entity_1.Culto,
    }),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_culto_dto_1.CreateCultoDto]),
    __metadata("design:returntype", Promise)
], CultosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos os cultos' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de cultos', type: [culto_entity_1.Culto] }),
    __param(0, (0, common_1.Query)('tipo')),
    __param(1, (0, common_1.Query)('mes')),
    __param(2, (0, common_1.Query)('ano')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], CultosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar culto por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Culto encontrado', type: culto_entity_1.Culto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CultosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('mes/:ano/:mes'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar cultos por mês e ano' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de cultos', type: [culto_entity_1.Culto] }),
    __param(0, (0, common_1.Param)('ano')),
    __param(1, (0, common_1.Param)('mes')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CultosController.prototype, "findByMes", null);
__decorate([
    (0, common_1.Get)(':id/escala'),
    (0, swagger_1.ApiOperation)({ summary: 'Gerar escala do culto' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Escala gerada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CultosController.prototype, "getEscala", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar culto' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Culto atualizado com sucesso',
        type: culto_entity_1.Culto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_culto_dto_1.UpdateCultoDto]),
    __metadata("design:returntype", Promise)
], CultosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Deletar culto' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Culto deletado com sucesso' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CultosController.prototype, "remove", null);
exports.CultosController = CultosController = __decorate([
    (0, swagger_1.ApiTags)('cultos'),
    (0, common_1.Controller)('cultos'),
    __metadata("design:paramtypes", [cultos_service_1.CultosService])
], CultosController);
