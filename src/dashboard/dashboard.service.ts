import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Musica } from '../modules/musicas/entities/musica.entity';
import { Pessoa } from '../modules/pessoas/entities/pessoa.entity';
import { Culto } from '../modules/cultos/entities/culto.entity';
import { CultoBanda } from '../modules/cultos/entities/culto-banda.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Musica)
    private readonly musicaRepository: Repository<Musica>,
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
    @InjectRepository(Culto)
    private readonly cultoRepository: Repository<Culto>,
    @InjectRepository(CultoBanda)
    private readonly cultoBandaRepository: Repository<CultoBanda>,
  ) {}

  async getEstatisticas(): Promise<any> {
    // Estatísticas básicas
    const [totalMusicas, totalPessoas, totalCultos] = await Promise.all([
      this.musicaRepository.count(),
      this.pessoaRepository.count(),
      this.cultoRepository.count(),
    ]);

    // Próximos cultos (próximos 5)
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

  async getMusicasMaisTocadas(): Promise<any[]> {
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

  async getParticipacaoPessoas(): Promise<any[]> {
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
}
