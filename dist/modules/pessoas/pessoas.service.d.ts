import { Repository } from 'typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
export declare class PessoasService {
    private readonly pessoaRepository;
    constructor(pessoaRepository: Repository<Pessoa>);
    create(createPessoaDto: CreatePessoaDto): Promise<Pessoa>;
    findAll(): Promise<Pessoa[]>;
    findOne(id: string): Promise<Pessoa>;
    findByInstrumento(instrumento: string): Promise<Pessoa[]>;
    findVocalistas(): Promise<Pessoa[]>;
    findByHabilidade(habilidade: string): Promise<Pessoa[]>;
    update(id: string, updatePessoaDto: UpdatePessoaDto): Promise<Pessoa>;
    remove(id: string): Promise<void>;
}
