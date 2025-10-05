import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MusicasService } from './musicas.service';
import { CreateMusicaDto } from './dto/create-musica.dto';
import { UpdateMusicaDto } from './dto/update-musica.dto';
import { Musica } from './entities/musica.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('musicas')
@Controller('musicas')
export class MusicasController {
  constructor(private readonly musicasService: MusicasService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Criar uma nova música' })
  @ApiResponse({
    status: 201,
    description: 'Música criada com sucesso',
    type: Musica,
  })
  create(
    @Body(ValidationPipe) createMusicaDto: CreateMusicaDto,
  ): Promise<Musica> {
    return this.musicasService.create(createMusicaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as músicas' })
  @ApiResponse({ status: 200, description: 'Lista de músicas', type: [Musica] })
  findAll(): Promise<Musica[]> {
    return this.musicasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar música por ID' })
  @ApiResponse({ status: 200, description: 'Música encontrada', type: Musica })
  @ApiResponse({ status: 404, description: 'Música não encontrada' })
  findOne(@Param('id') id: string): Promise<Musica> {
    return this.musicasService.findOne(id);
  }

  @Get(':id/letra')
  @ApiOperation({ summary: 'Buscar letra da música por ID' })
  @ApiResponse({ status: 200, description: 'Letra encontrada' })
  @ApiResponse({ status: 404, description: 'Música não encontrada' })
  async getLetra(@Param('id') id: string): Promise<{ letra: string }> {
    const musica = await this.musicasService.findOne(id);
    return { letra: musica.letra || '' };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Atualizar música' })
  @ApiResponse({
    status: 200,
    description: 'Música atualizada com sucesso',
    type: Musica,
  })
  @ApiResponse({ status: 404, description: 'Música não encontrada' })
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateMusicaDto: UpdateMusicaDto,
  ): Promise<Musica> {
    return this.musicasService.update(id, updateMusicaDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Deletar música' })
  @ApiResponse({ status: 200, description: 'Música deletada com sucesso' })
  @ApiResponse({ status: 404, description: 'Música não encontrada' })
  remove(@Param('id') id: string): Promise<void> {
    return this.musicasService.remove(id);
  }
}
