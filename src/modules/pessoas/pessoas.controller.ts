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
import { PessoasService } from './pessoas.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { Pessoa } from './entities/pessoa.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('pessoas')
@Controller('pessoas')
@UseGuards(JwtAuthGuard)
export class PessoasController {
  constructor(private readonly pessoasService: PessoasService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova pessoa' })
  @ApiResponse({
    status: 201,
    description: 'Pessoa criada com sucesso',
    type: Pessoa,
  })
  create(
    @Body(ValidationPipe) createPessoaDto: CreatePessoaDto,
  ): Promise<Pessoa> {
    return this.pessoasService.create(createPessoaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as pessoas' })
  @ApiResponse({ status: 200, description: 'Lista de pessoas', type: [Pessoa] })
  findAll(): Promise<Pessoa[]> {
    return this.pessoasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar pessoa por ID' })
  @ApiResponse({ status: 200, description: 'Pessoa encontrada', type: Pessoa })
  @ApiResponse({ status: 404, description: 'Pessoa não encontrada' })
  findOne(@Param('id') id: string): Promise<Pessoa> {
    return this.pessoasService.findOne(id);
  }

  @Get('instrumento/:instrumento')
  @ApiOperation({ summary: 'Buscar pessoas por instrumento' })
  @ApiResponse({ status: 200, description: 'Lista de pessoas', type: [Pessoa] })
  findByInstrumento(
    @Param('instrumento') instrumento: string,
  ): Promise<Pessoa[]> {
    return this.pessoasService.findByInstrumento(instrumento);
  }

  @Get('vocalistas')
  @ApiOperation({ summary: 'Listar vocalistas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de vocalistas',
    type: [Pessoa],
  })
  findVocalistas(): Promise<Pessoa[]> {
    return this.pessoasService.findVocalistas();
  }

  @Get('habilidade/:habilidade')
  @ApiOperation({ summary: 'Buscar pessoas por habilidade de mídia' })
  @ApiResponse({ status: 200, description: 'Lista de pessoas', type: [Pessoa] })
  findByHabilidade(@Param('habilidade') habilidade: string): Promise<Pessoa[]> {
    return this.pessoasService.findByHabilidade(habilidade);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar pessoa' })
  @ApiResponse({
    status: 200,
    description: 'Pessoa atualizada com sucesso',
    type: Pessoa,
  })
  @ApiResponse({ status: 404, description: 'Pessoa não encontrada' })
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updatePessoaDto: UpdatePessoaDto,
  ): Promise<Pessoa> {
    return this.pessoasService.update(id, updatePessoaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar pessoa' })
  @ApiResponse({ status: 200, description: 'Pessoa deletada com sucesso' })
  @ApiResponse({ status: 404, description: 'Pessoa não encontrada' })
  remove(@Param('id') id: string): Promise<void> {
    return this.pessoasService.remove(id);
  }
}
