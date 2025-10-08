"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicasModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const musicas_service_1 = require("./musicas.service");
const musicas_controller_1 = require("./musicas.controller");
const musica_entity_1 = require("./entities/musica.entity");
let MusicasModule = class MusicasModule {
};
exports.MusicasModule = MusicasModule;
exports.MusicasModule = MusicasModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([musica_entity_1.Musica])],
        controllers: [musicas_controller_1.MusicasController],
        providers: [musicas_service_1.MusicasService],
        exports: [musicas_service_1.MusicasService],
    })
], MusicasModule);
//# sourceMappingURL=musicas.module.js.map