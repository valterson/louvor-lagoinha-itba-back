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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CultosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const dayjs_1 = __importDefault(require("dayjs"));
const culto_entity_1 = require("./entities/culto.entity");
const culto_musica_entity_1 = require("./entities/culto-musica.entity");
const culto_banda_entity_1 = require("./entities/culto-banda.entity");
const culto_equipe_midia_entity_1 = require("./entities/culto-equipe-midia.entity");
let CultosService = class CultosService {
    constructor(cultoRepository, cultoMusicaRepository, cultoBandaRepository, dataSource) {
        this.cultoRepository = cultoRepository;
        this.cultoMusicaRepository = cultoMusicaRepository;
        this.cultoBandaRepository = cultoBandaRepository;
        this.dataSource = dataSource;
    }
    async create(createCultoDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const existingCulto = await queryRunner.manager.findOne(culto_entity_1.Culto, {
                where: { data: new Date(createCultoDto.data) },
            });
            if (existingCulto) {
                throw new common_1.BadRequestException('Já existe um culto agendado para esta data');
            }
            const data = (0, dayjs_1.default)(createCultoDto.data).locale('pt-br');
            const nomePersonalizado = createCultoDto.nome && createCultoDto.nome.trim()
                ? createCultoDto.nome.trim()
                : null;
            const nome = nomePersonalizado
                ? `${nomePersonalizado} - ${data.format('DD/MM/YYYY')}`
                : `Culto ${data.format('dddd')} - ${data.format('DD/MM/YYYY')}`;
            const culto = queryRunner.manager.create(culto_entity_1.Culto, {
                nome,
                data: data.toDate(),
            });
            const savedCulto = await queryRunner.manager.save(culto_entity_1.Culto, culto);
            if (createCultoDto.musicas) {
                for (const musicaDto of createCultoDto.musicas) {
                    const cultoMusica = queryRunner.manager.create(culto_musica_entity_1.CultoMusica, {
                        cultoId: savedCulto.id,
                        musicaId: musicaDto.musica_id,
                        momento: musicaDto.momento,
                        ordem: parseInt(musicaDto.ordem),
                    });
                    await queryRunner.manager.save(culto_musica_entity_1.CultoMusica, cultoMusica);
                }
            }
            if (createCultoDto.banda) {
                for (const bandaDto of createCultoDto.banda) {
                    const cultoBanda = queryRunner.manager.create(culto_banda_entity_1.CultoBanda, {
                        cultoId: savedCulto.id,
                        pessoaId: bandaDto.pessoa_id,
                        tipo: bandaDto.tipo,
                        instrumento: bandaDto.instrumento,
                    });
                    await queryRunner.manager.save(culto_banda_entity_1.CultoBanda, cultoBanda);
                }
            }
            if (createCultoDto.fotografia_ids &&
                createCultoDto.fotografia_ids.length > 0) {
                for (const pessoaId of createCultoDto.fotografia_ids) {
                    const cultoEquipeMidia = queryRunner.manager.create(culto_equipe_midia_entity_1.CultoEquipeMidia, {
                        cultoId: savedCulto.id,
                        pessoaId,
                        tipo: culto_equipe_midia_entity_1.TipoEquipeMidia.FOTOGRAFIA,
                    });
                    await queryRunner.manager.save(culto_equipe_midia_entity_1.CultoEquipeMidia, cultoEquipeMidia);
                }
            }
            if (createCultoDto.mesa_som_id) {
                const cultoEquipeMidia = queryRunner.manager.create(culto_equipe_midia_entity_1.CultoEquipeMidia, {
                    cultoId: savedCulto.id,
                    pessoaId: createCultoDto.mesa_som_id,
                    tipo: culto_equipe_midia_entity_1.TipoEquipeMidia.MESA_SOM,
                });
                await queryRunner.manager.save(culto_equipe_midia_entity_1.CultoEquipeMidia, cultoEquipeMidia);
            }
            if (createCultoDto.data_show_id) {
                const cultoEquipeMidia = queryRunner.manager.create(culto_equipe_midia_entity_1.CultoEquipeMidia, {
                    cultoId: savedCulto.id,
                    pessoaId: createCultoDto.data_show_id,
                    tipo: culto_equipe_midia_entity_1.TipoEquipeMidia.DATA_SHOW,
                });
                await queryRunner.manager.save(culto_equipe_midia_entity_1.CultoEquipeMidia, cultoEquipeMidia);
            }
            await queryRunner.commitTransaction();
            return await this.findOne(savedCulto.id);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAll(params) {
        const cultos = await this.cultoRepository
            .createQueryBuilder('culto')
            .leftJoinAndSelect('culto.musicas', 'musicas')
            .leftJoinAndSelect('musicas.musica', 'musica')
            .leftJoinAndSelect('culto.banda', 'banda')
            .leftJoinAndSelect('banda.pessoa', 'pessoa')
            .leftJoinAndSelect('culto.equipeMidia', 'equipeMidia')
            .leftJoinAndSelect('equipeMidia.pessoa', 'pessoaEquipe')
            .orderBy('culto.data', 'DESC')
            .getMany();
        cultos.forEach((culto) => {
            const equipeMidia = culto.equipeMidia || [];
            const fotografiaIds = equipeMidia
                .filter((em) => em.tipo === culto_equipe_midia_entity_1.TipoEquipeMidia.FOTOGRAFIA)
                .map((em) => em.pessoaId);
            culto.fotografiaIds = fotografiaIds;
            const mesaSom = equipeMidia
                .filter((em) => em.tipo === culto_equipe_midia_entity_1.TipoEquipeMidia.MESA_SOM)
                .map((em) => em.pessoaId);
            culto.mesaSomId = mesaSom.length > 0 ? mesaSom[0] : null;
            const dataShow = equipeMidia
                .filter((em) => em.tipo === culto_equipe_midia_entity_1.TipoEquipeMidia.DATA_SHOW)
                .map((em) => em.pessoaId);
            culto.dataShowId = dataShow.length > 0 ? dataShow[0] : null;
            culto.equipeMidiaCount = fotografiaIds.length +
                (mesaSom.length > 0 ? 1 : 0) +
                (dataShow.length > 0 ? 1 : 0);
        });
        let filteredCultos = cultos;
        if (params?.mes && params?.ano) {
            filteredCultos = filteredCultos.filter(culto => {
                const cultoDate = new Date(culto.data);
                return cultoDate.getMonth() + 1 === params.mes && cultoDate.getFullYear() === params.ano;
            });
        }
        return filteredCultos;
    }
    async findOne(id) {
        const culto = await this.cultoRepository.findOne({
            where: { id },
            relations: [
                'musicas',
                'musicas.musica',
                'banda',
                'banda.pessoa',
                'equipeMidia',
                'equipeMidia.pessoa',
            ],
        });
        if (!culto) {
            throw new common_1.NotFoundException(`Culto com ID ${id} não encontrado`);
        }
        if (culto.equipeMidia && culto.equipeMidia.length > 0) {
            culto.fotografiaIds = culto.equipeMidia
                .filter((em) => em.tipo === culto_equipe_midia_entity_1.TipoEquipeMidia.FOTOGRAFIA)
                .map((em) => em.pessoaId);
            culto.mesaSomId = culto.equipeMidia
                .filter((em) => em.tipo === culto_equipe_midia_entity_1.TipoEquipeMidia.MESA_SOM)
                .map((em) => em.pessoaId)[0];
            culto.dataShowId = culto.equipeMidia
                .filter((em) => em.tipo === culto_equipe_midia_entity_1.TipoEquipeMidia.DATA_SHOW)
                .map((em) => em.pessoaId)[0];
        }
        else {
            culto.fotografiaIds = [];
            culto.mesaSomId = null;
            culto.dataShowId = null;
        }
        return culto;
    }
    async findByMes(ano, mes) {
        return await this.cultoRepository
            .createQueryBuilder('culto')
            .where('EXTRACT(YEAR FROM culto.data) = :ano AND EXTRACT(MONTH FROM culto.data) = :mes', { ano, mes })
            .orderBy('culto.data', 'ASC')
            .getMany();
    }
    async update(id, updateCultoDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const culto = await queryRunner.manager.findOne(culto_entity_1.Culto, {
                where: { id },
                relations: ['musicas', 'banda'],
            });
            if (!culto) {
                throw new common_1.NotFoundException(`Culto com ID ${id} não encontrado`);
            }
            const dataChanged = updateCultoDto.data &&
                updateCultoDto.data !== (0, dayjs_1.default)(culto.data).format('YYYY-MM-DD');
            if (updateCultoDto.data) {
                const novaData = (0, dayjs_1.default)(updateCultoDto.data);
                culto.data = novaData.toDate();
            }
            if (dataChanged || updateCultoDto.nome !== undefined) {
                const data = (0, dayjs_1.default)(culto.data).locale('pt-br');
                culto.nome = updateCultoDto.nome && updateCultoDto.nome.trim()
                    ? `${updateCultoDto.nome.trim()} - ${data.format('DD/MM/YYYY')}`
                    : `Culto ${data.format('dddd')} - ${data.format('DD/MM/YYYY')}`;
            }
            await queryRunner.manager.save(culto_entity_1.Culto, culto);
            if (updateCultoDto.musicas !== undefined) {
                await queryRunner.manager.delete(culto_musica_entity_1.CultoMusica, { cultoId: id });
                if (updateCultoDto.musicas.length > 0) {
                    for (const musicaDto of updateCultoDto.musicas) {
                        const cultoMusica = queryRunner.manager.create(culto_musica_entity_1.CultoMusica, {
                            cultoId: id,
                            musicaId: musicaDto.musica_id,
                            momento: musicaDto.momento,
                            ordem: parseInt(musicaDto.ordem),
                        });
                        await queryRunner.manager.save(culto_musica_entity_1.CultoMusica, cultoMusica);
                    }
                }
            }
            if (updateCultoDto.banda !== undefined) {
                await queryRunner.manager.delete(culto_banda_entity_1.CultoBanda, { cultoId: id });
                if (updateCultoDto.banda.length > 0) {
                    for (const bandaDto of updateCultoDto.banda) {
                        const cultoBanda = queryRunner.manager.create(culto_banda_entity_1.CultoBanda, {
                            cultoId: id,
                            pessoaId: bandaDto.pessoa_id,
                            tipo: bandaDto.tipo,
                            instrumento: bandaDto.instrumento,
                        });
                        await queryRunner.manager.save(culto_banda_entity_1.CultoBanda, cultoBanda);
                    }
                }
            }
            if (updateCultoDto.fotografia_ids !== undefined ||
                updateCultoDto.mesa_som_id !== undefined ||
                updateCultoDto.data_show_id !== undefined) {
                await queryRunner.manager.delete(culto_equipe_midia_entity_1.CultoEquipeMidia, { cultoId: id });
                if (updateCultoDto.fotografia_ids && updateCultoDto.fotografia_ids.length > 0) {
                    for (const pessoaId of updateCultoDto.fotografia_ids) {
                        const cultoEquipeMidia = queryRunner.manager.create(culto_equipe_midia_entity_1.CultoEquipeMidia, {
                            cultoId: id,
                            pessoaId,
                            tipo: culto_equipe_midia_entity_1.TipoEquipeMidia.FOTOGRAFIA,
                        });
                        await queryRunner.manager.save(culto_equipe_midia_entity_1.CultoEquipeMidia, cultoEquipeMidia);
                    }
                }
                if (updateCultoDto.mesa_som_id) {
                    const cultoEquipeMidia = queryRunner.manager.create(culto_equipe_midia_entity_1.CultoEquipeMidia, {
                        cultoId: id,
                        pessoaId: updateCultoDto.mesa_som_id,
                        tipo: culto_equipe_midia_entity_1.TipoEquipeMidia.MESA_SOM,
                    });
                    await queryRunner.manager.save(culto_equipe_midia_entity_1.CultoEquipeMidia, cultoEquipeMidia);
                }
                if (updateCultoDto.data_show_id) {
                    const cultoEquipeMidia = queryRunner.manager.create(culto_equipe_midia_entity_1.CultoEquipeMidia, {
                        cultoId: id,
                        pessoaId: updateCultoDto.data_show_id,
                        tipo: culto_equipe_midia_entity_1.TipoEquipeMidia.DATA_SHOW,
                    });
                    await queryRunner.manager.save(culto_equipe_midia_entity_1.CultoEquipeMidia, cultoEquipeMidia);
                }
            }
            await queryRunner.commitTransaction();
            return await this.findOne(id);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async remove(id) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const culto = await queryRunner.manager.findOne(culto_entity_1.Culto, {
                where: { id },
            });
            if (!culto) {
                throw new common_1.NotFoundException(`Culto com ID ${id} não encontrado`);
            }
            await queryRunner.manager.delete(culto_musica_entity_1.CultoMusica, { cultoId: id });
            await queryRunner.manager.delete(culto_banda_entity_1.CultoBanda, { cultoId: id });
            await queryRunner.manager.remove(culto_entity_1.Culto, culto);
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async getEscala(id) {
        const culto = await this.findOne(id);
        const cultoWithProps = culto;
        return {
            culto,
            escala: {
                musicas: culto.musicas?.sort((a, b) => a.ordem - b.ordem),
                banda: culto.banda,
                equipe: {
                    fotografia: cultoWithProps.fotografiaIds || [],
                    mesaSom: cultoWithProps.mesaSomId,
                    dataShow: cultoWithProps.dataShowId,
                },
            },
        };
    }
};
exports.CultosService = CultosService;
exports.CultosService = CultosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(culto_entity_1.Culto)),
    __param(1, (0, typeorm_1.InjectRepository)(culto_musica_entity_1.CultoMusica)),
    __param(2, (0, typeorm_1.InjectRepository)(culto_banda_entity_1.CultoBanda)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], CultosService);
//# sourceMappingURL=cultos.service.js.map