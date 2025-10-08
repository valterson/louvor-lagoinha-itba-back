import { CultosService } from './cultos.service';
import { CreateCultoDto } from './dto/create-culto.dto';
import { UpdateCultoDto } from './dto/update-culto.dto';
import { Culto } from './entities/culto.entity';
export declare class CultosController {
    private readonly cultosService;
    constructor(cultosService: CultosService);
    create(createCultoDto: CreateCultoDto): Promise<Culto>;
    findAll(tipo?: string, mes?: string, ano?: string): Promise<Culto[]>;
    findOne(id: string): Promise<Culto>;
    findByMes(ano: string, mes: string): Promise<Culto[]>;
    getEscala(id: string): Promise<any>;
    update(id: string, updateCultoDto: UpdateCultoDto): Promise<Culto>;
    remove(id: string): Promise<void>;
}
