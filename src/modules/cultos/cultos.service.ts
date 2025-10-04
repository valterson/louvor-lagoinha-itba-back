import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import dayjs from 'dayjs';
import { Culto } from './entities/culto.entity';
import { CultoMusica } from './entities/culto-musica.entity';
import { CultoBanda } from './entities/culto-banda.entity';
import {
  CultoEquipeMidia,
  TipoEquipeMidia,
} from './entities/culto-equipe-midia.entity';
import { CreateCultoDto } from './dto/create-culto.dto';
import { UpdateCultoDto } from './dto/update-culto.dto';
import { TipoCulto } from './entities/culto.entity';

@Injectable()
export class CultosService {
  constructor(
    @InjectRepository(Culto)
    private readonly cultoRepository: Repository<Culto>,
    @InjectRepository(CultoMusica)
    private readonly cultoMusicaRepository: Repository<CultoMusica>,
    @InjectRepository(CultoBanda)
    private readonly cultoBandaRepository: Repository<CultoBanda>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createCultoDto: CreateCultoDto): Promise<Culto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Verificar se já existe culto na mesma data
      const existingCulto = await queryRunner.manager.findOne(Culto, {
        where: { data: new Date(createCultoDto.data) },
      });

      if (existingCulto) {
        throw new BadRequestException(
          'Já existe um culto agendado para esta data',
        );
      }

      // Gerar nome do culto baseado no dia da semana
      const data = dayjs(createCultoDto.data);
      const nome = `Culto ${data.format('dddd')} - ${data.format('DD/MM/YYYY')}`;

      // Criar culto
      const culto = queryRunner.manager.create(Culto, {
        nome,
        tipo: TipoCulto.DOMINGO, // Valor padrão, será atualizado se necessário
        data: data.toDate(),
      });

      const savedCulto = await queryRunner.manager.save(Culto, culto);

      // Criar músicas do culto
      if (createCultoDto.musicas) {
        for (const musicaDto of createCultoDto.musicas) {
          const cultoMusica = queryRunner.manager.create(CultoMusica, {
            cultoId: savedCulto.id,
            musicaId: musicaDto.musica_id,
            momento: musicaDto.momento,
            ordem: parseInt(musicaDto.ordem),
          });
          await queryRunner.manager.save(CultoMusica, cultoMusica);
        }
      }

      // Criar banda do culto
      if (createCultoDto.banda) {
        for (const bandaDto of createCultoDto.banda) {
          const cultoBanda = queryRunner.manager.create(CultoBanda, {
            cultoId: savedCulto.id,
            pessoaId: bandaDto.pessoa_id,
            tipo: bandaDto.tipo,
            instrumento: bandaDto.instrumento,
          });
          await queryRunner.manager.save(CultoBanda, cultoBanda);
        }
      }

      // Criar equipe de mídia do culto
      if (
        createCultoDto.fotografia_ids &&
        createCultoDto.fotografia_ids.length > 0
      ) {
        for (const pessoaId of createCultoDto.fotografia_ids) {
          const cultoEquipeMidia = queryRunner.manager.create(
            CultoEquipeMidia,
            {
              cultoId: savedCulto.id,
              pessoaId,
              tipo: TipoEquipeMidia.FOTOGRAFIA,
            },
          );
          await queryRunner.manager.save(CultoEquipeMidia, cultoEquipeMidia);
        }
      }

      if (createCultoDto.mesa_som_id) {
        const cultoEquipeMidia = queryRunner.manager.create(CultoEquipeMidia, {
          cultoId: savedCulto.id,
          pessoaId: createCultoDto.mesa_som_id,
          tipo: TipoEquipeMidia.MESA_SOM,
        });
        await queryRunner.manager.save(CultoEquipeMidia, cultoEquipeMidia);
      }

      if (createCultoDto.data_show_id) {
        const cultoEquipeMidia = queryRunner.manager.create(CultoEquipeMidia, {
          cultoId: savedCulto.id,
          pessoaId: createCultoDto.data_show_id,
          tipo: TipoEquipeMidia.DATA_SHOW,
        });
        await queryRunner.manager.save(CultoEquipeMidia, cultoEquipeMidia);
      }

