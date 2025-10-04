import { Repository, DataSource } from 'typeorm';
import { Culto } from './entities/culto.entity';
import { CultoMusica } from './entities/culto-musica.entity';
import { CultoBanda } from './entities/culto-banda.entity';
import { CreateCultoDto } from './dto/create-culto.dto';
import { UpdateCultoDto } from './dto/update-culto.dto';
export declare class CultosService {
    private readonly cultoRepository;
    private readonly cultoMusicaRepository;
    private readonly cultoBandaRepository;
    private readonly dataSource;
    constructor(cultoRepository: Repository<Culto>, cultoMusicaRepository: Repository<CultoMusica>, cultoBandaRepository: Repository<CultoBanda>, dataSource: DataSource);
    create(createCultoDto: CreateCultoDto): Promise<Culto>;
    findAll(params?: {
        tipo?: string;
        mes?: number;
        ano?: number;
    }): Promise<Culto[]>;
    findOne(id: string): Promise<Culto>;
    findByMes(ano: number, mes: number): Promise<Culto[]>;
    update(id: string, updateCultoDto: UpdateCultoDto): Promise<Culto>;
    remove(id: string): Promise<void>;
    getEscala(id: string): Promise<any>;
}
