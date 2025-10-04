import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CultosService } from './cultos.service';
import { CreateCultoDto } from './dto/create-culto.dto';
import { UpdateCultoDto } from './dto/update-culto.dto';
import { Culto } from './entities/culto.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('cultos')
@Controller('cultos')
export class CultosController {
  constructor(private readonly cultosService: CultosService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Criar um novo culto' })
  @ApiResponse({
    status: 201,
    description: 'Culto criado com sucesso',
    type: Culto,
  })
  create(@Body(ValidationPipe) createCultoDto: CreateCultoDto): Promise<Culto> {
    return this.cultosService.create(createCultoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os cultos' })
  @ApiResponse({ status: 200, description: 'Lista de cultos', type: [Culto] })
  findAll(
    @Query('tipo') tipo?: string,
    @Query('mes') mes?: string,
    @Query('ano') ano?: string,
  ): Promise<Culto[]> {
    return this.cultosService.findAll({
      tipo,
      mes: mes ? parseInt(mes) : undefined,
      ano: ano ? parseInt(ano) : undefined,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar culto por ID' })
  @ApiResponse({ status: 200, description: 'Culto encontrado', type: Culto })
  findOne(@Param('id') id: string): Promise<Culto> {
    return this.cultosService.findOne(id);
  }

  @Get('mes/:ano/:mes')
  @ApiOperation({ summary: 'Buscar cultos por mês e ano' })
  @ApiResponse({ status: 200, description: 'Lista de cultos', type: [Culto] })
  findByMes(
    @Param('ano') ano: string,
    @Param('mes') mes: string,
  ): Promise<Culto[]> {
    return this.cultosService.findByMes(parseInt(ano), parseInt(mes));
  }

  @Get(':id/escala')
  @ApiOperation({ summary: 'Gerar escala do culto' })
  @ApiResponse({ status: 200, description: 'Escala gerada' })
  getEscala(@Param('id') id: string): Promise<any> {
    return this.cultosService.getEscala(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Atualizar culto' })
  @ApiResponse({
    status: 200,
    description: 'Culto atualizado com sucesso',
    type: Culto,
  })
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCultoDto: UpdateCultoDto,
  ): Promise<Culto> {
    return this.cultosService.update(id, updateCultoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Deletar culto' })
  @ApiResponse({ status: 200, description: 'Culto deletado com sucesso' })
  remove(@Param('id') id: string): Promise<void> {
    return this.cultosService.remove(id);
  }
}
