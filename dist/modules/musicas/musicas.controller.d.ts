import { MusicasService } from './musicas.service';
import { CreateMusicaDto } from './dto/create-musica.dto';
import { UpdateMusicaDto } from './dto/update-musica.dto';
import { Musica } from './entities/musica.entity';
export declare class MusicasController {
    private readonly musicasService;
    constructor(musicasService: MusicasService);
    create(createMusicaDto: CreateMusicaDto): Promise<Musica>;
    findAll(): Promise<Musica[]>;
    findOne(id: string): Promise<Musica>;
    update(id: string, updateMusicaDto: UpdateMusicaDto): Promise<Musica>;
    remove(id: string): Promise<void>;
}
