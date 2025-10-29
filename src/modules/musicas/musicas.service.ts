import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Musica } from './entities/musica.entity';
import { CreateMusicaDto } from './dto/create-musica.dto';
import { UpdateMusicaDto } from './dto/update-musica.dto';
import { textEquals } from '../../utils/text-utils';

@Injectable()
export class MusicasService {
  constructor(
    @InjectRepository(Musica)
    private readonly musicaRepository: Repository<Musica>,
  ) {}

  async create(createMusicaDto: CreateMusicaDto): Promise<Musica> {
    // Verificar se já existe uma música com o mesmo título (case e accent insensitive)
    await this.validateUniqueTitle(createMusicaDto.titulo);
    
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
    
    // Se o título está sendo alterado, verificar se não existe outra música com o mesmo título
    if (updateMusicaDto.titulo && updateMusicaDto.titulo !== musica.titulo) {
      await this.validateUniqueTitle(updateMusicaDto.titulo, id);
    }
    
    Object.assign(musica, updateMusicaDto);
    return await this.musicaRepository.save(musica);
  }

  async remove(id: string): Promise<void> {
    const musica = await this.findOne(id);
    await this.musicaRepository.remove(musica);
  }

  /**
   * Valida se o título é único (case e accent insensitive)
   * @param titulo Título a ser validado
   * @param excludeId ID da música a ser excluída da validação (para updates)
   */
  private async validateUniqueTitle(titulo: string, excludeId?: string): Promise<void> {
    const existingMusicas = await this.musicaRepository.find();
    
    const duplicateMusica = existingMusicas.find(musica => {
      // Excluir a própria música no caso de update
      if (excludeId && musica.id === excludeId) {
        return false;
      }
      
      return textEquals(musica.titulo, titulo);
    });
    
    if (duplicateMusica) {
      throw new ConflictException(
        `Já existe uma música com o título "${duplicateMusica.titulo}". Não é possível cadastrar músicas com títulos similares.`
      );
    }
  }
}
