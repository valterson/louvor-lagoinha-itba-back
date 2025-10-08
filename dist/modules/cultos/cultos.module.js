"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CultosModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cultos_service_1 = require("./cultos.service");
const cultos_controller_1 = require("./cultos.controller");
const culto_entity_1 = require("./entities/culto.entity");
const culto_musica_entity_1 = require("./entities/culto-musica.entity");
const culto_banda_entity_1 = require("./entities/culto-banda.entity");
const culto_equipe_midia_entity_1 = require("./entities/culto-equipe-midia.entity");
const musicas_module_1 = require("../musicas/musicas.module");
const pessoas_module_1 = require("../pessoas/pessoas.module");
let CultosModule = class CultosModule {
};
exports.CultosModule = CultosModule;
exports.CultosModule = CultosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                culto_entity_1.Culto,
                culto_musica_entity_1.CultoMusica,
                culto_banda_entity_1.CultoBanda,
                culto_equipe_midia_entity_1.CultoEquipeMidia,
            ]),
            musicas_module_1.MusicasModule,
            pessoas_module_1.PessoasModule,
        ],
        controllers: [cultos_controller_1.CultosController],
        providers: [cultos_service_1.CultosService],
        exports: [cultos_service_1.CultosService],
    })
], CultosModule);
//# sourceMappingURL=cultos.module.js.map