import { Repository } from 'typeorm';
import { Musica } from '../modules/musicas/entities/musica.entity';
import { Pessoa } from '../modules/pessoas/entities/pessoa.entity';
import { Culto } from '../modules/cultos/entities/culto.entity';
import { CultoBanda } from '../modules/cultos/entities/culto-banda.entity';
export declare class DashboardService {
    private readonly musicaRepository;
    private readonly pessoaRepository;
    private readonly cultoRepository;
    private readonly cultoBandaRepository;
    constructor(musicaRepository: Repository<Musica>, pessoaRepository: Repository<Pessoa>, cultoRepository: Repository<Culto>, cultoBandaRepository: Repository<CultoBanda>);
    getEstatisticas(): Promise<any>;
    getMusicasMaisTocadas(): Promise<any[]>;
    getParticipacaoPessoas(): Promise<any[]>;
}
