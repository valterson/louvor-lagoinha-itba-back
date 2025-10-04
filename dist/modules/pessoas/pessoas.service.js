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
exports.PessoasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pessoa_entity_1 = require("./entities/pessoa.entity");
let PessoasService = class PessoasService {
    pessoaRepository;
    constructor(pessoaRepository) {
        this.pessoaRepository = pessoaRepository;
    }
    async create(createPessoaDto) {
        const pessoa = this.pessoaRepository.create(createPessoaDto);
        return await this.pessoaRepository.save(pessoa);
    }
    async findAll() {
        return await this.pessoaRepository.find({
            order: { nome: 'ASC' },
        });
    }
    async findOne(id) {
        const pessoa = await this.pessoaRepository.findOne({ where: { id } });
        if (!pessoa) {
            throw new common_1.NotFoundException(`Pessoa com ID ${id} não encontrada`);
        }
        return pessoa;
    }
    async findByInstrumento(instrumento) {
        return await this.pessoaRepository
            .createQueryBuilder('pessoa')
            .where(':instrumento = ANY(pessoa.instrumentos)', { instrumento })
            .orderBy('pessoa.nome', 'ASC')
            .getMany();
    }
    async findVocalistas() {
        return await this.pessoaRepository.find({
            where: { isVocalista: true },
            order: { nome: 'ASC' },
        });
    }
    async findByHabilidade(habilidade) {
        return await this.pessoaRepository
            .createQueryBuilder('pessoa')
            .where(':habilidade = ANY(pessoa.habilidades_midia)', { habilidade })
            .orderBy('pessoa.nome', 'ASC')
            .getMany();
    }
    async update(id, updatePessoaDto) {
        const pessoa = await this.findOne(id);
        Object.assign(pessoa, updatePessoaDto);
        return await this.pessoaRepository.save(pessoa);
    }
    async remove(id) {
        const pessoa = await this.findOne(id);
        await this.pessoaRepository.remove(pessoa);
    }
};
exports.PessoasService = PessoasService;
exports.PessoasService = PessoasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pessoa_entity_1.Pessoa)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PessoasService);
//# sourceMappingURL=pessoas.service.js.map