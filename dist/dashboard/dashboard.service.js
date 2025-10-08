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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const musica_entity_1 = require("../modules/musicas/entities/musica.entity");
const pessoa_entity_1 = require("../modules/pessoas/entities/pessoa.entity");
const culto_entity_1 = require("../modules/cultos/entities/culto.entity");
const culto_banda_entity_1 = require("../modules/cultos/entities/culto-banda.entity");
let DashboardService = class DashboardService {
    constructor(musicaRepository, pessoaRepository, cultoRepository, cultoBandaRepository) {
        this.musicaRepository = musicaRepository;
        this.pessoaRepository = pessoaRepository;
        this.cultoRepository = cultoRepository;
        this.cultoBandaRepository = cultoBandaRepository;
    }
    async getEstatisticas() {
        const [totalMusicas, totalPessoas, totalCultos] = await Promise.all([
            this.musicaRepository.count(),
            this.pessoaRepository.count(),
            this.cultoRepository.count(),
        ]);
        const proximosCultos = await this.cultoRepository
            .createQueryBuilder('culto')
            .where('culto.data >= :today', { today: new Date() })
            .orderBy('culto.data', 'ASC')
            .limit(5)
            .getMany();
        return {
            totalMusicas,
            totalPessoas,
            totalCultos,
            proximosCultos,
        };
    }
    async getMusicasMaisTocadas() {
        const result = await this.cultoRepository
            .createQueryBuilder('culto')
            .leftJoin('culto.musicas', 'cultoMusica')
            .leftJoin('cultoMusica.musica', 'musica')
            .select([
            'musica.id as musica_id',
            'musica.titulo as titulo',
            'musica.artista as artista',
            'COUNT(cultoMusica.musicaId) as count',
        ])
            .where('musica.id IS NOT NULL')
            .groupBy('musica.id')
            .addGroupBy('musica.titulo')
            .addGroupBy('musica.artista')
            .orderBy('count', 'DESC')
            .limit(10)
            .getRawMany();
        return result.map((item) => ({
            musica: {
                id: item.musica_id,
                titulo: item.titulo,
                artista: item.artista,
            },
            count: parseInt(item.count),
        }));
    }
    async getParticipacaoPessoas() {
        const result = await this.cultoBandaRepository
            .createQueryBuilder('cultoBanda')
            .leftJoin('cultoBanda.pessoa', 'pessoa')
            .select([
            'pessoa.id as pessoa_id',
            'pessoa.nome as nome',
            'COUNT(cultoBanda.pessoaId) as count',
        ])
            .groupBy('pessoa.id')
            .addGroupBy('pessoa.nome')
            .orderBy('count', 'DESC')
            .limit(10)
            .getRawMany();
        return result.map((item) => ({
            pessoa: {
                id: item.pessoa_id,
                nome: item.nome,
            },
            count: parseInt(item.count),
        }));
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(musica_entity_1.Musica)),
    __param(1, (0, typeorm_1.InjectRepository)(pessoa_entity_1.Pessoa)),
    __param(2, (0, typeorm_1.InjectRepository)(culto_entity_1.Culto)),
    __param(3, (0, typeorm_1.InjectRepository)(culto_banda_entity_1.CultoBanda)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map