import { PessoasService } from './pessoas.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { Pessoa } from './entities/pessoa.entity';
export declare class PessoasController {
    private readonly pessoasService;
    constructor(pessoasService: PessoasService);
    create(createPessoaDto: CreatePessoaDto): Promise<Pessoa>;
    findAll(): Promise<Pessoa[]>;
    findOne(id: string): Promise<Pessoa>;
    findByInstrumento(instrumento: string): Promise<Pessoa[]>;
    findVocalistas(): Promise<Pessoa[]>;
    findByHabilidade(habilidade: string): Promise<Pessoa[]>;
    update(id: string, updatePessoaDto: UpdatePessoaDto): Promise<Pessoa>;
    remove(id: string): Promise<void>;
}