      await queryRunner.commitTransaction();
      return await this.findOne(savedCulto.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(params?: {
    tipo?: string;
    mes?: number;
    ano?: number;
  }): Promise<Culto[]> {
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

    // Adicionar propriedades computadas para equipe de mídia
    cultos.forEach((culto) => {
      const equipeMidia = culto.equipeMidia || [];

      // Fotografia - múltiplas pessoas
      const fotografiaIds = equipeMidia
        .filter((em: CultoEquipeMidia) => em.tipo === TipoEquipeMidia.FOTOGRAFIA)
        .map((em: CultoEquipeMidia) => em.pessoaId);
      (culto as any).fotografiaIds = fotografiaIds;

      // Mesa de som - uma pessoa
      const mesaSom = equipeMidia
        .filter((em: CultoEquipeMidia) => em.tipo === TipoEquipeMidia.MESA_SOM)
        .map((em: CultoEquipeMidia) => em.pessoaId);
      (culto as any).mesaSomId = mesaSom.length > 0 ? mesaSom[0] : null;

      // Data show - uma pessoa
      const dataShow = equipeMidia
        .filter((em: CultoEquipeMidia) => em.tipo === TipoEquipeMidia.DATA_SHOW)
        .map((em: CultoEquipeMidia) => em.pessoaId);
      (culto as any).dataShowId = dataShow.length > 0 ? dataShow[0] : null;

      // Propriedade para contagem total de equipe de mídia
      (culto as any).equipeMidiaCount = fotografiaIds.length +
        (mesaSom.length > 0 ? 1 : 0) +
        (dataShow.length > 0 ? 1 : 0);
    });

    // Aplicar filtros se fornecidos
    let filteredCultos = cultos;
    if (params?.tipo) {
      filteredCultos = filteredCultos.filter(culto => culto.tipo === params.tipo);
    }

    if (params?.mes && params?.ano) {
      filteredCultos = filteredCultos.filter(culto => {
        const cultoDate = new Date(culto.data);
        return cultoDate.getMonth() + 1 === params.mes && cultoDate.getFullYear() === params.ano;
      });
    }

    return filteredCultos;
  }

  async findOne(id: string): Promise<Culto> {
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
      throw new NotFoundException(`Culto com ID ${id} não encontrado`);
    }

    // Adicionar propriedades computadas para equipe de mídia
    if (culto.equipeMidia && culto.equipeMidia.length > 0) {
      (culto as any).fotografiaIds = culto.equipeMidia
        .filter((em: CultoEquipeMidia) => em.tipo === TipoEquipeMidia.FOTOGRAFIA)
        .map((em: CultoEquipeMidia) => em.pessoaId);

      (culto as any).mesaSomId = culto.equipeMidia
        .filter((em: CultoEquipeMidia) => em.tipo === TipoEquipeMidia.MESA_SOM)
        .map((em: CultoEquipeMidia) => em.pessoaId)[0];

      (culto as any).dataShowId = culto.equipeMidia
        .filter((em: CultoEquipeMidia) => em.tipo === TipoEquipeMidia.DATA_SHOW)
        .map((em: CultoEquipeMidia) => em.pessoaId)[0];
    } else {
      (culto as any).fotografiaIds = [];
      (culto as any).mesaSomId = null;
      (culto as any).dataShowId = null;
    }

    return culto;
  }

  async findByMes(ano: number, mes: number): Promise<Culto[]> {
    return await this.cultoRepository
      .createQueryBuilder('culto')
      .where(
        'EXTRACT(YEAR FROM culto.data) = :ano AND EXTRACT(MONTH FROM culto.data) = :mes',
        { ano, mes },
      )
      .orderBy('culto.data', 'ASC')
      .getMany();
  }

  async update(id: string, updateCultoDto: UpdateCultoDto): Promise<Culto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const culto = await queryRunner.manager.findOne(Culto, {
        where: { id },
        relations: ['musicas', 'banda'],
      });

      if (!culto) {
        throw new NotFoundException(`Culto com ID ${id} não encontrado`);
      }

      // Atualizar dados básicos do culto
      const dataChanged =
        updateCultoDto.data &&
        updateCultoDto.data !== dayjs(culto.data).format('YYYY-MM-DD');

