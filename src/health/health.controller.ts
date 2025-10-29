import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Verificar saúde da aplicação' })
  @ApiResponse({ status: 200, description: 'Aplicação saudável' })
  @ApiResponse({ status: 503, description: 'Aplicação com problemas' })
  async check() {
    const dbStatus = await this.checkDatabase();
    
    return {
      status: dbStatus.status === 'ok' ? 'ok' : 'error',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: dbStatus,
    };
  }

  @Get('database')
  @ApiOperation({ summary: 'Verificar conexão com banco de dados' })
  @ApiResponse({ status: 200, description: 'Banco conectado' })
  @ApiResponse({ status: 503, description: 'Banco desconectado' })
  async checkDatabase() {
    try {
      await this.dataSource.query('SELECT 1');
      
      return {
        status: 'ok',
        message: 'Database connection is healthy',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Database connection failed',
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }
}