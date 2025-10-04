import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../modules/auth/guards/jwt-auth.guard';

@ApiTags('dashboard')
@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('estatisticas')
  @ApiOperation({ summary: 'Obter estatísticas do dashboard' })
  @ApiResponse({
    status: 200,
    description: 'Estatísticas retornadas com sucesso',
  })
  getEstatisticas() {
    return this.dashboardService.getEstatisticas();
  }

  @Get('musicas-mais-tocadas')
  @ApiOperation({ summary: 'Obter músicas mais tocadas' })
  @ApiResponse({ status: 200, description: 'Lista de músicas mais tocadas' })
  getMusicasMaisTocadas() {
    return this.dashboardService.getMusicasMaisTocadas();
  }

  @Get('participacao-pessoas')
  @ApiOperation({ summary: 'Obter participação por pessoa' })
  @ApiResponse({ status: 200, description: 'Lista de participação por pessoa' })
  getParticipacaoPessoas() {
    return this.dashboardService.getParticipacaoPessoas();
  }
}