      if (updateCultoDto.data) {
        // Usar dayjs para garantir manipulação consistente de datas
        const novaData = dayjs(updateCultoDto.data);
        culto.data = novaData.toDate();

        // Inferir tipo baseado no dia da semana da nova data
        const diaSemana = novaData.day();
        culto.tipo = diaSemana === 0 ? TipoCulto.DOMINGO : TipoCulto.QUARTA;
      }

      // Atualizar nome do culto se data foi alterada
      if (dataChanged) {
        const data = dayjs(culto.data);
        culto.nome = `Culto ${data.format('dddd')} - ${data.format('DD/MM/YYYY')}`;
      }

      await queryRunner.manager.save(Culto, culto);

      // Remover músicas antigas e criar novas
      if (updateCultoDto.musicas !== undefined) {
        await queryRunner.manager.delete(CultoMusica, { cultoId: id });

        if (updateCultoDto.musicas.length > 0) {
          for (const musicaDto of updateCultoDto.musicas) {
            const cultoMusica = queryRunner.manager.create(CultoMusica, {
              cultoId: id,
              musicaId: musicaDto.musica_id,
              momento: musicaDto.momento,
              ordem: parseInt(musicaDto.ordem),
            });
            await queryRunner.manager.save(CultoMusica, cultoMusica);
          }
        }
      }

      // Remover banda antiga e criar nova
      if (updateCultoDto.banda !== undefined) {
        await queryRunner.manager.delete(CultoBanda, { cultoId: id });

        if (updateCultoDto.banda.length > 0) {
          for (const bandaDto of updateCultoDto.banda) {
            const cultoBanda = queryRunner.manager.create(CultoBanda, {
              cultoId: id,
              pessoaId: bandaDto.pessoa_id,
              tipo: bandaDto.tipo,
              instrumento: bandaDto.instrumento,
            });
            await queryRunner.manager.save(CultoBanda, cultoBanda);
          }
        }
      }

      // Atualizar equipe de mídia
      if (updateCultoDto.fotografia_ids !== undefined ||
          updateCultoDto.mesa_som_id !== undefined ||
          updateCultoDto.data_show_id !== undefined) {

        // Remover equipe de mídia antiga
        await queryRunner.manager.delete(CultoEquipeMidia, { cultoId: id });

        // Criar nova equipe de mídia
        if (updateCultoDto.fotografia_ids && updateCultoDto.fotografia_ids.length > 0) {
          for (const pessoaId of updateCultoDto.fotografia_ids) {
            const cultoEquipeMidia = queryRunner.manager.create(CultoEquipeMidia, {
              cultoId: id,
              pessoaId,
              tipo: TipoEquipeMidia.FOTOGRAFIA,
            });
            await queryRunner.manager.save(CultoEquipeMidia, cultoEquipeMidia);
          }
        }

        if (updateCultoDto.mesa_som_id) {
          const cultoEquipeMidia = queryRunner.manager.create(CultoEquipeMidia, {
            cultoId: id,
            pessoaId: updateCultoDto.mesa_som_id,
            tipo: TipoEquipeMidia.MESA_SOM,
          });
          await queryRunner.manager.save(CultoEquipeMidia, cultoEquipeMidia);
        }

        if (updateCultoDto.data_show_id) {
          const cultoEquipeMidia = queryRunner.manager.create(CultoEquipeMidia, {
            cultoId: id,
            pessoaId: updateCultoDto.data_show_id,
            tipo: TipoEquipeMidia.DATA_SHOW,
          });
          await queryRunner.manager.save(CultoEquipeMidia, cultoEquipeMidia);
        }
      }

      await queryRunner.commitTransaction();
      return await this.findOne(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: string): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Verificar se o culto existe
      const culto = await queryRunner.manager.findOne(Culto, {
        where: { id },
      });

      if (!culto) {
        throw new NotFoundException(`Culto com ID ${id} não encontrado`);
      }

      // Deletar relações primeiro (foreign keys)
      await queryRunner.manager.delete(CultoMusica, { cultoId: id });
      await queryRunner.manager.delete(CultoBanda, { cultoId: id });

      // Agora deletar o culto
      await queryRunner.manager.remove(Culto, culto);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getEscala(id: string): Promise<any> {
    const culto = await this.findOne(id);
    const cultoWithProps = culto as any;
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
}
