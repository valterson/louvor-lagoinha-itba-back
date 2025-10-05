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
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dashboard_service_1 = require("./dashboard.service");
const jwt_auth_guard_1 = require("../modules/auth/guards/jwt-auth.guard");
let DashboardController = class DashboardController {
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    getEstatisticas() {
        return this.dashboardService.getEstatisticas();
    }
    getMusicasMaisTocadas() {
        return this.dashboardService.getMusicasMaisTocadas();
    }
    getParticipacaoPessoas() {
        return this.dashboardService.getParticipacaoPessoas();
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)('estatisticas'),
    (0, swagger_1.ApiOperation)({ summary: 'Obter estatísticas do dashboard' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Estatísticas retornadas com sucesso',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "getEstatisticas", null);
__decorate([
    (0, common_1.Get)('musicas-mais-tocadas'),
    (0, swagger_1.ApiOperation)({ summary: 'Obter músicas mais tocadas' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de músicas mais tocadas' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "getMusicasMaisTocadas", null);
__decorate([
    (0, common_1.Get)('participacao-pessoas'),
    (0, swagger_1.ApiOperation)({ summary: 'Obter participação por pessoa' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de participação por pessoa' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "getParticipacaoPessoas", null);
exports.DashboardController = DashboardController = __decorate([
    (0, swagger_1.ApiTags)('dashboard'),
    (0, common_1.Controller)('dashboard'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardController);
