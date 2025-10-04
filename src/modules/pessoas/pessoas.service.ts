import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
  ) {}

  async create(createPessoaDto: CreatePessoaDto): Promise<Pessoa> {
    const pessoa = this.pessoaRepository.create(createPessoaDto);
    return await this.pessoaRepository.save(pessoa);
  }

  async findAll(): Promise<Pessoa[]> {
    return await this.pessoaRepository.find({
      order: { nome: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Pessoa> {
    const pessoa = await this.pessoaRepository.findOne({ where: { id } });
    if (!pessoa) {
      throw new NotFoundException(`Pessoa com ID ${id} não encontrada`);
    }
    return pessoa;
  }

  async findByInstrumento(instrumento: string): Promise<Pessoa[]> {
    return await this.pessoaRepository
      .createQueryBuilder('pessoa')
      .where(':instrumento = ANY(pessoa.instrumentos)', { instrumento })
      .orderBy('pessoa.nome', 'ASC')
      .getMany();
  }

  async findVocalistas(): Promise<Pessoa[]> {
    return await this.pessoaRepository.find({
      where: { isVocalista: true },
      order: { nome: 'ASC' },
    });
  }

  async findByHabilidade(habilidade: string): Promise<Pessoa[]> {
    return await this.pessoaRepository
      .createQueryBuilder('pessoa')
      .where(':habilidade = ANY(pessoa.habilidades_midia)', { habilidade })
      .orderBy('pessoa.nome', 'ASC')
      .getMany();
  }

  async update(id: string, updatePessoaDto: UpdatePessoaDto): Promise<Pessoa> {
    const pessoa = await this.findOne(id);
    Object.assign(pessoa, updatePessoaDto);
    return await this.pessoaRepository.save(pessoa);
  }

  async remove(id: string): Promise<void> {
    const pessoa = await this.findOne(id);
    await this.pessoaRepository.remove(pessoa);
  }
}
