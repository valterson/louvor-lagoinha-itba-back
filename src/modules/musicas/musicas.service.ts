import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Musica } from './entities/musica.entity';
import { CreateMusicaDto } from './dto/create-musica.dto';
import { UpdateMusicaDto } from './dto/update-musica.dto';

@Injectable()
export class MusicasService {
  constructor(
    @InjectRepository(Musica)
    private readonly musicaRepository: Repository<Musica>,
  ) {}

  async create(createMusicaDto: CreateMusicaDto): Promise<Musica> {
    const musica = this.musicaRepository.create(createMusicaDto);
    return await this.musicaRepository.save(musica);
  }

  async findAll(): Promise<Musica[]> {
    return await this.musicaRepository.find({
      order: { titulo: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Musica> {
    const musica = await this.musicaRepository.findOne({ where: { id } });
    if (!musica) {
      throw new NotFoundException(`Música com ID ${id} não encontrada`);
    }
    return musica;
  }

  async update(id: string, updateMusicaDto: UpdateMusicaDto): Promise<Musica> {
    const musica = await this.findOne(id);
    Object.assign(musica, updateMusicaDto);
    return await this.musicaRepository.save(musica);
  }

  async remove(id: string): Promise<void> {
    const musica = await this.findOne(id);
    await this.musicaRepository.remove(musica);
  }
}
