import { Repository } from 'typeorm';
import { Musica } from './entities/musica.entity';
import { CreateMusicaDto } from './dto/create-musica.dto';
import { UpdateMusicaDto } from './dto/update-musica.dto';
export declare class MusicasService {
    private readonly musicaRepository;
    constructor(musicaRepository: Repository<Musica>);
    create(createMusicaDto: CreateMusicaDto): Promise<Musica>;
    findAll(): Promise<Musica[]>;
    findOne(id: string): Promise<Musica>;
    update(id: string, updateMusicaDto: UpdateMusicaDto): Promise<Musica>;
    remove(id: string): Promise<void>;
}
