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
exports.MusicasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const musica_entity_1 = require("./entities/musica.entity");
const text_utils_1 = require("../../utils/text-utils");
let MusicasService = class MusicasService {
    constructor(musicaRepository) {
        this.musicaRepository = musicaRepository;
    }
    async create(createMusicaDto) {
        await this.validateUniqueTitle(createMusicaDto.titulo);
        const musica = this.musicaRepository.create(createMusicaDto);
        return await this.musicaRepository.save(musica);
    }
    async findAll() {
        return await this.musicaRepository.find({
            order: { titulo: 'ASC' },
        });
    }
    async findOne(id) {
        const musica = await this.musicaRepository.findOne({ where: { id } });
        if (!musica) {
            throw new common_1.NotFoundException(`Música com ID ${id} não encontrada`);
        }
        return musica;
    }
    async update(id, updateMusicaDto) {
        const musica = await this.findOne(id);
        if (updateMusicaDto.titulo && updateMusicaDto.titulo !== musica.titulo) {
            await this.validateUniqueTitle(updateMusicaDto.titulo, id);
        }
        Object.assign(musica, updateMusicaDto);
        return await this.musicaRepository.save(musica);
    }
    async remove(id) {
        const musica = await this.findOne(id);
        await this.musicaRepository.remove(musica);
    }
    async validateUniqueTitle(titulo, excludeId) {
        const existingMusicas = await this.musicaRepository.find();
        const duplicateMusica = existingMusicas.find(musica => {
            if (excludeId && musica.id === excludeId) {
                return false;
            }
            return (0, text_utils_1.textEquals)(musica.titulo, titulo);
        });
        if (duplicateMusica) {
            throw new common_1.ConflictException(`Já existe uma música com o título "${duplicateMusica.titulo}". Não é possível cadastrar músicas com títulos similares.`);
        }
    }
};
exports.MusicasService = MusicasService;
exports.MusicasService = MusicasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(musica_entity_1.Musica)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MusicasService);
//# sourceMappingURL=musicas.service.js.map